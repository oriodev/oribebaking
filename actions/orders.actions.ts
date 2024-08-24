import { db } from '@/misc/db'
import { Order } from '@/misc/types';
import { getBakedGoodByName } from './bakedGoods.actions';

export const getAllOrders = async () => {
  try {

    const orders = await db.order.findMany()
    return orders

  } catch (error) {
    console.log(error)
  }
}

export const getOrderById = async (id: number) => {

  try {

    const order = await db.order.findFirst({
      where: {
        id
      }
    })

    return order

  } catch (error) {
    console.log(error)
  }

}

export const addOrder = async (order: Order) => {

  const bakedGood = await getBakedGoodByName(order.bakedGoodTitle)

  if (!bakedGood) {
    return { error: 'no such baked good' }
  }

  try {
    const createOrder = await db.order.create({
      data: {
        bakedGood: bakedGood.id,
        quantity: order.quantity,
        flat: order.flat,
        date: order.date,
        status: order.status
      }
    })

    return { success: 'created!' }

  } catch (error) {
    console.log(error)
  }

}

export const updateOrderStatusById = async (id: number, status: string) => {

  try {

    const getOrder = await getOrderById(id)

    if (!getOrder) {
      return { error: 'no such order' }
    }

    const updateOrderStatus = await db.order.update({
      where: {
        id
      },
      data: {
        status
      }
    })
  } catch (error) {
    console.log(error)
  }

}

export const deleteOrder = async (id: number) => {
  try {
    const order = await getOrderById(id)


    if (!order) {
      return { error: 'no such order' }
    }

    const deletedOrder = await db.order.delete({
      where: {
        id: id
      }
    })

  } catch (error) {
    console.log(error)
  }
}