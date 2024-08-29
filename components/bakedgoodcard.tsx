'use client';

import {
  deleteBakedGood,
  getBakedGoodByName,
} from '@/actions/bakedGoods.actions';
import OrderBtn from './orderbtn';
import { BakedGood } from '@/types/data_types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AdminOnly from './auth/AdminOnly';

const BakedGoodCard = ({
  bakedGood,
  bakedGoods,
  setBakedGoods,
}: {
  bakedGood: BakedGood;
  setBakedGoods: any;
  bakedGoods: BakedGood[];
}) => {
  const router = useRouter();

  const handleOrderBtn = () => {
    const slug = bakedGood.title.split(' ').join('').toLowerCase();
    router.push(`/baked-good/${slug}`);
  };

  const handleDeleteBtn = async () => {
    try {
      const deleteGood = await deleteBakedGood(bakedGood.title);

      const filterGoods = bakedGoods.filter(
        (good) => bakedGood.title !== good.title
      );
      setBakedGoods(filterGoods);

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-5 p-3 bg-off-white border-solid rounded-lg shadow-lg">
      {/* info */}
      <div className="flex flex-col justify-between gap-4 w-1/2">
        <div>
          <p className="font-bold text-xl">{bakedGood.title}</p>
          <p>{bakedGood.description}</p>
        </div>
        <div className="flex gap-2">
          <OrderBtn handleClick={handleOrderBtn} text="ORDER" />
          <AdminOnly>
            <OrderBtn handleClick={handleDeleteBtn} text="DELETE" />
          </AdminOnly>
        </div>
      </div>

      {/* image */}
      <div className="relative w-1/2 h-64">
        <Image
          alt={bakedGood.title}
          src={bakedGood.image}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
};

export default BakedGoodCard;
