-- CreateTable
CREATE TABLE `usuarios` (
    `id_usu` INTEGER NOT NULL AUTO_INCREMENT,
    `ced_usu` VARCHAR(13) NOT NULL,
    `nom_usu` VARCHAR(20) NOT NULL,
    `ape_usu` VARCHAR(20) NOT NULL,
    `email_usu` VARCHAR(50) NOT NULL,
    `pass_usu` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_usu`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productos` (
    `id_prod` INTEGER NOT NULL AUTO_INCREMENT,
    `desc_pro` VARCHAR(300) NOT NULL,
    `prec_pro` DECIMAL(10, 2) NOT NULL,
    `img_pro` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_prod`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categorias` (
    `id_cate` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `nom_cate` VARCHAR(50) NOT NULL,
    `img_cate` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_cate`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `facturas` (
    `num_fac` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usu` INTEGER NOT NULL,
    `est_fac` TINYINT NOT NULL,
    `total_fac` DECIMAL(10, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`num_fac`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detalle_factura` (
    `id_det` INTEGER NOT NULL AUTO_INCREMENT,
    `num_fac` INTEGER NOT NULL,
    `id_prod` INTEGER NOT NULL,
    `cant_det` INTEGER NOT NULL,
    `prec_det` DECIMAL(10, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_det`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
