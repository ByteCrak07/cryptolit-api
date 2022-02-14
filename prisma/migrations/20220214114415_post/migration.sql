-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "featureImage" TEXT NOT NULL,
    "featureImageAlt" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "genre" TEXT[],
    "content" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL,
    "archived" BOOLEAN NOT NULL,
    "authorWalletKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedOn" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_id_key" ON "Post"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorWalletKey_fkey" FOREIGN KEY ("authorWalletKey") REFERENCES "User"("walletKey") ON DELETE RESTRICT ON UPDATE CASCADE;
