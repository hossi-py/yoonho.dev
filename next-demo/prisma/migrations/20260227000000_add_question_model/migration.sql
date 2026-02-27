-- CreateEnum
CREATE TYPE "QuestionFrequency" AS ENUM ('High', 'Medium', 'Low');

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "examCode" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "dateLabel" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "frequency" "QuestionFrequency" NOT NULL,
    "tags" TEXT[],
    "scenarioEnglish" TEXT NOT NULL,
    "scenarioKorean" TEXT NOT NULL,
    "requirements" JSONB NOT NULL,
    "choices" JSONB NOT NULL,
    "answerId" TEXT NOT NULL,
    "serviceMain" JSONB NOT NULL,
    "serviceOthers" JSONB NOT NULL,
    "insight" TEXT NOT NULL,
    "deepDiveTable" JSONB NOT NULL,
    "cheatSheet" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Question_category_publishedAt_idx" ON "Question"("category", "publishedAt" DESC);

-- CreateIndex
CREATE INDEX "Question_examCode_number_idx" ON "Question"("examCode", "number" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "Question_category_number_key" ON "Question"("category", "number");
