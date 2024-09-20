/*
  Warnings:

  - You are about to drop the column `days_with_car` on the `task_queue` table. All the data in the column will be lost.
  - Added the required column `drop_date` to the `task_queue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `drop_hour` to the `task_queue` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_task_queue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slug" TEXT NOT NULL,
    "pick_date" DATETIME NOT NULL,
    "pick_location" TEXT NOT NULL,
    "pick_hour" TEXT NOT NULL,
    "drop_date" DATETIME NOT NULL,
    "drop_hour" TEXT NOT NULL,
    "car_group" TEXT
);
INSERT INTO "new_task_queue" ("car_group", "date", "id", "pick_date", "pick_hour", "pick_location", "slug") SELECT "car_group", "date", "id", "pick_date", "pick_hour", "pick_location", "slug" FROM "task_queue";
DROP TABLE "task_queue";
ALTER TABLE "new_task_queue" RENAME TO "task_queue";
CREATE UNIQUE INDEX "task_queue_slug_key" ON "task_queue"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
