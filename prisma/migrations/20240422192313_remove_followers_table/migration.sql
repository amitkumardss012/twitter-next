/*
  Warnings:

  - You are about to drop the `Followrs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Followrs" DROP CONSTRAINT "Followrs_user_id_fkey";

-- DropTable
DROP TABLE "Followrs";
