-- CreateTable
CREATE TABLE "workers_queue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date_out" TEXT NOT NULL,
    "hour_out" TEXT NOT NULL,
    "date_dev" TEXT NOT NULL,
    "hour_dev" TEXT NOT NULL,
    "location_out" TEXT,
    "location_dev" TEXT,
    "interval_ms" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "results_table" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "worker_ID" TEXT NOT NULL,
    "prices_json" TEXT NOT NULL
);
