/*
  Warnings:

  - The primary key for the `productos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_prod` on the `productos` table. All the data in the column will be lost.
  - Added the required column `id_pro` to the `productos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `productos` DROP PRIMARY KEY,
    DROP COLUMN `id_prod`,
    ADD COLUMN `id_pro` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_pro`);
