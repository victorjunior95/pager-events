-- AlterTable
ALTER TABLE "demands" ADD COLUMN     "responsibleId" TEXT,
ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE INDEX "demands_responsibleId_idx" ON "demands"("responsibleId");

-- AddForeignKey
ALTER TABLE "demands" ADD CONSTRAINT "demands_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
