import { useRouter } from 'next/navigation';
import OrderBtn from './orderbtn';

const OrderForm = () => {
  const router = useRouter();

  const handleClick = () => {
    console.log('order!');
    router.push('/');
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
        />
      </div>
      <div className="flex justify-center w-2/3">
        <OrderBtn handleClick={handleClick} />
      </div>
    </form>
  );
};

export default OrderForm;
