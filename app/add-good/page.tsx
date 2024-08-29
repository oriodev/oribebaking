'use client';

import { getAllBakedGoods } from '@/actions/bakedGoods.actions';
import AddGoodForm from '@/components/addgoodform';
import AuthBar from '@/components/auth/AuthBar';
import BakedGoodCard from '@/components/bakedgoodcard';
import Searchbar from '@/components/searchbar';
import { bakedGoods as mockBakedGoods } from '@/misc/mock_data';
import { BakedGood } from '@/types/data_types';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Home() {
  const title = 'ADD A NEW GOOD';

  const router = useRouter();

  const goHome = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center h-screen bg-off-white">
      {/* top */}
      <div className="mt-5 p-5 flex flex-col gap-3 justify-center items-center">
        <AuthBar />

        <p className="font-bold text-3xl hover:cursor-pointer" onClick={goHome}>
          {title}
        </p>
      </div>
      {/* baked goods */}
      <div className="overflow-auto bg-gradient-to-b from-purple via-mid-purple to-pink flex flex-col gap-5 p-7 rounded-t-xxl max-w-lg scroll no-scrollbar h-screen w-full">
        <AddGoodForm />
      </div>
    </div>
  );
}
