import React from "react";

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

const PostShowPage = ({ params }: PostShowPageProps) => {
  return <div>Post Show Page, {JSON.stringify(params)}</div>;
};

export default PostShowPage;
