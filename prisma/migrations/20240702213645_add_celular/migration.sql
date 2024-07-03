/*
  Warnings:

  - Added the required column `celu_usu` to the `Usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `celu_usu` VARCHAR(15) NOT NULL;
