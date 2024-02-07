import Link from "next/link";

import { fetchCommentsByPostId } from "@/db/queries/comments";
import paths from "@/paths";

import PostShow from "@/components/posts/PostShow";
import CommentCreateForm from "@/components/comments/CommentCreateForm";
import CommentList from "@/components/comments/CommentList";

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = params;

  const comments = await fetchCommentsByPostId(postId);

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        {"< "}Back to {slug}
      </Link>
      <PostShow postId={postId} />
      <CommentCreateForm postId={postId} startOpen />
      <CommentList comments={comments} />
    </div>
  );
}
