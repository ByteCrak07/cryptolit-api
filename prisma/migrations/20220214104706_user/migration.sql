-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "walletKey" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "fullName" TEXT,
    "imgUrl" TEXT,
    "following" INTEGER NOT NULL DEFAULT 0,
    "followers" INTEGER NOT NULL DEFAULT 0,
    "donationUrl" TEXT,
    "bio" TEXT,
    "instaId" TEXT,
    "instaLink" TEXT,
    "instaVerified" BOOLEAN NOT NULL DEFAULT false,
    "twitterId" TEXT,
    "twitterLink" TEXT,
    "twitterVerified" BOOLEAN NOT NULL DEFAULT false,
    "facebookId" TEXT,
    "facebookLink" TEXT,
    "facebookVerified" BOOLEAN NOT NULL DEFAULT false,
    "isWriter" BOOLEAN NOT NULL,
    "isCollector" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("walletKey")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_walletKey_key" ON "User"("walletKey");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
