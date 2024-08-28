-- DropForeignKey
ALTER TABLE `Asset` DROP FOREIGN KEY `Asset_endPlaceId_fkey`;

-- AlterTable
ALTER TABLE `Asset` MODIFY `endPlaceId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_endPlaceId_fkey` FOREIGN KEY (`endPlaceId`) REFERENCES `Place`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
