'use client';

import React from 'react';
import { VscArrowLeft } from 'react-icons/vsc';
import { useRouter } from 'next/navigation';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import convertToSubcurrency from '@/utils/convertToSubcurrency';
import CheckoutPage from '@/components/CheckoutPage';

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is undefined.');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Page() {
  const amount = 1.99;
  const router = useRouter();

  const title = 'CHECKOUT';

  return (
    <div className="flex flex-col items-center h-screen max-w-lg mx-auto bg-off-white">
      {/* top */}
      <div className="flex flex-col gap-5 p-5 text-off-white bg-gradient-to-b from-pink via-mid-purple to-purple rounded-b-xxl w-full">
        <button onClick={() => router.push('/')}>
          <VscArrowLeft
            size={30}
            className="text-purple-black hover:text-off-white"
          />
        </button>
        <div className="flex flex-col items-center gap-5">
          <div>
            <p className="text-4xl text-center font-extrabold">{title}</p>
            <p className="font-bold text-3xl text-center mt-5 p-5 bg-off-white text-purple rounded-3xl">
              £{amount}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Elements
          stripe={stripePromise}
          options={{
            mode: 'payment',
            amount: convertToSubcurrency(amount),
            currency: 'gbp',
          }}
        >
          <CheckoutPage amount={amount} />
        </Elements>
      </div>
    </div>
  );
}
