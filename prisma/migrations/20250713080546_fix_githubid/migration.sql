/*
  Warnings:

  - You are about to drop the column `image` on the `Link` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[github_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Link" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "github_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_github_id_key" ON "User"("github_id");
