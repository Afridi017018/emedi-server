-- CreateTable
CREATE TABLE `PanelUser` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'SUPPORT', 'MANAGER', 'ACCOUNTANT') NOT NULL DEFAULT 'ADMIN',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PanelUser_email_key`(`email`),
    UNIQUE INDEX `PanelUser_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SiteUser` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `dateOfBirth` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SiteUser_email_key`(`email`),
    UNIQUE INDEX `SiteUser_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` VARCHAR(191) NOT NULL,
    `label` ENUM('HOME', 'WORK', 'OTHER') NOT NULL DEFAULT 'HOME',
    `address` VARCHAR(191) NOT NULL,
    `isDefault` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Address_label_key`(`label`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Generic` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `genericType` ENUM('ALLOPATHIC', 'HERBAL') NOT NULL DEFAULT 'ALLOPATHIC',
    `indications` VARCHAR(255) NULL,
    `pharmacology` VARCHAR(255) NULL,
    `dosageAdministration` VARCHAR(255) NULL,
    `interaction` VARCHAR(255) NULL,
    `sideeffects` VARCHAR(255) NULL,
    `pregnancyLactation` VARCHAR(255) NULL,
    `precautions` VARCHAR(255) NULL,
    `overdose` VARCHAR(255) NULL,
    `storageConditions` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Company` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `parentId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `type` ENUM('MEDICINE', 'NONMEDICINE') NOT NULL DEFAULT 'MEDICINE',
    `unitType` VARCHAR(191) NOT NULL,
    `mrp` DOUBLE NOT NULL,
    `b2bDiscount` DOUBLE NOT NULL,
    `b2bSellingPrice` DOUBLE NOT NULL,
    `b2cDiscount` DOUBLE NOT NULL,
    `b2cSellingPrice` DOUBLE NOT NULL,
    `isPrescriptionMandatory` BOOLEAN NOT NULL DEFAULT false,
    `disclaimer` VARCHAR(191) NOT NULL,
    `qtyInStock` INTEGER NOT NULL,
    `viewCount` INTEGER NOT NULL DEFAULT 0,
    `categoryId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medicine` (
    `id` VARCHAR(191) NOT NULL,
    `dosageForm` VARCHAR(191) NOT NULL,
    `dosageStrength` VARCHAR(191) NOT NULL,
    `indications` VARCHAR(255) NULL,
    `pharmacology` VARCHAR(255) NULL,
    `dosageAdministration` VARCHAR(255) NULL,
    `interaction` VARCHAR(255) NULL,
    `sideeffects` VARCHAR(255) NULL,
    `pregnancyLactation` VARCHAR(255) NULL,
    `precautions` VARCHAR(255) NULL,
    `overdose` VARCHAR(255) NULL,
    `storageConditions` VARCHAR(255) NULL,
    `genericId` VARCHAR(191) NOT NULL,
    `compantId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Medicine_compantId_key`(`compantId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NonMedicine` (
    `id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `SiteUser`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medicine` ADD CONSTRAINT `Medicine_genericId_fkey` FOREIGN KEY (`genericId`) REFERENCES `Generic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medicine` ADD CONSTRAINT `Medicine_compantId_fkey` FOREIGN KEY (`compantId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medicine` ADD CONSTRAINT `Medicine_id_fkey` FOREIGN KEY (`id`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NonMedicine` ADD CONSTRAINT `NonMedicine_id_fkey` FOREIGN KEY (`id`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
