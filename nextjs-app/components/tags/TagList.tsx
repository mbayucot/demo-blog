import React, { FC } from "react";
import Link from "next/link";

import { SelectOptionType } from "../../lib/types/tag";

interface TagListProps {
  tag_list: SelectOptionType[];
}

const TagList: FC<TagListProps> = ({ tag_list }) => {
  return (
    <>
      {tag_list.map(({ label, value }) => (
        <Link key={value} href={`/articles?tag=${label}`}>
          <a>{label}</a>
        </Link>
      ))}
    </>
  );
};

export default TagList;
