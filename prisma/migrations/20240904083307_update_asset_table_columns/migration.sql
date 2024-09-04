-- DropForeignKey
ALTER TABLE `Asset` DROP FOREIGN KEY `Asset_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Asset` DROP FOREIGN KEY `Asset_startCurrencyId_fkey`;

-- DropForeignKey
ALTER TABLE `Asset` DROP FOREIGN KEY `Asset_startMethodId_fkey`;

-- DropForeignKey
ALTER TABLE `Asset` DROP FOREIGN KEY `Asset_startPlatformId_fkey`;

-- AlterTable
ALTER TABLE `Asset` MODIFY `meta` JSON NULL,
    MODIFY `startDate` DATETIME(3) NULL,
    MODIFY `startPrice` DOUBLE NULL,
    MODIFY `startCurrencyId` VARCHAR(191) NULL,
    MODIFY `startMethodId` VARCHAR(191) NULL,
    MODIFY `comment` VARCHAR(1000) NULL,
    MODIFY `categoryId` VARCHAR(191) NULL,
    MODIFY `startPlatformId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_startCurrencyId_fkey` FOREIGN KEY (`startCurrencyId`) REFERENCES `Currency`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_startMethodId_fkey` FOREIGN KEY (`startMethodId`) REFERENCES `Method`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_startPlatformId_fkey` FOREIGN KEY (`startPlatformId`) REFERENCES `Platform`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
