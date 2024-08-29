'use client';

import { useRouter } from 'next/navigation';
import OrderBtn from './orderbtn';
import { useState } from 'react';
import { addOrder } from '@/actions/orders.actions';
import { BakedGood } from '@/types/data_types';

const OrderForm = ({ bakedGood }: { bakedGood: BakedGood }) => {
  const router = useRouter();

  // State to manage form inputs
  const [quantity, setQuantity] = useState('');
  const [flat, setFlat] = useState('');
  const [date, setDate] = useState('');

  // @ts-ignore
  const handleClick = async (e) => {
    e.preventDefault();

    const order = {
      bakedGoodTitle: bakedGood.title,
      quantity: parseInt(quantity),
      flat,
      date,
      status: 0,
    };

    try {
      await addOrder(order);

      setQuantity('');
      setFlat('');
      setDate('');

      router.push('/');
    } catch (error) {
      console.error('Failed to add order:', error);
    }
  };

  return (
    <form className="flex flex-col items-center mt-5 w-full gap-5">
      <div className="flex flex-col w-2/3">
        <label htmlFor="quantity" className="text-lg">
          QUANTITY
        </label>
        <input
          type="number"
          className="bg-pink p-3 rounded-full text-purple-black placeholder-purple-black focus:outline-none"
          placeholder="1+"
          id="quantity"
          min={0}
          max={10}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      <div className="flex flex-col w-2/3">
        <label htmlFor="flatnumber" className="text-lg">
          FLAT NUMBER
        </label>
        <input
          type="text"
          className="bg-pink p-3 rounded-full text-purple-black placeholder-purple-black focus:outline-none"
          placeholder="103"
          id="flatnumber"
          value={flat}
          onChange={(e) => setFlat(e.target.value)}
        />
      </div>

      <div className="flex flex-col w-2/3">
        <label htmlFor="date" className="text-lg">
          DATE
        </label>
        <input
          type="date"
          className="bg-pink p-3 rounded-full text-purple-black placeholder-purple-black focus:outline-none"
          placeholder=""
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="flex justify-center w-2/3">
        <OrderBtn handleClick={handleClick} text="ORDER" />
      </div>
    </form>
  );
};

export default OrderForm;
