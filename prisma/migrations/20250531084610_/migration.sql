/*
  Warnings:

  - Made the column `cafe_category` on table `Cafeteria` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cafe_stadiumId` on table `Cafeteria` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Cafeteria` DROP FOREIGN KEY `Cafeteria_cafe_stadiumId_fkey`;

-- DropIndex
DROP INDEX `Cafeteria_cafe_stadiumId_fkey` ON `Cafeteria`;

-- AlterTable
ALTER TABLE `Cafeteria` MODIFY `cafe_category` VARCHAR(191) NOT NULL,
    MODIFY `cafe_stadiumId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Cafeteria` ADD CONSTRAINT `Cafeteria_cafe_stadiumId_fkey` FOREIGN KEY (`cafe_stadiumId`) REFERENCES `Stadium`(`sta_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
