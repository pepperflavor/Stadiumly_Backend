/*
  Warnings:

  - You are about to drop the column `pit_away_second_image` on the `StartPitcher` table. All the data in the column will be lost.
  - You are about to drop the column `pit_home_second_image` on the `StartPitcher` table. All the data in the column will be lost.
  - Added the required column `reco_add` to the `Recommendation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reco_menu` to the `Recommendation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reco_tp` to the `Recommendation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_stadium` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `user_pwd` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Recommendation` ADD COLUMN `reco_add` VARCHAR(191) NOT NULL,
    ADD COLUMN `reco_menu` VARCHAR(191) NOT NULL,
    ADD COLUMN `reco_tp` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `StartPitcher` DROP COLUMN `pit_away_second_image`,
    DROP COLUMN `pit_home_second_image`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `user_stadium` INTEGER NOT NULL,
    MODIFY `user_pwd` VARCHAR(191) NOT NULL,
    MODIFY `user_grade` INTEGER NOT NULL DEFAULT 0;
