/*
  Warnings:

  - Added the required column `sta_image` to the `Stadium` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pit_game_time` to the `StartPitcher` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Stadium_sta_name_key` ON `Stadium`;

-- DropIndex
DROP INDEX `Stadium_sta_team_key` ON `Stadium`;

-- AlterTable
ALTER TABLE `Stadium` ADD COLUMN `sta_image` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `StartPitcher` ADD COLUMN `pit_game_time` VARCHAR(191) NOT NULL;
