/*
  Warnings:

  - You are about to alter the column `startPrice` on the `Asset` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `endPrice` on the `Asset` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.

*/
-- AlterTable
ALTER TABLE `Asset` MODIFY `startPrice` DOUBLE NOT NULL,
    MODIFY `endPrice` DOUBLE NULL;
