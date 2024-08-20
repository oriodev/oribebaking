import BakedGoodCard from '@/components/bakedgoodcard';
import { bakedGoods } from '@/misc/mock_data';

export default function Home() {
  const title = 'ORI BE BAKING';
  const description = 'baked goods for the residents of lindon house!';

  return (
    <div className="flex flex-col h-screen">
      {/* top */}
      <div className="bg-off-white p-5 flex flex-col justify-center items-center">
        <p className="font-bold text-xl">{title}</p>
        <p>{description}</p>
      </div>
      {/* baked goods */}
      <div className="overflow-auto bg-gradient-to-b from-purple via-mid-purple to-pink flex flex-col gap-5 p-5 rounded-t-xxl">
        {bakedGoods.map((bakedGood) => {
          return <BakedGoodCard key={bakedGood.title} bakedGood={bakedGood} />;
        })}
      </div>
    </div>
  );
}
