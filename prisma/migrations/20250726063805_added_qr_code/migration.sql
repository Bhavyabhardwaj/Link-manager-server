/*
  Warnings:

  - You are about to drop the column `qrCodeUrl` on the `Link` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Link" DROP COLUMN "qrCodeUrl",
ADD COLUMN     "qrCode" TEXT;
