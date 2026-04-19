import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Global logging middleware
  app.use((req, res, next) => {
    if (req.url.startsWith('/api')) {
      console.log(`[PAYMENT SERVER] ${req.method} ${req.url}`);
    }
    next();
  });

  let stripe: Stripe | null = null;
  const getStripe = () => {
    if (!stripe) {
      // Smart Discovery: Search for anything that looks like a Stripe Secret Key
      const secretKeyName = Object.keys(process.env).find(k => 
        k.toUpperCase().includes('STRIPE') && 
        k.toUpperCase().includes('SECRET')
      );
      const key = secretKeyName ? process.env[secretKeyName] : null;

      if (key && key.trim() !== "" && (key.trim().startsWith('sk_live') || key.trim().startsWith('sk_test'))) {
        console.log(`[PAYMENT SERVER] Initialized Stripe Client using found key: ${secretKeyName}`);
        stripe = new Stripe(key.trim());
      } else {
        console.warn(`[PAYMENT SERVER] STRIPE_SECRET_KEY not found or invalid format. Found names: ${Object.keys(process.env).filter(k => k.includes('STRIPE')).join(', ')}`);
      }
    }
    return stripe;
  };

  app.use(express.json());

  // API Route: V2 Configuration & Deep Diagnostics
  app.get("/api/config-v2", (req, res) => {
    try {
      // Smart Discovery for Publishable Key
      const pubKeyName = Object.keys(process.env).find(k => 
        k.toUpperCase().includes('STRIPE') && 
        k.toUpperCase().includes('PUBLISHABLE')
      ) || Object.keys(process.env).find(k => k.toUpperCase() === 'STRIPE_PK');

      const pubKey = pubKeyName ? process.env[pubKeyName] : null;
      
      // Smart Discovery for Secret Key
      const secretKeyName = Object.keys(process.env).find(k => 
        k.toUpperCase().includes('STRIPE') && 
        k.toUpperCase().includes('SECRET')
      );
      const secretKey = secretKeyName ? process.env[secretKeyName] : null;

      const stripeKeysInEnv = Object.keys(process.env).filter(k => k.toUpperCase().includes('STRIPE'));

      const diagnostics = {
        secretKeyFound: !!secretKey,
        secretKeyName: secretKeyName || "NOT FOUND",
        publishableKeyFound: !!pubKey,
        publishableKeyName: pubKeyName || "NOT FOUND",
        secretKeyValid: secretKey ? (secretKey.trim().startsWith('sk_live') || secretKey.trim().startsWith('sk_test')) : false,
        publishableKeyValid: pubKey ? (pubKey.trim().startsWith('pk_live') || pubKey.trim().startsWith('pk_test')) : false,
        allStripeKeys: stripeKeysInEnv,
        env: process.env.NODE_ENV || 'development'
      };

      console.log(`[API V2] Serving config. Active Pub Key: ${pubKeyName || 'None'}`);

      res.json({ 
        publishableKey: pubKey,
        diagnostics 
      });
    } catch (err: any) {
      console.error("Config V2 API Error:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // API Route: Create Stripe Checkout Session
  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const { priceId } = req.body;
      const stripeClient = getStripe();

      if (!stripeClient) {
        console.error("Payment Error: STRIPE_SECRET_KEY is missing from environment variables.");
        return res.status(500).json({ error: "Checkout is currently unavailable. Please contact support." });
      }

      // Determine price and details based on priceId
      let amount = 30000; // Default Standard £300
      let name = "Analysis Standard Package";
      let description = "Data-driven website structure reviewed by lead analysts for peak performance.";

      if (priceId === "price_premium_placeholder") {
        amount = 40000; // Elite £400
        name = "Psychological Elite Package";
        description = "Advanced behavioral design integration and full psychological conversion audit.";
      }

      const session = await stripeClient.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "gbp",
              product_data: {
                name,
                description,
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/?payment=success`,
        cancel_url: `${req.headers.origin}/?payment=cancel`,
      });

      res.json({ id: session.id, url: session.url });
    } catch (error: any) {
      console.error("Stripe session error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
