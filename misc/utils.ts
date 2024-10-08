import { getAllBakedGoods } from '@/actions/bakedGoods.actions';
import { BakedGood } from '../types/data_types';

export const filterBakedGoods = (bakedGoods: BakedGood[], text: string): BakedGood[] => {
  const filteredGoods = bakedGoods.filter(bakedGood => bakedGood.title.toLowerCase().includes(text))

  return filteredGoods
}
