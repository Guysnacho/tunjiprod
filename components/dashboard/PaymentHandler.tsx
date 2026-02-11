import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export type PaymentHandlerType =
  | "professional"
  | "student"
  | "postdoctorial"
  | "member_only_professional"
  | "member_only_student"
  | "member_only_postdoctorial"
  | undefined;

export type PaymentBody = {
  tier: PaymentHandlerType;
  userId?: string;
  email: string;
  fname?: string;
  lname?: string;
  institution?: string;
};

export const PaymentHandler = ({
  tier,
  userId,
  email,
  fname,
  lname,
  institution,
}: PaymentBody) => {
  const fetchClientSecret = useCallback(async () => {
    // Create a Checkout Session
    const res = await fetch("/checkout", {
      method: "POST",
      body: JSON.stringify({
        tier,
        userId,
        email,
        fname,
        lname,
        institution,
      } as PaymentBody),
    });
    const data = await res.json();
    return data.clientSecret;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, tier, userId]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout id={`stripe-checkout-${tier}`} />
      </EmbeddedCheckoutProvider>
    </div>
  );
};
