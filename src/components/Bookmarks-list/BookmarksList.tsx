import React, { FunctionComponent} from 'react';
import {Bookmark} from "../../utils/types/BookmarksType";
import BookmarkElement from "../Bookmark-element/BookmarkElement";

type Props = {
    bookmarksList: Bookmark[];
    onRemoveBookmark: (id: number) => void;
};

const BookmarksList: FunctionComponent<Props> = ({ bookmarksList, onRemoveBookmark }: Props) => {
    // Render all bookmarks in a specific element
    const renderBookmarksList = bookmarksList.map(
        (bookmark, key) => {
            return (
                < BookmarkElement
                    key={key}
                    bookmark={bookmark}
                    onRemoveBookmark={onRemoveBookmark}
                />)
        }
    );

    // Render
    return (
        <>
            {renderBookmarksList}
        </>
    );
};

export default BookmarksList;
