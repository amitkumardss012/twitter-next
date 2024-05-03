/*
  Warnings:

  - You are about to drop the column `follower_count` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `following_count` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "follower_count",
DROP COLUMN "following_count";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "follower_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "following_count" INTEGER NOT NULL DEFAULT 0;
