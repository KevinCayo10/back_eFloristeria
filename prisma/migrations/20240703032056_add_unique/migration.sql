/*
  Warnings:

  - A unique constraint covering the columns `[ced_usu]` on the table `Usuarios` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email_usu]` on the table `Usuarios` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Usuarios_ced_usu_key` ON `Usuarios`(`ced_usu`);

-- CreateIndex
CREATE UNIQUE INDEX `Usuarios_email_usu_key` ON `Usuarios`(`email_usu`);
