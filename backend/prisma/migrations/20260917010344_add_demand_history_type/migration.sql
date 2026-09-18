/*
  Warnings:

  - Added the required column `type` to the `demand_history` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DemandHistoryType" AS ENUM ('URGENCY_CHANGED', 'STATUS_CHANGED', 'RESPONSIBLE_ASSIGNED', 'RESPONSIBLE_CHANGED', 'RESPONSIBLE_REMOVED', 'CLOSED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "demand_history" ADD COLUMN     "type" "DemandHistoryType" NOT NULL;

-- CreateIndex
CREATE INDEX "demand_history_type_idx" ON "demand_history"("type");
