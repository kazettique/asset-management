/*
  Warnings:

  - You are about to drop the column `endCurrencyId` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `startCurrencyId` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the `Currency` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Asset` DROP FOREIGN KEY `Asset_endCurrencyId_fkey`;

-- DropForeignKey
ALTER TABLE `Asset` DROP FOREIGN KEY `Asset_startCurrencyId_fkey`;

-- AlterTable
ALTER TABLE `Asset` DROP COLUMN `endCurrencyId`,
    DROP COLUMN `startCurrencyId`,
    ADD COLUMN `endCurrency` VARCHAR(191) NULL,
    ADD COLUMN `endCurrencyExchangeRate` DOUBLE NOT NULL DEFAULT 1,
    ADD COLUMN `startCurrency` VARCHAR(191) NULL,
    ADD COLUMN `startCurrencyExchangeRate` DOUBLE NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE `Currency`;
