export interface BakedGood {
  title: string,
  description?: string,
  image: string
}

export interface Order {
  bakedGoodTitle: string;
  bakedGoodImage: string;
  quantity: number;
  date: string;
  flat: string;
  status: number;
}