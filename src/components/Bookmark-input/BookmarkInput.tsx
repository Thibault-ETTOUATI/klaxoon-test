import React, { FunctionComponent, ReactElement, useState } from "react";
import { createUseStyles } from "react-jss";
import { Button, Input } from "antd";
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

const BookmarkInput: FunctionComponent<Props> = ({
  onAddBookmark,
}: Props): ReactElement => {
  const [text, setText] = useState<string>("");
  const classes = useStyles();

  // Function on submit bookmark
  const onSubmit = (): void => {
    onAddBookmark(text);
    setText("");
  };

  // Render
  return (
    <div className={classes.inputContainer}>
      <Input
        className={classes.inputElement}
        value={text}
        placeholder={GLOBAL.BOOKMARK.INPUT_PLACEHOLDER}
        onChange={(e) => setText(e.target.value)}
        type="text"
      />
      <Button onClick={onSubmit} type="primary" disabled={!text.trim().length}>
        {GLOBAL.BOOKMARK.VALIDATE}
      </Button>
    </div>
  );
};

export default BookmarkInput;
