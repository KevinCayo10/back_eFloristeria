-- AlterTable
ALTER TABLE `usuarios` MODIFY `ced_usu` VARCHAR(13) NULL,
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NULL;