-- CreateTable
CREATE TABLE "Visitors" (
    "id" SERIAL NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL,
    "count" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Visitors_pkey" PRIMARY KEY ("id")
);
