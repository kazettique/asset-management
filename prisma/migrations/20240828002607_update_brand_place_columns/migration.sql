/*
  Warnings:

  - Added the required column `brandId` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endPlaceId` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startPlaceId` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Asset` DROP FOREIGN KEY `Asset_id_fkey`;

-- AlterTable
ALTER TABLE `Asset` ADD COLUMN `brandId` VARCHAR(191) NOT NULL,
    ADD COLUMN `endPlaceId` VARCHAR(191) NOT NULL,
    ADD COLUMN `startPlaceId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_startPlaceId_fkey` FOREIGN KEY (`startPlaceId`) REFERENCES `Place`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_endPlaceId_fkey` FOREIGN KEY (`endPlaceId`) REFERENCES `Place`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
