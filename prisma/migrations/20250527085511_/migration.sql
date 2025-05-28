/*
  Warnings:

  - Added the required column `reco_player` to the `Recommendation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Recommendation` ADD COLUMN `reco_player` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `StartPitcherList` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pit_player_name` VARCHAR(191) NOT NULL,
    `pit_player_iamge` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
