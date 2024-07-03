/*
  Warnings:

  - Added the required column `id_cate_pro` to the `Productos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `productos` ADD COLUMN `id_cate_pro` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Productos` ADD CONSTRAINT `Productos_id_cate_pro_fkey` FOREIGN KEY (`id_cate_pro`) REFERENCES `Categorias`(`id_cate`) ON DELETE RESTRICT ON UPDATE CASCADE;
