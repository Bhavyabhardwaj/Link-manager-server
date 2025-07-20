/*
  Warnings:

  - You are about to drop the column `slug` on the `linkClick` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Link` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "linkClick_slug_key";

-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "linkClick" DROP COLUMN "slug";

-- CreateIndex
CREATE UNIQUE INDEX "Link_slug_key" ON "Link"("slug");
