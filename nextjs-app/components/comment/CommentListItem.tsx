import React, { FC, useState } from "react";

import CommentForm from "./CommentForm";
import { Comment } from "../../lib/types/comment";

const CommentListItem: FC<Comment> = ({ id, article_id, body, children }) => {
  const [showReply, setShowReply] = useState<boolean>(false);
  const [items, setItems] = useState<Comment[]>(children);

  const handleReplyClick = () => {
    setShowReply(true);
  };

  const handleSuccess = (comment: Comment) => {
    setItems([...items, comment]);
  };

  return (
    <div>
      <div className="border-solid">{body}</div>
      <button onClick={handleReplyClick}>Reply</button>
      <div className="pl-4">
        {items &&
          items.map((row: Comment) => (
            <CommentListItem {...row} key={row.id} />
          ))}

        {showReply && (
          <CommentForm
            article_id={article_id}
            parent_id={id}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default CommentListItem;
