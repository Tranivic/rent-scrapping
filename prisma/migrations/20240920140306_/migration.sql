-- CreateTable
CREATE TABLE "workers_queue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scrap_role" TEXT NOT NULL,
    "pick_date" DATETIME NOT NULL,
    "pick_location" TEXT NOT NULL,
    "pick_hour" TEXT NOT NULL,
    "drop_date" DATETIME NOT NULL,
    "drop_hour" TEXT NOT NULL,
    "car_group" TEXT
);
