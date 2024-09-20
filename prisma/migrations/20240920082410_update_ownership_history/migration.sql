/*
  Warnings:

  - Added the required column `assetId` to the `OwnershipHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OwnershipHistory` ADD COLUMN `assetId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `OwnershipHistory` ADD CONSTRAINT `OwnershipHistory_assetId_fkey` FOREIGN KEY (`assetId`) REFERENCES `Asset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
