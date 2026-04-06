import { loadStripe } from '@stripe/stripe-js';

export const handleCheckout = async (priceId) => {
  const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

  const { error } = await stripe.redirectToCheckout({
    lineItems: [{ price: priceId, quantity: 1 }],
    mode: 'payment',
    // This is the "Magic" link that hits your onboarding form after they pay
    successUrl: `${window.location.origin}/launch-onboarding?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${window.location.origin}/pricing`,
  });

  if (error) {
    console.error("Stripe Error:", error);
  }
};