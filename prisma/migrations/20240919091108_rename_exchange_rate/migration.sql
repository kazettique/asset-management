/*
  Warnings:

  - You are about to drop the column `endExchangeRateId` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `startExchangeRateId` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the `ExchangeRate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Asset` DROP FOREIGN KEY `Asset_endExchangeRateId_fkey`;

-- DropForeignKey
ALTER TABLE `Asset` DROP FOREIGN KEY `Asset_startExchangeRateId_fkey`;

-- AlterTable
ALTER TABLE `Asset` DROP COLUMN `endExchangeRateId`,
    DROP COLUMN `startExchangeRateId`,
    ADD COLUMN `endForexId` VARCHAR(191) NULL,
    ADD COLUMN `startForexId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `ExchangeRate`;

-- CreateTable
CREATE TABLE `Forex` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `targetCurrency` VARCHAR(191) NOT NULL,
    `rate` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_startForexId_fkey` FOREIGN KEY (`startForexId`) REFERENCES `Forex`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_endForexId_fkey` FOREIGN KEY (`endForexId`) REFERENCES `Forex`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
