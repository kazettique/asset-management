/*
  Warnings:

  - Made the column `brandId` on table `Asset` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ownerId` on table `Asset` required. This step will fail if there are existing NULL values in that column.
  - Made the column `categoryId` on table `Asset` required. This step will fail if there are existing NULL values in that column.
  - Made the column `placeId` on table `Asset` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Asset` DROP FOREIGN KEY `Asset_brandId_fkey`;

-- DropForeignKey
ALTER TABLE `Asset` DROP FOREIGN KEY `Asset_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Asset` DROP FOREIGN KEY `Asset_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `Asset` DROP FOREIGN KEY `Asset_placeId_fkey`;

-- AlterTable
ALTER TABLE `Asset` MODIFY `brandId` VARCHAR(191) NOT NULL,
    MODIFY `ownerId` VARCHAR(191) NOT NULL,
    MODIFY `categoryId` VARCHAR(191) NOT NULL,
    MODIFY `placeId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `Owner`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_placeId_fkey` FOREIGN KEY (`placeId`) REFERENCES `Place`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
