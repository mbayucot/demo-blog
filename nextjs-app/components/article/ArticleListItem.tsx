import React, { FC } from "react";
import Link from "next/link";

import { Article } from "../../lib/types/article";

const ArticleListItem: FC<Article> = ({
  id,
  title,
  preview,
  author,
  created_at_fmt,
  comments_count,
  slug,
  tag_list,
}) => {
  return (
    <div key={id} className="bg-white py-6 px-6 rounded-3xl my-4 shadow-xl">
      <p>
        {author.first_name} {author.last_name}
      </p>
      <p>{created_at_fmt}</p>
      <Link as={`/articles/${slug}`} href="/articles/[slug]">
        <a className="text-lg pb-2 block">{title}</a>
      </Link>
      <p>{preview}</p>
      <p>{comments_count} comments</p>
      <div className="d-flex pt-3">
        {tag_list.map((tag: string) => (
          <Link key={tag} as={`/?tag=${tag}`} href={`/?tag=${tag}`}>
            <a className="px-4 py-2 text-xs font-semibold tracking-wider border-2 border-gray-300 rounded-full hover:bg-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300">
              {tag}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArticleListItem;
