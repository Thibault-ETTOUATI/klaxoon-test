import React, { FunctionComponent, useState } from "react";
import { createUseStyles } from "react-jss";
import { GLOBAL } from "../../Constants";

type Props = {
  onAddBookmark: (bookmark: string) => void;
};

const useStyles = createUseStyles({
  inputContainer: {
    minWidth: 400,
    backgroundColor: "#ec2587",
    marginLeft: "20%",
    marginRight: "20%",
    marginTop: 16,
    marginBottom: 16,
    paddingBottom: 8,
    paddingTop: 8,
    borderRadius: 8,
    flexDirection: "column",
    alignItems: "center",
    display: "flex",
  },
  inputElement: {
    minWidth: 400,
    marginLeft: "20%",
    marginRight: "20%",
    marginBottom: 16,
    paddingBottom: 8,
    paddingTop: 8,
    borderRadius: 8,
    fontSize: 16,
  },
});

const BookmarkInput: FunctionComponent<Props> = ({ onAddBookmark }: Props) => {
  const [text, setText] = useState<string>("");
  const classes = useStyles();

  return (
    <div className={classes.inputContainer}>
      <input
        className={classes.inputElement}
        value={text}
        placeholder={GLOBAL.BOOKMARK.INPUT_PLACEHOLDER}
        onChange={(e) => setText(e.target.value)}
        type="text"
      />
      <button onClick={() => onAddBookmark(text)} type="submit">
        {GLOBAL.BOOKMARK.VALIDATE}
      </button>
    </div>
  );
};

export default BookmarkInput;
