"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { Topic } from "@prisma/client";

import db from "@/db";
import { auth } from "@/auth";
import paths from "@/paths";

const createCommentSchema = z.object({
  content: z.string().min(3),
});

interface CreateCommentFormState {
  errors: {
    content?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export const createComment = async (
  { postId, parentId }: { postId: string; parentId?: string },
  formState: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> => {
  const result = createCommentSchema.safeParse({
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.formErrors.fieldErrors,
    };
  }

  let topic: Topic | null;
  try {
    const session = await auth();
    if (!session || !session.user) {
      throw new Error("You must sign in to do this");
    }

    await db.comment.create({
      data: {
        content: result.data.content,
        postId: postId,
        parentId: parentId,
        userId: session.user.id,
      },
    });

    topic = await db.topic.findFirst({
      where: { posts: { some: { id: postId } } },
    });

    if (!topic) {
      throw new Error("Failed to revalidate topic");
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Something went wrong...";
    return {
      errors: {
        _form: [message],
      },
    };
  }

  revalidatePath(paths.postShow(topic.slug, postId));
  return {
    errors: {},
    success: true,
  };
};
