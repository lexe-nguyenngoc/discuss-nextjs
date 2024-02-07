import db from "@/db";
import { cache } from "react";

export type CommentsWithUser = Awaited<
  ReturnType<typeof fetchCommentsByPostId>
>;

export const fetchCommentsByPostId = cache(async (postId: string) => {
  const comments = await db.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  return comments;
});
