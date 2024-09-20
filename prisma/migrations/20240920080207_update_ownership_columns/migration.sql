/*
  Warnings:

  - Added the required column `ownerId` to the `OwnershipHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `OwnershipHistory` DROP FOREIGN KEY `OwnershipHistory_id_fkey`;

-- AlterTable
ALTER TABLE `OwnershipHistory` ADD COLUMN `ownerId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `OwnershipHistory` ADD CONSTRAINT `OwnershipHistory_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `Owner`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
