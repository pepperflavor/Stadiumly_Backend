/*
  Warnings:

  - You are about to drop the column `cafe_cate` on the `Cafeteria` table. All the data in the column will be lost.
  - You are about to drop the column `reco_cate` on the `Recommendation` table. All the data in the column will be lost.
  - You are about to drop the column `reco_lati` on the `Recommendation` table. All the data in the column will be lost.
  - You are about to drop the column `reco_long` on the `Recommendation` table. All the data in the column will be lost.
  - You are about to drop the `_CafeteriaToStadium` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ParkingLotToStadium` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RecommendationToStadium` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_StadiumToUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sta_name]` on the table `Stadium` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sta_team]` on the table `Stadium` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cafe_image` to the `Cafeteria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stadiumId` to the `Cafeteria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stadiumId` to the `ParkingLot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reco_image` to the `Recommendation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stadiumId` to the `Recommendation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sta_team` to the `Stadium` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_CafeteriaToStadium` DROP FOREIGN KEY `_CafeteriaToStadium_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CafeteriaToStadium` DROP FOREIGN KEY `_CafeteriaToStadium_B_fkey`;

-- DropForeignKey
ALTER TABLE `_ParkingLotToStadium` DROP FOREIGN KEY `_ParkingLotToStadium_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ParkingLotToStadium` DROP FOREIGN KEY `_ParkingLotToStadium_B_fkey`;

-- DropForeignKey
ALTER TABLE `_RecommendationToStadium` DROP FOREIGN KEY `_RecommendationToStadium_A_fkey`;

-- DropForeignKey
ALTER TABLE `_RecommendationToStadium` DROP FOREIGN KEY `_RecommendationToStadium_B_fkey`;

-- DropForeignKey
ALTER TABLE `_StadiumToUser` DROP FOREIGN KEY `_StadiumToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_StadiumToUser` DROP FOREIGN KEY `_StadiumToUser_B_fkey`;

-- AlterTable
ALTER TABLE `Cafeteria` DROP COLUMN `cafe_cate`,
    ADD COLUMN `cafe_image` VARCHAR(191) NOT NULL,
    ADD COLUMN `stadiumId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ParkingLot` ADD COLUMN `stadiumId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Recommendation` DROP COLUMN `reco_cate`,
    DROP COLUMN `reco_lati`,
    DROP COLUMN `reco_long`,
    ADD COLUMN `reco_image` VARCHAR(191) NOT NULL,
    ADD COLUMN `stadiumId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Stadium` ADD COLUMN `sta_team` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `user_kakao` INTEGER NOT NULL DEFAULT 0,
    MODIFY `user_pwd` VARCHAR(191) NULL DEFAULT '';

-- DropTable
DROP TABLE `_CafeteriaToStadium`;

-- DropTable
DROP TABLE `_ParkingLotToStadium`;

-- DropTable
DROP TABLE `_RecommendationToStadium`;

-- DropTable
DROP TABLE `_StadiumToUser`;

-- CreateIndex
CREATE UNIQUE INDEX `Stadium_sta_name_key` ON `Stadium`(`sta_name`);

-- CreateIndex
CREATE UNIQUE INDEX `Stadium_sta_team_key` ON `Stadium`(`sta_team`);

-- AddForeignKey
ALTER TABLE `Recommendation` ADD CONSTRAINT `Recommendation_stadiumId_fkey` FOREIGN KEY (`stadiumId`) REFERENCES `Stadium`(`sta_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cafeteria` ADD CONSTRAINT `Cafeteria_stadiumId_fkey` FOREIGN KEY (`stadiumId`) REFERENCES `Stadium`(`sta_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ParkingLot` ADD CONSTRAINT `ParkingLot_stadiumId_fkey` FOREIGN KEY (`stadiumId`) REFERENCES `Stadium`(`sta_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
