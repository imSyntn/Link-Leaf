-- AlterTable
ALTER TABLE "User" ALTER COLUMN "otp" DROP NOT NULL,
ALTER COLUMN "otp" DROP DEFAULT,
ALTER COLUMN "otp" SET DATA TYPE TEXT;
