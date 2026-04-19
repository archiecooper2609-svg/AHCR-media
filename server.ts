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
      const key = process.env.STRIPE_SECRET_KEY;
      if (key && key.trim() !== "" && key.startsWith('sk_')) {
        stripe = new Stripe(key.trim());
      }
    }
    return stripe;
  };

  app.use(express.json());

  // API Route: V2 Configuration & Deep Diagnostics
  app.get("/api/config-v2", (req, res) => {
    try {
      const secretKey = process.env.STRIPE_SECRET_KEY;
      const pubKey = process.env.VITE_STRIPE_PUBLISHABLE_KEY || process.env.STRIPE_PUBLISHABLE_KEY;
      
      const stripeKeysFound = Object.keys(process.env).filter(k => k.toUpperCase().includes('STRIPE'));

      const diagnostics = {
        secretKeySet: !!secretKey,
        publishableKeySet: !!pubKey,
        secretKeyValid: secretKey ? (secretKey.trim().startsWith('sk_live_') || secretKey.trim().startsWith('sk_test_')) : false,
        publishableKeyValid: pubKey ? (pubKey.trim().startsWith('pk_live_') || pubKey.trim().startsWith('pk_test_')) : false,
        keysFoundInEnv: stripeKeysFound,
        env: process.env.NODE_ENV || 'development'
      };

      console.log(`[API V2] Serving config. Found keys: ${stripeKeysFound.join(', ')}`);

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
