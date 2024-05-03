/*
  Warnings:

  - You are about to drop the column `like_cout` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "like_cout",
ADD COLUMN     "like_count" INTEGER NOT NULL DEFAULT 0;
