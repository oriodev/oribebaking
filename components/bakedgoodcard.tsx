import OrderBtn from './orderbtn';
import { BakedGood } from '@/misc/types';
import Image from 'next/image';

const BakedGoodCard = ({ bakedGood }: { bakedGood: BakedGood }) => {
  return (
    <div className="flex gap-5 p-3 bg-off-white border-solid rounded-lg shadow-lg">
      {/* info */}
      <div className="flex flex-col justify-between gap-4 w-1/2">
        <div>
          <p className="font-bold text-xl">{bakedGood.title}</p>
          <p>{bakedGood.description}</p>
        </div>
        <div>
          <OrderBtn />
        </div>
      </div>

      {/* image */}
      <div className="relative w-1/2 h-64">
        <Image
          alt={bakedGood.title}
          src={bakedGood.image}
          fill
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default BakedGoodCard;
