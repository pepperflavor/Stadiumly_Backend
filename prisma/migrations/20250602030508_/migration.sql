/*
  Warnings:

  - You are about to alter the column `user_nick` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(20)`.
  - Made the column `user_like_staId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `user_status` INTEGER NOT NULL DEFAULT 0,
    MODIFY `user_nick` CHAR(20) NOT NULL,
    MODIFY `user_like_staId` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `AnonyUser` (
    `ano_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ano_uuid` VARCHAR(191) NOT NULL,
    `userID` INTEGER NOT NULL,

    UNIQUE INDEX `AnonyUser_ano_uuid_key`(`ano_uuid`),
    UNIQUE INDEX `AnonyUser_userID_key`(`userID`),
    PRIMARY KEY (`ano_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AppleUSer` (
    `app_user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` INTEGER NOT NULL,

    UNIQUE INDEX `AppleUSer_userID_key`(`userID`),
    PRIMARY KEY (`app_user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_user_like_staId_fkey` FOREIGN KEY (`user_like_staId`) REFERENCES `Stadium`(`sta_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnonyUser` ADD CONSTRAINT `AnonyUser_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AppleUSer` ADD CONSTRAINT `AppleUSer_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
