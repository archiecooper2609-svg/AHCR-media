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

  let stripe: Stripe | null = null;
  const getStripe = () => {
    if (!stripe) {
      const key = process.env.STRIPE_SECRET_KEY;
      if (key && key.trim() !== "" && key.startsWith('sk_')) {
        stripe = new Stripe(key.trim());
      } else if (key) {
        console.error("Payment Error: STRIPE_SECRET_KEY is provided but does not appear to be a valid Stripe Secret Key (should start with sk_).");
      }
    }
    return stripe;
  };

  app.use(express.json());

  // Log Stripe Configuration Status
  console.log("--- Stripe Configuration Status ---");
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const publishableKey = process.env.VITE_STRIPE_PUBLISHABLE_KEY || process.env.STRIPE_PUBLISHABLE_KEY;
  
  if (secretKey) {
    console.log("✅ STRIPE_SECRET_KEY is defined " + (secretKey.startsWith('sk_') ? "(Valid format)" : "(INVALID format - should start with sk_)"));
  } else {
    console.log("❌ STRIPE_SECRET_KEY is MISSING");
  }

  if (publishableKey) {
    console.log("✅ STRIPE_PUBLISHABLE_KEY is defined " + (publishableKey.startsWith('pk_') ? "(Valid format)" : "(INVALID format - should start with pk_)"));
  } else {
    console.log("❌ STRIPE_PUBLISHABLE_KEY is MISSING");
  }
  console.log("-----------------------------------");

  // API Route: Provide publishable key to client
  app.get("/api/config", (req, res) => {
    const key = process.env.VITE_STRIPE_PUBLISHABLE_KEY || process.env.STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      console.warn("Pricing Error: No publishable key found in environment.");
    }
    res.json({ publishableKey: key });
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
