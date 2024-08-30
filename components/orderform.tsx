'use client';

import { useRouter } from 'next/navigation';
import OrderBtn from './orderbtn';
import { useState } from 'react';
import { addOrder } from '@/actions/orders.actions';
import { BakedGood } from '@/types/data_types';

const OrderForm = ({ bakedGood }: { bakedGood: BakedGood }) => {
  const router = useRouter();

  const [quantity, setQuantity] = useState('');
  const [flat, setFlat] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  // @ts-ignore
  const handleClick = async (e) => {
    e.preventDefault();

    if (!quantity || !flat || !date) {
      setError('All fields are required.');
      return;
    }

    setError('');

    const order = {
      bakedGoodTitle: bakedGood.title,
      quantity: parseInt(quantity),
      flat,
      date,
      status: 0,
    };

    try {
      const orderId = await addOrder(order);

      if (!orderId) {
        return { error: 'no such order id ' };
      }

      setQuantity('');
      setFlat('');
      setDate('');

      router.push(`/checkout?orderId=${orderId.id}`);
    } catch (error) {
      console.error('Failed to add order:', error);
    }
  };

  return (
    <form className="flex flex-col items-center mt-5 w-full gap-5">
      {error && <div className="text-red-500">{error}</div>}

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
          required
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
          required
        />
      </div>

      <div className="flex flex-col w-2/3">
        <label htmlFor="date" className="text-lg">
          DATE
        </label>
        <input
          type="date"
          className="bg-pink p-3 rounded-full text-purple-black placeholder-purple-black focus:outline-none"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="flex justify-center w-2/3">
        <OrderBtn handleClick={handleClick} text="ORDER" />
      </div>
    </form>
  );
};

export default OrderForm;
