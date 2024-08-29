/*
  Warnings:

  - You are about to drop the column `bakedGood` on the `Order` table. All the data in the column will be lost.
  - Added the required column `bakedGoodId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "bakedGood",
ADD COLUMN     "bakedGoodId" INTEGER NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_bakedGoodId_fkey" FOREIGN KEY ("bakedGoodId") REFERENCES "BakedGood"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
