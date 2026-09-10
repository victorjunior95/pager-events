/*
  Warnings:

  - You are about to drop the column `userId` on the `demands` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "demands" DROP CONSTRAINT "demands_userId_fkey";

-- AlterTable
ALTER TABLE "demands" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "demands" ADD CONSTRAINT "demands_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
