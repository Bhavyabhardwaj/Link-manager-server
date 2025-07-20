/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `linkClick` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `linkClick` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "linkClick_linkId_userId_key";

-- AlterTable
ALTER TABLE "linkClick" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "linkClick_slug_key" ON "linkClick"("slug");

-- CreateIndex
CREATE INDEX "linkClick_clickDate_idx" ON "linkClick"("clickDate");
