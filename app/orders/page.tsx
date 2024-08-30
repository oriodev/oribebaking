'use client';

import { getAllOrders } from '@/actions/orders.actions';
import OrderCard from '@/components/ordercard';
import { Order } from '@/types/data_types';
import { checkRole, getUserId } from '@/utils/roles';
import { auth } from '@clerk/nextjs/server';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { VscArrowLeft } from 'react-icons/vsc';

export default function Home() {
  const title = 'ORDERS';
  const description = 'the goods we be working on!';

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      const orders = await getAllOrders();

      const isAdmin = await checkRole('admin');

      if (orders && isAdmin) {
        setOrders(orders);
      }

      if (orders && !isAdmin) {
        const userId = await getUserId();

        const usersOrders = orders.filter((order) => order.userId === userId);
        setOrders(usersOrders);
      }
    };

    getOrders();
  }, []);

  const sortedOrders = orders.sort(
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
        {sortedOrders.map((order) => {
          return (
            <OrderCard
              key={order.bakedGoodTitle}
              order={order}
              orders={orders}
              setOrders={setOrders}
            />
          );
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
