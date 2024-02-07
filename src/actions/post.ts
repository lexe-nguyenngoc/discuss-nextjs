"use server";

import { z } from "zod";
import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import paths from "@/paths";
import db from "@/db";
import { redirect } from "next/navigation";

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

export const createPost = async (
  slug: string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> => {
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.formErrors.fieldErrors,
    };
  }

  let post: Post;
  try {
    const session = await auth();

    if (!session || !session.user) {
      throw new Error("You must be signed in to do this");
    }

    const topic = await db.topic.findFirst({
      where: {
        slug,
      },
    });

    if (!topic) {
      throw new Error("Slug not found in database!");
    }

    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        topicId: topic.id,
        userId: session.user.id,
      },
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to create post!";

    return {
      errors: {
        _form: [message],
      },
    };
  }

  // TODO: revalidate the topic show page
  revalidatePath(paths.topicShow(slug));
  redirect(paths.postShow(slug, post.id));
};
