/*
  Warnings:

  - You are about to drop the column `endPlaceId` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `startPlaceId` on the `Asset` table. All the data in the column will be lost.
  - Added the required column `startPlatformId` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Asset` DROP FOREIGN KEY `Asset_brandId_fkey`;

-- DropForeignKey
ALTER TABLE `Asset` DROP FOREIGN KEY `Asset_endPlaceId_fkey`;

-- DropForeignKey
ALTER TABLE `Asset` DROP FOREIGN KEY `Asset_startPlaceId_fkey`;

-- AlterTable
ALTER TABLE `Asset` DROP COLUMN `endPlaceId`,
    DROP COLUMN `startPlaceId`,
    ADD COLUMN `endPlatformId` VARCHAR(191) NULL,
    ADD COLUMN `placeId` VARCHAR(191) NULL,
    ADD COLUMN `startPlatformId` VARCHAR(191) NOT NULL,
    MODIFY `name` TINYTEXT NOT NULL,
    MODIFY `comment` TINYTEXT NULL,
    MODIFY `brandId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Brand` MODIFY `name` TINYTEXT NOT NULL,
    MODIFY `comment` TINYTEXT NULL;

-- AlterTable
ALTER TABLE `Category` MODIFY `name` TINYTEXT NOT NULL,
    MODIFY `comment` TINYTEXT NULL;

-- AlterTable
ALTER TABLE `Currency` MODIFY `comment` TINYTEXT NULL;

-- AlterTable
ALTER TABLE `Method` MODIFY `name` TINYTEXT NOT NULL,
    MODIFY `type` ENUM('BOTH', 'START', 'END') NOT NULL,
    MODIFY `comment` TINYTEXT NULL;

-- AlterTable
ALTER TABLE `Owner` MODIFY `name` TINYTEXT NOT NULL,
    MODIFY `comment` TINYTEXT NULL;

-- AlterTable
ALTER TABLE `OwnershipHistory` MODIFY `comment` TINYTEXT NULL;

-- AlterTable
ALTER TABLE `Place` MODIFY `name` TINYTEXT NOT NULL,
    MODIFY `comment` TINYTEXT NULL;

-- CreateTable
CREATE TABLE `Platform` (
    `id` VARCHAR(191) NOT NULL,
    `name` TINYTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `comment` TINYTEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` VARCHAR(191) NOT NULL,
    `assetId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `comment` TINYTEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PriceHistory` (
    `id` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `comment` TINYTEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_placeId_fkey` FOREIGN KEY (`placeId`) REFERENCES `Place`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_startPlatformId_fkey` FOREIGN KEY (`startPlatformId`) REFERENCES `Platform`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_endPlatformId_fkey` FOREIGN KEY (`endPlatformId`) REFERENCES `Platform`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tag` ADD CONSTRAINT `Tag_assetId_fkey` FOREIGN KEY (`assetId`) REFERENCES `Asset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PriceHistory` ADD CONSTRAINT `PriceHistory_id_fkey` FOREIGN KEY (`id`) REFERENCES `Asset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
