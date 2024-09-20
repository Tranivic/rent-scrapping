-- CreateTable
CREATE TABLE "task_queue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slug" TEXT NOT NULL,
    "pick_date" DATETIME NOT NULL,
    "pick_location" TEXT NOT NULL,
    "pick_hour" TEXT NOT NULL,
    "days_with_car" INTEGER NOT NULL,
    "car_group" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "task_queue_slug_key" ON "task_queue"("slug");
