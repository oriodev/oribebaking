'use client';

import OrderCard from '@/components/ordercard';
import { orders } from '@/misc/mock_data';
import { useRouter } from 'next/navigation';

import { VscArrowLeft } from 'react-icons/vsc';

export default function Home() {
  const title = 'ORDERS';
  const description = 'the goods we be working on!';

  const mockOrders = orders.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const router = useRouter();

  return (
    <div className="flex flex-col items-center h-screen bg-off-white">
      {/* top */}
      <div className="mt-5 p-5 flex flex-col gap-3 justify-center items-center">
        <button onClick={() => router.push('/')}>
          <VscArrowLeft
            size={30}
            className="text-purple-black hover:text-off-white"
          />
        </button>
        <p className="font-bold text-3xl">{title}</p>
        <p className="text-center text-lg">{description}</p>
      </div>

      {/* baked goods */}
      <div className="overflow-auto bg-gradient-to-b from-purple via-mid-purple to-pink flex flex-col gap-5 p-7 rounded-t-xxl max-w-lg scroll no-scrollbar h-screen w-full">
        {mockOrders.map((order) => {
          return <OrderCard key={order.bakedGoodTitle} order={order} />;
        })}

        {orders.length === 0 && (
          <div className="text-off-white text-lg flex justify-center">
            <p>no orders!</p>
          </div>
        )}
      </div>
    </div>
  );
}
