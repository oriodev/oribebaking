import { useState } from 'react';
import { useRouter } from 'next/navigation';
import OrderBtn from './orderbtn';
import { addBakedGood } from '@/actions/bakedGoods.actions';

const AddGoodForm = () => {
  const router = useRouter();

  // State to manage form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  // @ts-ignore
  const handleClick = async (e) => {
    e.preventDefault();

    const order = {
      title,
      description,
      image,
    };

    try {
      await addBakedGood(order);

      setTitle('');
      setDescription('');
      setImage('');

      router.push('/add-good');
    } catch (error) {
      console.error('Failed to add baked good:', error);
    }
  };

  return (
    <form className="flex flex-col items-center mt-5 w-full gap-5">
      <div className="flex flex-col w-2/3">
        <label htmlFor="title" className="text-lg">
          TITLE
        </label>
        <input
          type="text"
          className="bg-off-white p-3 rounded-lg text-purple-black placeholder-purple-black focus:outline-none"
          placeholder="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col w-2/3">
        <label htmlFor="description" className="text-lg">
          DESCRIPTION
        </label>
        <input
          type="text"
          className="bg-off-white p-3 rounded-lg text-purple-black placeholder-purple-black focus:outline-none"
          placeholder="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex flex-col w-2/3">
        <label htmlFor="image" className="text-lg">
          IMAGE URL
        </label>
        <input
          type="text"
          className="bg-off-white p-3 rounded-lg text-purple-black placeholder-purple-black focus:outline-none"
          placeholder="image url"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      <div className="flex justify-center w-2/3">
        <OrderBtn handleClick={handleClick} text="ADD" />
      </div>
    </form>
  );
};

export default AddGoodForm;
