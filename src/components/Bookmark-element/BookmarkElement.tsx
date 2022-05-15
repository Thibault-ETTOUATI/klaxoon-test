import * as React from "react";
import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { Button, Image } from "antd";
import ReactPlayer from "react-player";
import moment from "moment";
import { Bookmark, MediaType } from "../../utils/types/BookmarksType";
import { GLOBAL } from "../../Constants";

type Props = {
  bookmark: Bookmark;
  onRemoveBookmark: (id: number) => void;
};
const useStyles = createUseStyles({
  elementContainer: {
    minWidth: 400,
    backgroundColor: "lightgray",
    marginLeft: "20%",
    marginRight: "20%",
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

const BookmarkElement: FunctionComponent<Props> = ({
  bookmark,
  onRemoveBookmark,
}: Props): ReactElement => {
  const [lastUpdate, setLastUpdate] = useState<string>();

  const classes = useStyles();

  // render specific metadata
  const renderSpecificMetadata = (
    title: string,
    value: string
  ): ReactElement => {
    return (
      <div className={classes.specificMetadata}>
        <div className={classes.title}>{title}</div>
        <div>{value}</div>
      </div>
    );
  };

  // Render bookmark's metadata
  const renderMetadata = (): ReactElement => {
    const extractVideoId = bookmark.url.split("vimeo.com/")[1];

    return (
      <div className={classes.elementPreview}>
        {bookmark.thumbnail_url && bookmark.type === MediaType.PHOTO && (
          <Image width="auto" height="auto" src={bookmark.thumbnail_url} />
        )}
        {bookmark.thumbnail_url && bookmark.type === MediaType.VIDEO && (
          <ReactPlayer
            url={`https://player.vimeo.com/video/${extractVideoId}`}
            controls
            width="auto"
            height="auto"
            title={bookmark.title}
          />
        )}
        <div className={classes.elementMetadata}>
          {bookmark.url && (
            <div>
              {renderSpecificMetadata(GLOBAL.BOOKMARK.VIDEO_URL, bookmark.url)}
            </div>
          )}
          <div>
            {renderSpecificMetadata(GLOBAL.BOOKMARK.TITLE, bookmark.title)}
          </div>
          <div>
            {renderSpecificMetadata(
              GLOBAL.BOOKMARK.AUTHOR,
              bookmark.author_name
            )}
          </div>
          {bookmark.upload_date && (
            <div>
              {renderSpecificMetadata(
                GLOBAL.BOOKMARK.UPLOAD_DATE,
                moment(new Date(bookmark.upload_date)).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )
              )}
            </div>
          )}
          {lastUpdate && (
            <div>
              {renderSpecificMetadata(GLOBAL.BOOKMARK.ADD_DATE, lastUpdate)}
            </div>
          )}
          {bookmark.type === MediaType.PHOTO && (
            <div>
              {renderSpecificMetadata(
                GLOBAL.BOOKMARK.SIZE,
                `${bookmark.width} x ${bookmark.height}`
              )}
            </div>
          )}
          {bookmark.duration && bookmark.type === MediaType.VIDEO && (
            <div>
              {renderSpecificMetadata(
                GLOBAL.BOOKMARK.DURATION,
                moment.utc(bookmark.duration * 1000).format("HH:mm:ss")
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Update countdown
  useEffect(() => {
    const intervalID = setInterval(() => {
      if (bookmark.upload_date_on_app) {
        const est = moment(bookmark.upload_date_on_app).fromNow();
        setLastUpdate(est);
      }
    }, 1000);
    return () => clearInterval(intervalID);
  }, []);

  // Render
  return (
    <div className={classes.elementContainer}>
      {renderMetadata()}
      <Button onClick={() => onRemoveBookmark(bookmark.id)} type="primary">
        Delete bookmark
      </Button>
    </div>
  );
};
export default BookmarkElement;
