/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Currency` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Method` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Owner` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Place` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Platform` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Brand` MODIFY `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Category` MODIFY `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Currency` MODIFY `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Method` MODIFY `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Owner` MODIFY `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Place` MODIFY `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Platform` MODIFY `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Tag` MODIFY `name` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Brand_name_key` ON `Brand`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Category_name_key` ON `Category`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Currency_name_key` ON `Currency`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Method_name_key` ON `Method`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Owner_name_key` ON `Owner`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Place_name_key` ON `Place`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Platform_name_key` ON `Platform`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Tag_name_key` ON `Tag`(`name`);
