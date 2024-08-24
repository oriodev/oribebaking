import OrderBtn from './orderbtn';
import { BakedGood } from '@/misc/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const BakedGoodCard = ({ bakedGood }: { bakedGood: BakedGood }) => {
  const router = useRouter();

  const handleOrderBtn = () => {
    const slug = bakedGood.title.split(' ').join('').toLowerCase();
    router.push(`/baked-good/${slug}`);
  };

  return (
    <div className="flex gap-5 p-3 bg-off-white border-solid rounded-lg shadow-lg">
      {/* info */}
      <div className="flex flex-col justify-between gap-4 w-1/2">
        <div>
          <p className="font-bold text-xl">{bakedGood.title}</p>
          <p>{bakedGood.description}</p>
        </div>
        <div>
          <OrderBtn handleClick={handleOrderBtn} />
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
