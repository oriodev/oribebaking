'use client';

import Image from 'next/image';
import { BakedGood } from '@/types/data_types';
import { getAllBakedGoods } from '@/actions/bakedGoods.actions';
import { redirect, useRouter } from 'next/navigation';
import { VscArrowLeft } from 'react-icons/vsc';
import OrderForm from '@/components/orderform';
import { useEffect, useState } from 'react';

interface Params {
  slug: string;
}

export default function BakedGoodPage({ params }: { params: Params }) {
  const { slug } = params;
  const [allGoods, setAllGoods] = useState<BakedGood[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchBakedGoods = async () => {
      try {
        const goods = await getAllBakedGoods();
        setAllGoods(goods ?? []);
      } catch (error) {
        console.error('Failed to fetch baked goods:', error);
        setError('Failed to fetch data.');
        setAllGoods([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBakedGoods();
  }, []);

  const bakedGood: BakedGood | undefined = allGoods.find(
    (item) => item.title.toLowerCase().replace(/\s+/g, '') === slug
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!bakedGood) {
    redirect('/');
    return null;
  }

  const title = bakedGood.title.toUpperCase();
  const description = bakedGood.description;

  return (
    <div className="flex flex-col items-center max-h-full h-screen pb-5 max-w-lg mx-auto bg-off-white">
      {/* top */}
      <div className="flex flex-col gap-5 p-5 text-off-white bg-gradient-to-b from-pink via-mid-purple to-purple rounded-b-xxl w-full">
        <button onClick={() => router.push('/')}>
          <VscArrowLeft
            size={30}
            className="text-purple-black hover:text-off-white"
          />
        </button>
        <div className="flex flex-col items-center gap-5">
          <div className="relative w-64 h-64">
            <Image
              alt={bakedGood.image}
              src={bakedGood.image}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div>
            <p className="font-bold text-3xl text-center">{title}</p>
            <p className="text-center">{description}</p>
          </div>
        </div>
      </div>

      {/* form */}
      <div className="w-full">
        <OrderForm bakedGood={bakedGood} />
      </div>
    </div>
  );
}
