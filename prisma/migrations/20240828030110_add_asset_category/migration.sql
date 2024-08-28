/*
  Warnings:

  - Added the required column `categoryId` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Asset` ADD COLUMN `categoryId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
