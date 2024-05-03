/*
  Warnings:

  - You are about to drop the `Followers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Followers" DROP CONSTRAINT "Followers_user_id_fkey";

-- DropTable
DROP TABLE "Followers";

-- CreateTable
CREATE TABLE "Followrs" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Followrs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Followrs" ADD CONSTRAINT "Followrs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
