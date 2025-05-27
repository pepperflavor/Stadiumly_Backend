-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_pwd` VARCHAR(191) NOT NULL,
    `user_nick` VARCHAR(191) NOT NULL,
    `user_grade` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Favorit` (
    `fav_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `sta_id` INTEGER NOT NULL,

    PRIMARY KEY (`fav_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stadium` (
    `sta_id` INTEGER NOT NULL AUTO_INCREMENT,
    `sta_name` VARCHAR(191) NOT NULL,
    `sta_lati` DOUBLE NOT NULL,
    `sta_long` DOUBLE NOT NULL,

    PRIMARY KEY (`sta_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recommendation` (
    `reco_id` INTEGER NOT NULL AUTO_INCREMENT,
    `reco_lati` DOUBLE NOT NULL,
    `reco_long` DOUBLE NOT NULL,
    `reco_name` VARCHAR(191) NOT NULL,
    `reco_cate` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`reco_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cafeteria` (
    `cafe_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cafe_name` VARCHAR(191) NOT NULL,
    `cafe_cate` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cafe_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ParkingLot` (
    `park_id` INTEGER NOT NULL AUTO_INCREMENT,
    `park_name` VARCHAR(191) NOT NULL,
    `park_lati` DOUBLE NOT NULL,
    `park_long` DOUBLE NOT NULL,

    PRIMARY KEY (`park_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_StadiumToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_StadiumToUser_AB_unique`(`A`, `B`),
    INDEX `_StadiumToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_RecommendationToStadium` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RecommendationToStadium_AB_unique`(`A`, `B`),
    INDEX `_RecommendationToStadium_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CafeteriaToStadium` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CafeteriaToStadium_AB_unique`(`A`, `B`),
    INDEX `_CafeteriaToStadium_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ParkingLotToStadium` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ParkingLotToStadium_AB_unique`(`A`, `B`),
    INDEX `_ParkingLotToStadium_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Favorit` ADD CONSTRAINT `Favorit_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorit` ADD CONSTRAINT `Favorit_sta_id_fkey` FOREIGN KEY (`sta_id`) REFERENCES `Stadium`(`sta_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_StadiumToUser` ADD CONSTRAINT `_StadiumToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Stadium`(`sta_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_StadiumToUser` ADD CONSTRAINT `_StadiumToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RecommendationToStadium` ADD CONSTRAINT `_RecommendationToStadium_A_fkey` FOREIGN KEY (`A`) REFERENCES `Recommendation`(`reco_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RecommendationToStadium` ADD CONSTRAINT `_RecommendationToStadium_B_fkey` FOREIGN KEY (`B`) REFERENCES `Stadium`(`sta_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CafeteriaToStadium` ADD CONSTRAINT `_CafeteriaToStadium_A_fkey` FOREIGN KEY (`A`) REFERENCES `Cafeteria`(`cafe_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CafeteriaToStadium` ADD CONSTRAINT `_CafeteriaToStadium_B_fkey` FOREIGN KEY (`B`) REFERENCES `Stadium`(`sta_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ParkingLotToStadium` ADD CONSTRAINT `_ParkingLotToStadium_A_fkey` FOREIGN KEY (`A`) REFERENCES `ParkingLot`(`park_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ParkingLotToStadium` ADD CONSTRAINT `_ParkingLotToStadium_B_fkey` FOREIGN KEY (`B`) REFERENCES `Stadium`(`sta_id`) ON DELETE CASCADE ON UPDATE CASCADE;
