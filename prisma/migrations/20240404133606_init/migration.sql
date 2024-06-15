/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `Pengguna` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pengguna" DROP COLUMN "isAdmin";

-- CreateTable
CREATE TABLE "ProjectTracking" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "penggunaId" INTEGER NOT NULL,

    CONSTRAINT "ProjectTracking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectTracking" ADD CONSTRAINT "ProjectTracking_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTracking" ADD CONSTRAINT "ProjectTracking_penggunaId_fkey" FOREIGN KEY ("penggunaId") REFERENCES "Pengguna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
