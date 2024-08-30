'use server'

import { db } from '@/misc/db'
import { getBakedGoodByName } from './bakedGoods.actions';
import { auth } from '@clerk/nextjs/server';

export const getAllOrders = async () => {
  try {

    const orders = await db.order.findMany({
      include: {
        bakedGood: true
      }
    })

    const formattedOrders = orders.map((order) => {
      return {
        id: order.id,
        bakedGoodTitle: order.bakedGood.title,
        bakedGoodImage: order.bakedGood.image,
        quantity: order.quantity,
        date: order.date,
        flat: order.flat,
        status: order.status,
        userId: order.userId
      }
    })

    return formattedOrders

  } catch (error) {
    console.log(error)
  }
}

export const getOrderById = async (id: number) => {

  try {

    const order = await db.order.findFirst({
      where: {
        id
      },
      include: {
        bakedGood: true
      }
    })

    if (!order) {
      return { error: 'no such order' }
    }


    const formattedOrder = {
      bakedGoodTitle: order.bakedGood.title,
      bakedGoodImage: order.bakedGood.image,
      quantity: order.quantity,
      date: order.date,
      flat: order.flat,
      status: order.status
    }

    return formattedOrder

  } catch (error) {
    console.log(error)
  }

}

export const addOrder = async (order: any) => {

  const { userId } = auth();

  if (!userId) {
    return { error: 'no such user' }
  }

  const bakedGood = await getBakedGoodByName(order.bakedGoodTitle)

  if (!bakedGood) {
    return { error: 'no such baked good' }
  }

  try {
    const createOrder = await db.order.create({
      data: {
        bakedGoodId: bakedGood.id,
        quantity: order.quantity,
        flat: order.flat,
        date: order.date,
        status: order.status,
        userId: userId
      }
    })

    return { success: 'created!', id: createOrder.id }

  } catch (error) {
    console.log(error)
  }

}

export const updateOrderStatusById = async (id: number, status: number) => {

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