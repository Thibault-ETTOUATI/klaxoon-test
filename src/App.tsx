import React, { FunctionComponent, ReactElement } from "react";
import "./App.css";
import { createUseStyles } from "react-jss";
import BookmarksPages from "./components/Bookmarks-page/BookmarksPage";
import logoKlaxoon from "./media/logo-klaxoon.png";

const useStyles = createUseStyles({
  app: {
    backgroundColor: "#213760",
    paddingTop: 16,
    paddingBottom: 16,
    height: "100%",
  },
});

const App: FunctionComponent = (): ReactElement => {
  const classes = useStyles();

  // Render
  return (
    <div className={classes.app}>
      <img src={logoKlaxoon} width={200} alt="logo" />
      <BookmarksPages />
    </div>
  );
};

export default App;
