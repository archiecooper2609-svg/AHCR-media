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

  // Global logging middleware to debug API reachability
  app.use((req, res, next) => {
    if (req.url.startsWith('/api')) {
      console.log(`[API REQUEST] ${req.method} ${req.url}`);
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

  // Log Stripe Configuration Status
  console.log("--- Payment System Diagnostics ---");
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const publishableKey = process.env.VITE_STRIPE_PUBLISHABLE_KEY || process.env.STRIPE_PUBLISHABLE_KEY;
  
  if (secretKey) {
    console.log(`✅ SECRET KEY: Found (${secretKey.substring(0, 7)}...)`);
  } else {
    console.log("❌ SECRET KEY: MISSING");
  }

  if (publishableKey) {
    console.log(`✅ PUBLISHABLE KEY: Found (${publishableKey.substring(0, 7)}...)`);
  } else {
    console.log("❌ PUBLISHABLE KEY: MISSING");
  }
  console.log(`NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
  console.log("----------------------------------");

  // Health check
  app.get("/api/health", (req, res) => res.json({ status: "ok", time: new Date().toISOString() }));

  // API Route: Provide publishable key to client
  app.get("/api/config", (req, res) => {
    try {
      const key = process.env.VITE_STRIPE_PUBLISHABLE_KEY || process.env.STRIPE_PUBLISHABLE_KEY;
      res.json({ publishableKey: key });
    } catch (err: any) {
      console.error("Config API Error:", err);
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
