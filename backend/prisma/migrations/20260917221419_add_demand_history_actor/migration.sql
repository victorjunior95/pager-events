-- AlterTable
ALTER TABLE "demand_history" ADD COLUMN     "actorId" TEXT;

-- CreateIndex
CREATE INDEX "demand_history_actorId_idx" ON "demand_history"("actorId");

-- AddForeignKey
ALTER TABLE "demand_history" ADD CONSTRAINT "demand_history_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
