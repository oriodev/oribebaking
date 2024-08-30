export interface BakedGood {
  id?: number,
  title: string,
  description?: string,
  image: string
}

export interface Order {
  id: number;
  bakedGoodTitle: string;
  bakedGoodImage: string;
  quantity: number;
  date: string;
  flat: string;
  status: number;
}