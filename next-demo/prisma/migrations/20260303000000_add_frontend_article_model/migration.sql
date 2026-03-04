-- CreateEnum
CREATE TYPE "FrontendFramework" AS ENUM ('react', 'vue', 'nextjs');

-- CreateEnum
CREATE TYPE "ArticleDifficulty" AS ENUM ('Beginner', 'Intermediate', 'Advanced');

-- CreateTable
CREATE TABLE "FrontendArticle" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'frontend',
    "framework" "FrontendFramework" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "readTimeMinutes" INTEGER NOT NULL DEFAULT 8,
    "difficulty" "ArticleDifficulty" NOT NULL DEFAULT 'Beginner',
    "tags" TEXT[],
    "sections" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FrontendArticle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FrontendArticle_framework_publishedAt_idx" ON "FrontendArticle"("framework", "publishedAt" DESC);

-- CreateIndex
CREATE INDEX "FrontendArticle_category_publishedAt_idx" ON "FrontendArticle"("category", "publishedAt" DESC);

