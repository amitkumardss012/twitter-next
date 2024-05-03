/*
  Warnings:

  - You are about to drop the column `isBookmark` on the `Bookmark` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "isBookmark";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "isBookmark" BOOLEAN NOT NULL DEFAULT false;
