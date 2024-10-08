import { Order } from '@/types/data_types';
import Image from 'next/image';
import StatusBtn from './statusbtn';
import AdminOnly from './auth/AdminOnly';
import UserOnly from './auth/UserOnly';
import StatusBtnUser from './statusbtnuser';
import OrderBtn from './orderbtn';
import { deleteBakedGood } from '@/actions/bakedGoods.actions';
import { deleteOrder } from '@/actions/orders.actions';
import { useRouter } from 'next/navigation';

const OrderCard = ({
  order,
  orders,
  setOrders,
}: {
  order: Order;
  orders: Order[];
  setOrders: any;
}) => {
  const status = order.status;

  const router = useRouter();

  const handleDeleteBtn = async () => {
    try {
      const deletedOrder = await deleteOrder(order.id);

      const filterOrders = orders.filter(
        (thisOrder) => thisOrder.id !== order.id
      );

      setOrders(filterOrders);

      router.push('/orders');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-5 p-3 bg-off-white border-solid rounded-lg shadow-lg">
      {/* info */}
      <div className="flex flex-col justify-between w-1/2">
        {/* text */}
        <div>
          <p className="font-bold text-2xl">{order.flat}</p>
          <div className="mt-4">
            <p className="text-lg">
              <b>Baked Good:</b> {order.bakedGoodTitle}
            </p>
            <p className="text-lg">
              <b>Quantity:</b> {order.quantity}
            </p>
            <p className="text-lg">
              <b>Date:</b> {order.date.substring(0, 10)}
            </p>
          </div>
        </div>
        {/* button */}
        <div className="flex gap-2">
          <AdminOnly>
            <StatusBtn status={status} />
            <OrderBtn handleClick={handleDeleteBtn} text="DELETE" />
          </AdminOnly>
          <UserOnly>
            <StatusBtnUser status={status} />
          </UserOnly>
        </div>
      </div>

      {/* image */}
      <div className="relative w-1/2 h-64">
        <Image
          alt={order.bakedGoodTitle}
          src={order.bakedGoodImage}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
};

export default OrderCard;
