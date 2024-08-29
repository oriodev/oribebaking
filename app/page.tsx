'use client';

import { getAllBakedGoods } from '@/actions/bakedGoods.actions';
import AuthBar from '@/components/auth/AuthBar';
import BakedGoodCard from '@/components/bakedgoodcard';
import Searchbar from '@/components/searchbar';
import { bakedGoods as mockBakedGoods } from '@/misc/mock_data';
import { BakedGood } from '@/types/data_types';
import { useState, useEffect } from 'react';

export default function Home() {
  const title = 'ORI BE BAKING';
  const description = 'baked goods for the residents of lindon house!';

  const [allBakedGoods, setAllBakedGoods] = useState<BakedGood[]>([]);
  const [bakedGoods, setBakedGoods] = useState<BakedGood[]>([]);

  //

  useEffect(() => {
    const getBakedGoods = async () => {
      const goods = await getAllBakedGoods();

      if (goods) {
        setAllBakedGoods(goods);
        setBakedGoods(goods);
      }
    };

    getBakedGoods();
  }, []);

  return (
    <div className="flex flex-col items-center h-screen bg-off-white">
      {/* top */}
      <div className="mt-5 p-5 flex flex-col gap-3 justify-center items-center">
        <AuthBar />

        <p className="font-bold text-3xl">{title}</p>
        <p className="text-center text-lg">{description}</p>
        <Searchbar
          allBakedGoods={allBakedGoods}
          bakedGoods={bakedGoods}
          setBakedGoods={setBakedGoods}
        />
      </div>
      {/* baked goods */}
      <div className="overflow-auto bg-gradient-to-b from-purple via-mid-purple to-pink flex flex-col gap-5 p-7 rounded-t-xxl max-w-lg scroll no-scrollbar h-screen w-full">
        {bakedGoods.map((bakedGood) => {
          return (
            <BakedGoodCard
              key={bakedGood.title}
              bakedGood={bakedGood}
              setBakedGoods={setBakedGoods}
              bakedGoods={bakedGoods}
            />
          );
        })}

        {bakedGoods.length === 0 && (
          <div className="text-off-white text-lg flex justify-center">
            <p>no goods match your query!</p>
          </div>
        )}
      </div>
    </div>
  );
}
