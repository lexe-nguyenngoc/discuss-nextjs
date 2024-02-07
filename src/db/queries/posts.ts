import type { Post } from "@prisma/client";
import db from "@/db";

export type PostWithData = Post & {
  topic: { slug: string };
  user: { name: string | null };
  _count: {
    comments: number;
  };
};

export const fetchPostsBySearchTerm = async (
  term: string
): Promise<PostWithData[]> => {
  return db.post.findMany({
    include: {
      topic: { select: { slug: true } },
      user: { select: { image: true, name: true } },
      _count: { select: { comments: true } },
    },
    where: {
      OR: [{ title: { contains: term } }, { content: { contains: term } }],
    },
  });
};

export const fetchPostsByTopicSlug = (slug: string) => {
  return db.post.findMany({
    where: {
      topic: {
        slug,
      },
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
};

export const fetchTopPosts = async (): Promise<PostWithData[]> => {
  return db.post.findMany({
    orderBy: [
      {
        comments: { _count: "desc" },
      },
    ],
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
    take: 5,
  });
};
