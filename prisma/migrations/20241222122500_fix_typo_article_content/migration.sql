/*
  Warnings:

  - You are about to drop the column `articeContent` on the `redis_prac` table. All the data in the column will be lost.
  - Added the required column `articleContent` to the `redis_prac` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `redis_prac` DROP COLUMN `articeContent`,
    ADD COLUMN `articleContent` VARCHAR(191) NOT NULL;
