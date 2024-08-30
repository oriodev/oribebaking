import { BakedGood } from '@/types/data_types';
import { filterBakedGoods } from '@/misc/utils';

interface SearchbarProps {
  allBakedGoods: BakedGood[];
  bakedGoods: BakedGood[];
  setBakedGoods: any;
}

const Searchbar = ({ allBakedGoods, setBakedGoods }: SearchbarProps) => {
  const handleInputChange = (e: any) => {
    const input = e.target.value;

    const bakedGoods = filterBakedGoods(allBakedGoods, input);

    setBakedGoods(bakedGoods);
  };

  return (
    <div className="flex items-center justify-between p-3 bg-purple w-full rounded-full text-off-white">
      <input
        type="text"
        placeholder="search"
        className="bg-[transparent] outline-none border-none placeholder-off-white w-full"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Searchbar;
