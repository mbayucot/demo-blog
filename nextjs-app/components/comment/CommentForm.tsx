import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import { AxiosResponse } from "axios";

import { nextAxios } from "../../lib/utils/axios-instance";
import { Comment } from "../../lib/types/comment";

interface CommentFormProps {
  parent_id?: number;
  article_id: number;
  onSuccess: (result: Comment) => void;
}

const CommentForm: FC<CommentFormProps> = ({
  article_id,
  parent_id,
  onSuccess,
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const setSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  const handleSubmit = async (value: string) => {
    try {
      const result: AxiosResponse = await nextAxios.post(
        `/api/comments/create`,
        {
          article_id: article_id,
          body: value,
          parent_id: parent_id,
        }
      );
      onSuccess(result.data);
      setSearchText("");
    } catch (error) {
      setError(true);
    }
  };

  const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await handleSubmit(e.currentTarget.value);
    }
  };

  if (error) return <div>failed to load</div>;

  return (
    <input
      type="text"
      placeholder="Write a comment..."
      value={searchText}
      onChange={setSearch}
      onKeyPress={handleKeyPress}
      className="border-2 border-black-300"
    />
  );
};

export default CommentForm;
