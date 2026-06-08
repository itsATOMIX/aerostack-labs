import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET_KEY || "sk_test_51Pdzo6Roe0gEeapIWjsFMPioPJb5k97NLAts9UkvpvC8tMCNoFpb3WXZwe4DnuZUgalbL53rWkW9LhyqBbzdXL5600xgYrombh";
const stripe = new Stripe(stripeSecret);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Configurer les headers CORS pour autoriser les requêtes du front-end
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Gérer la requête de pré-vérification (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { liters } = req.body;
    if (!liters || typeof liters !== 'number' || liters < 1) {
      return res.status(400).json({ error: 'Quantité invalide. Minimum 1 Litre.' });
    }

    const amountInCents = Math.round(liters * 2.15 * 100);

    // Déterminer l'origine dynamiquement sur Vercel
    const origin = req.headers.origin || req.headers.referer || 'https://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `${liters} Litres de Kérosène`,
              description: `Soutien volontaire pour AeroStack Labs (${liters} Litres d'AVGAS 100LL en carburant fictif)`,
              images: ['https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&q=80'],
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}?status=success&liters=${liters}`,
      cancel_url: `${origin}?status=cancelled`,
    });

    // Vercel utilise res.json() de la même manière qu'Express
    return res.status(200).json({ id: session.id, url: session.url });
  } catch (error: any) {
    console.error('Stripe Session Creation Error:', error);
    return res.status(500).json({ error: error.message || 'Erreur interne Stripe' });
  }
}