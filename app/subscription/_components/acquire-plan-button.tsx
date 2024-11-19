"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../_actions/create-checkout";
import { loadStripe } from '@stripe/stripe-js'

const AcquirePlanButton = () => {
  const handleAcquirePlanClick = async () => {
    // Check for strip publishable key:
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Missing stripe publishable key");
    }

    // Create stripe checkout:
    const { sessionId } = await createStripeCheckout();
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

    if (!stripe) {
      throw new Error("Stripe not found");
    }

    // Redirect user to stripe checkout:
    await stripe.redirectToCheckout({ sessionId });
  }

  return (
    <Button className="w-full rounded-full font-bold" onClick={handleAcquirePlanClick}>Acquire plan</Button>
  );
};

export default AcquirePlanButton;
