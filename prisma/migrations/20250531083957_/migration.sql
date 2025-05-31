/*
  Warnings:

  - You are about to drop the column `stadiumId` on the `Cafeteria` table. All the data in the column will be lost.
  - You are about to drop the column `stadiumId` on the `Recommendation` table. All the data in the column will be lost.
  - You are about to drop the column `user_kakao` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_stadium` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ParkingLot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StartPitcherList` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `reco_stadiumId` to the `Recommendation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Cafeteria` DROP FOREIGN KEY `Cafeteria_stadiumId_fkey`;

-- DropForeignKey
ALTER TABLE `ParkingLot` DROP FOREIGN KEY `ParkingLot_stadiumId_fkey`;

-- DropForeignKey
ALTER TABLE `Recommendation` DROP FOREIGN KEY `Recommendation_stadiumId_fkey`;

-- DropIndex
DROP INDEX `Cafeteria_stadiumId_fkey` ON `Cafeteria`;

-- DropIndex
DROP INDEX `Recommendation_stadiumId_fkey` ON `Recommendation`;

-- AlterTable
ALTER TABLE `Cafeteria` DROP COLUMN `stadiumId`,
    ADD COLUMN `cafe_category` VARCHAR(191) NULL,
    ADD COLUMN `cafe_stadiumId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Recommendation` DROP COLUMN `stadiumId`,
    ADD COLUMN `reco_stadiumId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `user_kakao`,
    DROP COLUMN `user_stadium`,
    ADD COLUMN `user_email` VARCHAR(191) NULL,
    ADD COLUMN `user_like_staId` INTEGER NULL,
    MODIFY `user_pwd` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `ParkingLot`;

-- DropTable
DROP TABLE `StartPitcherList`;

-- AddForeignKey
ALTER TABLE `Recommendation` ADD CONSTRAINT `Recommendation_reco_stadiumId_fkey` FOREIGN KEY (`reco_stadiumId`) REFERENCES `Stadium`(`sta_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cafeteria` ADD CONSTRAINT `Cafeteria_cafe_stadiumId_fkey` FOREIGN KEY (`cafe_stadiumId`) REFERENCES `Stadium`(`sta_id`) ON DELETE SET NULL ON UPDATE CASCADE;
