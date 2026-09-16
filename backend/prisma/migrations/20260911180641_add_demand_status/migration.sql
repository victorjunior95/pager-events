CREATE TYPE "DemandStatus" AS ENUM (
  'NOVA',
  'TRIAGEM',
  'RESPONSAVEL_ATRIBUIDO',
  'EM_ANDAMENTO',
  'CONCLUSAO_SINALIZADA',
  'ARQUIVADA'
);

ALTER TABLE "demands"
ADD COLUMN "status" "DemandStatus" NOT NULL DEFAULT 'NOVA';

CREATE INDEX "demands_status_idx"
ON "demands"("status");