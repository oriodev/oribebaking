'use client';

import { deleteOrder } from '@/actions/orders.actions';
import convertToSubcurrency from '@/utils/convertToSubcurrency';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const CheckoutPage = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const searchParams = useSearchParams();
  const id = searchParams.get('orderId');

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    if (!id) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${amount}&id=${id}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);

      try {
        const deletedOrder = await deleteOrder(parseInt(id));
      } catch (error) {
        console.log(error);
      }
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center mt-10">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect[0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-10">
      {clientSecret && <PaymentElement />}
      <button
        disabled={!stripe || loading}
        className="bg-purple p-2 pr-3 pl-3 text-off-white font-extrabold rounded-lg mt-4 disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay £${amount}` : 'Processing...'}
      </button>
    </form>
  );
};

export default CheckoutPage;
