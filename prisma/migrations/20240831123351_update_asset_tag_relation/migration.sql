/*
  Warnings:

  - You are about to drop the column `assetId` on the `Tag` table. All the data in the column will be lost.
  - Added the required column `name` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Tag` DROP FOREIGN KEY `Tag_assetId_fkey`;

-- AlterTable
ALTER TABLE `Tag` DROP COLUMN `assetId`,
    ADD COLUMN `name` TINYTEXT NOT NULL;

-- CreateTable
CREATE TABLE `_AssetToTag` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_AssetToTag_AB_unique`(`A`, `B`),
    INDEX `_AssetToTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AssetToTag` ADD CONSTRAINT `_AssetToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Asset`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AssetToTag` ADD CONSTRAINT `_AssetToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
