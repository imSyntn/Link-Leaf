/*
  Warnings:

  - You are about to drop the column `timeStamp` on the `Visitors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Visitors" DROP COLUMN "timeStamp",
ADD COLUMN     "month" INTEGER,
ADD COLUMN     "year" INTEGER;
