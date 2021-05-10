import React, { FC, useState } from "react";
import Image from "next/image";
import { FacebookSelector } from "@charkour/react-reactions";

import CommentList from "../comment/CommentList";
import ArticleAPI from "../../lib/api/article";
import { Article, Reaction, voteWeights } from "../../lib/types/article";

const ArticleToolbar: FC<Article> = ({ id, slug, comments, vote_weight }) => {
  const [showReaction, setShowReaction] = useState<boolean>(false);
  const [showComment, setShowComment] = useState<boolean>(false);
  const [reaction, setReaction] = useState<Reaction>(
    vote_weight ? voteWeights[vote_weight - 1] : "thumb"
  );

  const handleHideReaction = () => setShowReaction(false);
  const handleShowReaction = () => setShowReaction(true);

  const handleLikeClick = async () => {
    await handleReaction(reaction === "thumb" ? "like" : "thumb");
  };

  const handleComment = () => {
    setShowComment(!showComment);
  };

  const handleReaction = async (label: string) => {
    setReaction(label as Reaction);

    if (label === "thumb") {
      await ArticleAPI.unlike(slug);
    } else {
      await ArticleAPI.like(slug, label);
    }

    handleHideReaction();
  };

  return (
    <>
      <div>
        {showReaction && <FacebookSelector onSelect={handleReaction} />}

        <div className="inline-flex">
          <button
            className="mr-4"
            onMouseOver={handleShowReaction}
            onMouseOut={handleHideReaction}
            onClick={handleLikeClick}
          >
            <Image
              src={`/assets/icons/${reaction}.svg`}
              alt="Like"
              width="16"
              height="16"
            />
            <p>{voteWeights[vote_weight - 1]}</p>
          </button>
          <button onClick={handleComment}>Comment</button>
        </div>
      </div>

      {showComment && <CommentList article_id={id} children={comments} />}
    </>
  );
};

export default ArticleToolbar;
