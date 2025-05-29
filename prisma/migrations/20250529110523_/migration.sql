/*
  Warnings:

  - Added the required column `cafe_location` to the `Cafeteria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Cafeteria` ADD COLUMN `cafe_location` VARCHAR(191) NOT NULL;
