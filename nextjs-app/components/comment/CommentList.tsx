import { FC, useState } from "react";

import CommentListItem from "./CommentListItem";
import CommentForm from "./CommentForm";
import { Comments, Comment } from "../../lib/types/comment";

const CommentList: FC<Comments> = ({ article_id, children }) => {
  const [items, setItems] = useState<Comment[]>(children);

  const handleSuccess = (comment: Comment) => {
    setItems([...items, comment]);
  };

  return (
    <>
      {items.map((row: Comment) => (
        <CommentListItem {...row} key={row.id} />
      ))}
      <CommentForm article_id={article_id} onSuccess={handleSuccess} />
    </>
  );
};

export default CommentList;
