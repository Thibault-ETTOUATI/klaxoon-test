import React, { FunctionComponent } from 'react';
import { createUseStyles } from 'react-jss';
import {Bookmark, MediaType} from "../../utils/types/BookmarksType";
import TimeUtils from "../../utils/TimeUtils";
import {GLOBAL} from "../../Constants";

type Props = {
    bookmark: Bookmark;
    onRemoveBookmark: (id : number) => void;
};

const useStyles = createUseStyles({
    elementContainer: {
        minWidth: 400,
        backgroundColor: "lightgray",
        marginLeft: '20%',
        marginRight: '20%',
        paddingBottom: 8,
        paddingTop: 8,
        borderRadius: 8,
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 16,
        display: "flex",
    },
    elementPreview: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 16,
    },
    elementMetadata: {
        marginTop: 16,
    },
    specificMetadata: {
        display: "flex",
    },
    title: {
        fontWeight: "bold",
        marginRight: 15,
    },
});

const BookmarkElement: FunctionComponent<Props> = ({ bookmark, onRemoveBookmark }: Props) => {
    const classes = useStyles();

    // render specific metadata
    const renderSpecificMetadata = (title: string, value: string) => {
        return (
            <div className={classes.specificMetadata}>
                <div className={classes.title}>{title}</div>
                <div>{value}</div>
            </div>
        );
    };

    // Render bookmark's metadata
    const renderMetadata = () => {
        const start = Date.now();
        const end = bookmark.upload_date_on_app;
        const extractVideoId = bookmark.url.split('vimeo.com/')[1]

        return (
            <div className={classes.elementPreview}>
                {bookmark.thumbnail_url && bookmark.type === MediaType.PHOTO &&
                <img width="auto" height="auto" src={bookmark.thumbnail_url} alt="thumbnail"/>}
                {bookmark.thumbnail_url && bookmark.type === MediaType.VIDEO &&
                <iframe src={`https://player.vimeo.com/video/${extractVideoId}`} width="auto" height="auto"
                        frameBorder="0" allow="autoplay; fullscreen" allowFullScreen />
                }
                <div className={classes.elementMetadata}>
                    {bookmark.url && <div>{renderSpecificMetadata(GLOBAL.BOOKMARK.VIDEO_URL, bookmark.url)}</div>}
                    <div>{renderSpecificMetadata(GLOBAL.BOOKMARK.TITLE, bookmark.title)}</div>
                    <div>{renderSpecificMetadata(GLOBAL.BOOKMARK.AUTHOR, bookmark.author_name)}</div>
                    {bookmark.upload_date && <div>{renderSpecificMetadata(GLOBAL.BOOKMARK.UPLOAD_DATE, TimeUtils.formatSecondsIntoHumanTimeString(bookmark.upload_date))}</div>}
                    {end && <div>{renderSpecificMetadata(GLOBAL.BOOKMARK.ADD_DATE,TimeUtils.formatTimeFromLastUpdate(Math.floor(- (end - start) / 1000)))}</div>}
                    {bookmark.type === MediaType.PHOTO && <div>{renderSpecificMetadata(GLOBAL.BOOKMARK.SIZE, bookmark.width + ' x ' + bookmark.height)}</div>}
                    {bookmark.duration && bookmark.type === MediaType.VIDEO && <div>{renderSpecificMetadata(GLOBAL.BOOKMARK.DURATION, TimeUtils.convertDurationIntoHMSFormat(bookmark.duration))}</div>}
                </div>
            </div>
        );
    };

    // Render
    return (
        <div className={classes.elementContainer}>
            {renderMetadata()}
            <div>
                <button onClick={() => onRemoveBookmark(bookmark.id)}>Delete bookmark</button>
            </div>
        </div>
    );
};

export default BookmarkElement;
