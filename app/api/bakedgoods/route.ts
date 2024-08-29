import { addBakedGood, deleteBakedGood, getAllBakedGoods, getBakedGoodByName, updateBakedGoodByName } from '@/actions/bakedGoods.actions';
import { addOrder, deleteOrder, getAllOrders, getOrderById, updateOrderStatusById } from '@/actions/orders.actions';

export async function GET(req: any) {
  try {

    const orders = await getAllOrders()
    return new Response(JSON.stringify(orders), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch authors' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
