import React, { FunctionComponent, useState } from "react";
import BookmarksInput from "../Bookmark-input/BookmarkInput";
import BookmasksList from "../Bookmarks-list/BookmarksList";
import { getBookmark } from "../../utils/fetch/FetchBookmarks";
import { GLOBAL } from "../../Constants";
import { Bookmark } from "../../utils/types/BookmarksType";

const BookmarksPage: FunctionComponent = () => {
  // Store all Bookmarks
  const [bookmarksList, setBookmarksList] = useState<Bookmark[]>([]);

  // Is the url authorized (vimeo or flickr only)
  const isAuthorizedUrl = (url: string): boolean => {
    return (
      url.includes(
        GLOBAL.AUTHORIZED_WEBSITE.FLICKR.slice(
          0,
          GLOBAL.AUTHORIZED_WEBSITE.FLICKR.length - 1
        )
      ) ||
      url.includes(
        GLOBAL.AUTHORIZED_WEBSITE.VIMEO.slice(
          0,
          GLOBAL.AUTHORIZED_WEBSITE.VIMEO.length - 1
        )
      )
    );
  };

  // Sort the bookmark list from newest to oldest
  const sortArrayFromNewestToOldest = (list: Bookmark[]) => {
    list.sort((previous: Bookmark, next: Bookmark) =>
      previous.id < next.id ? 1 : -1
    );
  };

  // Update bookmarks list by adding a new one
  const onAddBookmark = (url: string): void => {
    getBookmark(url)
      .then((res: Bookmark) => {
        if (!res.error && isAuthorizedUrl(res.url)) {
          const newBookmarksList = [...bookmarksList];
          const todayDate = Date.now();
          newBookmarksList.push({
            ...res,
            upload_date_on_app: todayDate,
            id: todayDate,
          });
          sortArrayFromNewestToOldest(newBookmarksList);
          setBookmarksList(newBookmarksList);
        }
      })
      .catch((e) => console.error("Error during bookmark fetch,", e));
  };

  // Update bookmarks list by removing one
  const onRemoveBookmark = (id: number) => {
    setBookmarksList(
      bookmarksList.filter((bookmark: Bookmark) => bookmark.id !== id)
    );
  };

  // Render
  return (
    <>
      <BookmarksInput onAddBookmark={onAddBookmark} />
      <BookmasksList
        bookmarksList={bookmarksList}
        onRemoveBookmark={onRemoveBookmark}
      />
    </>
  );
};

export default BookmarksPage;
