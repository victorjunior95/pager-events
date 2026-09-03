-- CreateEnum
CREATE TYPE "DemandUrgency" AS ENUM ('NENHUMA', 'BAIXA', 'MÉDIA', 'ALTA', 'CRÍTICA');

-- CreateTable
CREATE TABLE "demands" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "urgency" "DemandUrgency" NOT NULL DEFAULT 'NENHUMA',
    "dueAt" TIMESTAMP(3),
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "closedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "demands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "demand_areas" (
    "demandId" TEXT NOT NULL,
    "areaId" TEXT NOT NULL,

    CONSTRAINT "demand_areas_pkey" PRIMARY KEY ("demandId","areaId")
);

-- CreateTable
CREATE TABLE "demand_history" (
    "id" TEXT NOT NULL,
    "demandId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "demand_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "demands_code_key" ON "demands"("code");

-- CreateIndex
CREATE INDEX "demands_urgency_idx" ON "demands"("urgency");

-- CreateIndex
CREATE INDEX "demands_archived_idx" ON "demands"("archived");

-- CreateIndex
CREATE INDEX "demands_dueAt_idx" ON "demands"("dueAt");

-- CreateIndex
CREATE INDEX "demand_areas_areaId_idx" ON "demand_areas"("areaId");

-- CreateIndex
CREATE INDEX "demand_history_demandId_createdAt_idx" ON "demand_history"("demandId", "createdAt");

-- AddForeignKey
ALTER TABLE "demand_areas" ADD CONSTRAINT "demand_areas_demandId_fkey" FOREIGN KEY ("demandId") REFERENCES "demands"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demand_areas" ADD CONSTRAINT "demand_areas_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "areas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demand_history" ADD CONSTRAINT "demand_history_demandId_fkey" FOREIGN KEY ("demandId") REFERENCES "demands"("id") ON DELETE CASCADE ON UPDATE CASCADE;
