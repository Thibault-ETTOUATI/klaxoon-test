import { Bookmark } from "../types/BookmarksType";

// Fetch get bookmark
export const getBookmark = (url: string): Promise<Bookmark> => {
  return fetch(`https://noembed.com/embed?dataType=json&url=${url}`).then(
    (res) => res.json()
  );
};
