import type { BlogPost } from '@/lib/blog-posts';
import getPrismaClient from '@/lib/prisma';
import type {
  QuestionCheatSheet,
  QuestionChoice,
  QuestionContent,
  QuestionDeepDiveRow,
  QuestionRequirement,
  QuestionServiceMain,
  QuestionServiceOther,
} from '@/lib/question-types';

function parseArray<T>(value: unknown): T[] {
  if (!Array.isArray(value)) return [];
  return value as T[];
}

function parseObject<T>(value: unknown, fallback: T): T {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return fallback;
  return value as T;
}

type DbQuestionRow = {
  id: string;
  category: string;
  examCode: string;
  number: number;
  title: string;
  description: string;
  tagId: string;
  dateLabel: string;
  publishedAt: Date;
  frequency: string;
  tags: string[];
  scenarioEnglish: string;
  scenarioKorean: string;
  requirements: unknown;
  choices: unknown;
  answerId: string;
  serviceMain: unknown;
  serviceOthers: unknown;
  insight: string;
  deepDiveTable: unknown;
  cheatSheet: unknown;
};

function mapFrequency(f: string): 'High' | 'Medium' | 'Low' {
  if (f === 'High' || f === 'Medium' || f === 'Low') return f;
  return 'Medium';
}

function toQuestionContent(q: DbQuestionRow): QuestionContent {
  return {
    id: q.id,
    category: q.category,
    examCode: q.examCode,
    number: q.number,
    title: q.title,
    description: q.description,
    tagId: q.tagId,
    dateLabel: q.dateLabel,
    publishedAt: q.publishedAt,
    frequency: mapFrequency(q.frequency),
    tags: q.tags,
    scenarioEnglish: q.scenarioEnglish,
    scenarioKorean: q.scenarioKorean,
    requirements: parseArray<QuestionRequirement>(q.requirements),
    choices: parseArray<QuestionChoice>(q.choices),
    answerId: q.answerId,
    serviceMain: parseObject<QuestionServiceMain>(q.serviceMain, {
      icon: '?뱲',
      title: 'Solution',
      desc: [],
    }),
    serviceOthers: parseArray<QuestionServiceOther>(q.serviceOthers),
    insight: q.insight,
    deepDiveTable: parseArray<QuestionDeepDiveRow>(q.deepDiveTable),
    cheatSheet: parseObject<QuestionCheatSheet>(q.cheatSheet, {
      positive: [],
      negative: [],
    }),
  };
}

function canUseDb() {
  return Boolean(process.env.DATABASE_URL);
}

function hasQuestionDelegate(prisma: any): boolean {
  return Boolean(
    prisma &&
      prisma.question &&
      typeof prisma.question.findMany === 'function' &&
      typeof prisma.question.findUnique === 'function'
  );
}

async function fallbackFindById(id: string): Promise<DbQuestionRow | null> {
  const prisma = getPrismaClient() as any;
  const rows = (await prisma.$queryRawUnsafe(
    'SELECT * FROM "Question" WHERE "id" = $1 LIMIT 1',
    id
  )) as DbQuestionRow[];
  return rows[0] ?? null;
}

async function fallbackFindByCategory(category: string): Promise<DbQuestionRow[]> {
  const prisma = getPrismaClient() as any;
  return (await prisma.$queryRawUnsafe(
    'SELECT * FROM "Question" WHERE "category" = $1 ORDER BY "publishedAt" DESC, "number" DESC',
    category
  )) as DbQuestionRow[];
}

async function fallbackFindAll(): Promise<DbQuestionRow[]> {
  const prisma = getPrismaClient() as any;
  return (await prisma.$queryRawUnsafe(
    'SELECT * FROM "Question" ORDER BY "publishedAt" DESC, "number" DESC'
  )) as DbQuestionRow[];
}

export async function getQuestionById(id: string): Promise<QuestionContent | null> {
  if (!canUseDb()) return null;

  try {
    const prisma = getPrismaClient() as any;
    if (!hasQuestionDelegate(prisma)) {
      const q = await fallbackFindById(id);
      if (!q) return null;
      return toQuestionContent(q);
    }

    const q = (await prisma.question.findUnique({ where: { id } })) as DbQuestionRow | null;
    if (!q) return null;
    return toQuestionContent(q);
  } catch (error) {
    try {
      const q = await fallbackFindById(id);
      if (!q) return null;
      return toQuestionContent(q);
    } catch (fallbackError) {
      console.error('[questions-repository] getQuestionById failed', error, fallbackError);
      return null;
    }
  }
}

export async function getQuestionPostsByCategory(category: string): Promise<BlogPost[]> {
  if (!canUseDb()) return [];

  try {
    const prisma = getPrismaClient() as any;
    const rows = hasQuestionDelegate(prisma)
      ? ((await prisma.question.findMany({
          where: { category },
          orderBy: [{ publishedAt: 'desc' }, { number: 'desc' }],
        })) as DbQuestionRow[])
      : await fallbackFindByCategory(category);

    return rows.map((q) => ({
      id: q.id,
      category: q.category as BlogPost['category'],
      number: q.number,
      title: q.title,
      description: q.description,
      tags: q.tags,
      date: q.publishedAt.toISOString().slice(0, 10),
      frequency: mapFrequency(q.frequency),
    }));
  } catch (error) {
    try {
      const rows = await fallbackFindByCategory(category);
      return rows.map((q) => ({
        id: q.id,
        category: q.category as BlogPost['category'],
        number: q.number,
        title: q.title,
        description: q.description,
        tags: q.tags,
        date: q.publishedAt.toISOString().slice(0, 10),
        frequency: mapFrequency(q.frequency),
      }));
    } catch (fallbackError) {
      console.error('[questions-repository] getQuestionPostsByCategory failed', error, fallbackError);
      return [];
    }
  }
}

export async function getQuestionPostMetaById(id: string): Promise<BlogPost | null> {
  if (!canUseDb()) return null;

  try {
    const prisma = getPrismaClient() as any;
    const q = hasQuestionDelegate(prisma)
      ? ((await prisma.question.findUnique({
          where: { id },
        })) as DbQuestionRow | null)
      : await fallbackFindById(id);
    if (!q) return null;

    return {
      id: q.id,
      category: q.category as BlogPost['category'],
      number: q.number,
      title: q.title,
      description: q.description,
      tags: q.tags,
      date: q.publishedAt.toISOString().slice(0, 10),
      frequency: mapFrequency(q.frequency),
    };
  } catch (error) {
    try {
      const q = await fallbackFindById(id);
      if (!q) return null;
      return {
        id: q.id,
        category: q.category as BlogPost['category'],
        number: q.number,
        title: q.title,
        description: q.description,
        tags: q.tags,
        date: q.publishedAt.toISOString().slice(0, 10),
        frequency: mapFrequency(q.frequency),
      };
    } catch (fallbackError) {
      console.error('[questions-repository] getQuestionPostMetaById failed', error, fallbackError);
      return null;
    }
  }
}

export async function getAdjacentQuestionPosts(category: string, currentId: string) {
  const posts = await getQuestionPostsByCategory(category);
  const currentIndex = posts.findIndex((p) => p.id === currentId);
  if (currentIndex < 0) {
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
  };
}

export async function searchQuestionPosts(params: {
  category?: string;
  examCode?: string;
  query?: string;
  page?: number;
  pageSize?: number;
}) {
  if (!canUseDb()) {
    return { items: [] as BlogPost[], total: 0 };
  }

  const category = params.category;
  const examCode = params.examCode?.trim();
  const query = params.query?.trim();
  const page = params.page && params.page > 0 ? Math.floor(params.page) : 1;
  const pageSize =
    params.pageSize && params.pageSize > 0 ? Math.min(Math.floor(params.pageSize), 100) : 20;

  try {
    const prisma = getPrismaClient() as any;
    if (!hasQuestionDelegate(prisma)) {
      throw new Error('question delegate unavailable');
    }

    const where = {
      ...(category ? { category } : {}),
      ...(examCode ? { examCode } : {}),
      ...(query
        ? {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
              { tags: { has: query } },
              { id: { contains: query, mode: 'insensitive' } },
            ],
          }
        : {}),
    };

    const [rows, total] = await Promise.all([
      prisma.question.findMany({
        where,
        orderBy: [{ publishedAt: 'desc' }, { number: 'desc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.question.count({ where }),
    ]);

    const items = (rows as DbQuestionRow[]).map((q) => ({
      id: q.id,
      category: q.category as BlogPost['category'],
      number: q.number,
      title: q.title,
      description: q.description,
      tags: q.tags,
      date: q.publishedAt.toISOString().slice(0, 10),
      frequency: mapFrequency(q.frequency),
    }));

    return { items, total };
  } catch (error) {
    try {
      const baseRows = category ? await fallbackFindByCategory(category) : await fallbackFindAll();
      const normalizedQuery = query?.toLowerCase() ?? '';
      const filtered = baseRows.filter((q) => {
        const matchExam = !examCode || q.examCode === examCode;
        const matchQuery =
          !normalizedQuery ||
          q.title.toLowerCase().includes(normalizedQuery) ||
          q.description.toLowerCase().includes(normalizedQuery) ||
          q.id.toLowerCase().includes(normalizedQuery) ||
          q.tags.some((t) => t.toLowerCase().includes(normalizedQuery));
        return matchExam && matchQuery;
      });
      const total = filtered.length;
      const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
      const items: BlogPost[] = paged.map((q) => ({
        id: q.id,
        category: q.category as BlogPost['category'],
        number: q.number,
        title: q.title,
        description: q.description,
        tags: q.tags,
        date: q.publishedAt.toISOString().slice(0, 10),
        frequency: mapFrequency(q.frequency),
      }));
      return { items, total };
    } catch (fallbackError) {
      console.error('[questions-repository] searchQuestionPosts failed', error, fallbackError);
      return { items: [] as BlogPost[], total: 0 };
    }
  }
}
