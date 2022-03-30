import React, { FunctionComponent } from "react";
import { Bookmark } from "../../utils/types/BookmarksType";
import BookmarkElement from "../Bookmark-element/BookmarkElement";

type Props = {
  bookmarksList: Bookmark[];
  onRemoveBookmark: (id: number) => void;
};

const BookmarksList: FunctionComponent<Props> = ({
  bookmarksList,
  onRemoveBookmark,
}: Props) => {
  // Render all bookmarks in a specific element
  const renderBookmarksList = bookmarksList.map((bookmark) => {
    return (
      <BookmarkElement
        key={bookmark.id}
        bookmark={bookmark}
        onRemoveBookmark={onRemoveBookmark}
      />
    );
  });

  // Render
  return <div>{renderBookmarksList}</div>;
};

export default BookmarksList;
