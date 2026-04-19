import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";

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

  const discoverKeys = () => {
    let sk = null;
    let pk = null;
    let skName = null;
    let pkName = null;

    // Scan all environment variables for Stripe-like values
    for (const [key, value] of Object.entries(process.env)) {
      if (!value) continue;
      const v = value.trim();
      
      // Look for Secret Key (sk_...)
      if (v.startsWith('sk_live_') || v.startsWith('sk_test_')) {
        sk = v;
        skName = key;
      }
      
      // Look for Publishable Key (pk_...)
      if (v.startsWith('pk_live_') || v.startsWith('pk_test_')) {
        pk = v;
        pkName = key;
      }
    }

    return { sk, pk, skName, pkName };
  };

  let stripe: Stripe | null = null;
  const getStripe = () => {
    if (!stripe) {
      const { sk, skName } = discoverKeys();
      if (sk) {
        console.log(`[PAYMENT SERVER] Initialized Stripe using key found in: ${skName}`);
        stripe = new Stripe(sk);
      } else {
        console.warn(`[PAYMENT SERVER] No Stripe Secret Key (sk_...) found in ANY environment variable.`);
      }
    }
    return stripe;
  };

  app.use(express.json());

  // API Route: God-Mode Configuration & Diagnostics
  app.get("/api/config-v2", (req, res) => {
    try {
      const { sk, pk, skName, pkName } = discoverKeys();
      
      const diagnostics = {
        secretKeyFound: !!sk,
        secretKeyName: skName || "NOT_FOUND",
        publishableKeyFound: !!pk,
        publishableKeyName: pkName || "NOT_FOUND",
        allKeys: Object.keys(process.env).filter(k => k.toUpperCase().includes('STRIPE') || k.toUpperCase().includes('KEY'))
      };

      res.json({ 
        publishableKey: pk,
        diagnostics 
      });
    } catch (err: any) {
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
