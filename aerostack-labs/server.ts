import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

// Direct fallback to user provided sk_test key if not set in server env
const stripeSecret = process.env.STRIPE_SECRET_KEY || "sk_test_51Pdzo6Roe0gEeapIWjsFMPioPJb5k97NLAts9UkvpvC8tMCNoFpb3WXZwe4DnuZUgalbL53rWkW9LhyqBbzdXL5600xgYrombh";

let stripeClient: Stripe | null = null;
function getStripe(): Stripe {
  if (!stripeClient) {
    stripeClient = new Stripe(stripeSecret);
  }
  return stripeClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoints FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const { liters } = req.body;
      if (!liters || typeof liters !== "number" || liters < 1) {
        return res.status(400).json({ error: "Quantité invalide. Minimum 1 Litre." });
      }

      const stripe = getStripe();
      const amountInCents = Math.round(liters * 2.15 * 100);

      // Determine client base URL dynamically
      const origin = req.get("origin") || req.get("referer") || "http://localhost:3000";

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: `${liters} Litres de Kérosène`,
                description: `Soutien volontaire pour AeroStack Labs (${liters} Litres d'AVGAS 100LL en carburant fictif)`,
                images: ["https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&q=80"],
              },
              unit_amount: amountInCents,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${origin}?status=success&liters=${liters}`,
        cancel_url: `${origin}?status=cancelled`,
      });

      res.json({ id: session.id, url: session.url });
    } catch (error: any) {
      console.error("Stripe Session Creation Error:", error);
      res.status(500).json({ error: error.message || "Erreur interne Stripe" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
