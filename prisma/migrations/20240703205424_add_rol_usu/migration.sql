/*
  Warnings:

  - Added the required column `rol_usu` to the `Usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `rol_usu` VARCHAR(20) NOT NULL;
