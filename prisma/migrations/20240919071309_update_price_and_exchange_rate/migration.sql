/*
  Warnings:

  - You are about to drop the column `endCurrency` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `endCurrencyExchangeRate` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `startCurrency` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `startCurrencyExchangeRate` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `OwnershipHistory` table. All the data in the column will be lost.
  - You are about to drop the column `comment` on the `PriceHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Asset` DROP COLUMN `endCurrency`,
    DROP COLUMN `endCurrencyExchangeRate`,
    DROP COLUMN `startCurrency`,
    DROP COLUMN `startCurrencyExchangeRate`,
    ADD COLUMN `endExchangeRateId` VARCHAR(191) NULL,
    ADD COLUMN `startExchangeRateId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `OwnershipHistory` DROP COLUMN `endDate`;

-- AlterTable
ALTER TABLE `PriceHistory` DROP COLUMN `comment`;

-- CreateTable
CREATE TABLE `ExchangeRate` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `targetCurrency` VARCHAR(191) NOT NULL,
    `rate` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_startExchangeRateId_fkey` FOREIGN KEY (`startExchangeRateId`) REFERENCES `ExchangeRate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_endExchangeRateId_fkey` FOREIGN KEY (`endExchangeRateId`) REFERENCES `ExchangeRate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
