"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../_actions/create-checkout";
import { loadStripe } from '@stripe/stripe-js'
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ReactNode } from "react";

const AcquirePlanButton = () => {
  const { user } = useUser();

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

  const hasPremiumPlan = user?.publicMetadata?.subscriptionPlan === 'premium';

  const managePlanButton: ReactNode = (
    <Button
      className="w-full rounded-full font-bold"
      variant='link'
    >
      <Link target="_blank" href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL as string}?prefilled_email=${user?.emailAddresses[0]}`}>Mange plan</Link>
    </Button>
  );
  const acquireButton: ReactNode = (
    <Button
      className="w-full rounded-full font-bold"
      onClick={handleAcquirePlanClick}
    >
      Acquire plan
    </Button>
  );

  return hasPremiumPlan ? managePlanButton : acquireButton;
};

export default AcquirePlanButton;
