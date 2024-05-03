/*
  Warnings:

  - You are about to drop the column `bookmark_count` on the `Bookmark` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "bookmark_count";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "bookmark_count" INTEGER NOT NULL DEFAULT 0;
