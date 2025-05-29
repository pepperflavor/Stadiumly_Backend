/*
  Warnings:

  - You are about to drop the column `date` on the `StartPitcher` table. All the data in the column will be lost.
  - You are about to drop the column `pit_name` on the `StartPitcher` table. All the data in the column will be lost.
  - You are about to drop the column `pit_team` on the `StartPitcher` table. All the data in the column will be lost.
  - You are about to drop the column `pit_vs_name` on the `StartPitcher` table. All the data in the column will be lost.
  - You are about to drop the column `pit_vs_team` on the `StartPitcher` table. All the data in the column will be lost.
  - Added the required column `pit_away_image` to the `StartPitcher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pit_away_name` to the `StartPitcher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pit_away_second_image` to the `StartPitcher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pit_away_team` to the `StartPitcher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pit_broad_image` to the `StartPitcher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pit_game_id` to the `StartPitcher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pit_home_image` to the `StartPitcher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pit_home_second_image` to the `StartPitcher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pit_home_team` to the `StartPitcher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `StartPitcher` DROP COLUMN `date`,
    DROP COLUMN `pit_name`,
    DROP COLUMN `pit_team`,
    DROP COLUMN `pit_vs_name`,
    DROP COLUMN `pit_vs_team`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `pit_away_image` VARCHAR(191) NOT NULL,
    ADD COLUMN `pit_away_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `pit_away_second_image` VARCHAR(191) NOT NULL,
    ADD COLUMN `pit_away_team` VARCHAR(191) NOT NULL,
    ADD COLUMN `pit_broad_image` VARCHAR(191) NOT NULL,
    ADD COLUMN `pit_game_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `pit_home_image` VARCHAR(191) NOT NULL,
    ADD COLUMN `pit_home_second_image` VARCHAR(191) NOT NULL,
    ADD COLUMN `pit_home_team` VARCHAR(191) NOT NULL;
