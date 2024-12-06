/*
  Warnings:

  - Made the column `userId` on table `Visitors` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Visitors" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Visitors" ADD CONSTRAINT "Visitors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
