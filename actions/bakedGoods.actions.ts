'use server'

import { db } from '@/misc/db'
import { BakedGood } from '@/types/data_types';

export const getAllBakedGoods = async () => {
  try {

    const bakedGoods = await db.bakedGood.findMany()
    return bakedGoods

  } catch (error) {
    console.log(error)
  }
}

export const getBakedGoodByName = async (name: string) => {

  try {

    const bakedGood = await db.bakedGood.findFirst({
      where: {
        title: name
      }
    })

    return bakedGood

  } catch (error) {
    console.log(error)
  }

}

export const addBakedGood = async (bakedGood: BakedGood) => {

  try {
    const createBakedGood = await db.bakedGood.create({
      data: {
        title: bakedGood.title,
        description: bakedGood.description || '',
        image: bakedGood.image
      }
    })

    return { success: 'created!' }

  } catch (error) {
    console.log(error)
  }

}

export const updateBakedGoodByName = async (title: string, bakedGood: any) => {

  try {

    const getBakedGood = await getBakedGoodByName(title)
    const id = getBakedGood?.id

    if (!id) {
      return { error: 'no such baked good' }
    }

    const updatedBakeGood = await db.bakedGood.update({
      where: {
        id
      },
      data: {
        title: bakedGood.title,
        description: bakedGood.description || '',
        image: bakedGood.image
      }
    })
  } catch (error) {
    console.log(error)
  }

}

export const deleteBakedGood = async (name: string) => {
  try {
    const bakedGood = await getBakedGoodByName(name)


    if (!bakedGood) {
      return { error: 'no such baked good' }
    }

    const deletedBakedGood = await db.bakedGood.delete({
      where: {
        id: bakedGood.id
      }
    })

  } catch (error) {
    console.log(error)
  }
}