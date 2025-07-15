-- CreateTable
CREATE TABLE "linkClick" (
    "id" TEXT NOT NULL,
    "linkId" TEXT NOT NULL,
    "userId" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "referrer" TEXT,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "linkClick_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "linkClick_linkId_idx" ON "linkClick"("linkId");

-- CreateIndex
CREATE INDEX "linkClick_userId_idx" ON "linkClick"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "linkClick_linkId_userId_key" ON "linkClick"("linkId", "userId");

-- AddForeignKey
ALTER TABLE "linkClick" ADD CONSTRAINT "linkClick_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "linkClick" ADD CONSTRAINT "linkClick_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
