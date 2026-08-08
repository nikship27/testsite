-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN "size" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "fabric" TEXT,
    "careInstructions" TEXT,
    "sizes" TEXT NOT NULL DEFAULT 'S,M,L,XL,XXL',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Product" ("category", "createdAt", "description", "id", "image", "price", "stock", "title", "updatedAt") SELECT "category", "createdAt", "description", "id", "image", "price", "stock", "title", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
