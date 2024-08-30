'use client';

import { getOrderById, updateOrderStatusById } from '@/actions/orders.actions';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Page({
  searchParams,
}: {
  searchParams: { amount: string };
}) {
  const title = 'BAKED GOOD ORDERED!';
  const router = useRouter();

  const params = useSearchParams();
  const id = params.get('id');

  useEffect(() => {
    const setStatus = async () => {
      try {
        if (id) {
          const updateOrder = updateOrderStatusById(parseInt(id), 1);
        }
      } catch (error) {
        console.log(error);
      }
    };

    setStatus();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen max-w-lg mx-auto bg-off-white">
      {/* top */}
      <div className="flex flex-col items-center gap-5">
        <div>
          <p className="text-4xl text-center font-extrabold">{title}</p>
          <div className="font-bold text-lg flex justify-center gap-5 mt-5">
            <button onClick={() => router.push('/')}>return home</button>
            <button onClick={() => router.push('/orders')}>view orders</button>
          </div>
        </div>
      </div>
    </div>
  );
}
