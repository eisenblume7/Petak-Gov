/*
  Warnings:

  - Made the column `password` on table `Pengguna` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Pengguna" ALTER COLUMN "password" SET NOT NULL;
