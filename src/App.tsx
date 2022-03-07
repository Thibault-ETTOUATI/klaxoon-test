import React from 'react';
import './App.css';
import BookmarksPages from "./components/bookmarks-page/BookmarksPage";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
    app: {
        backgroundColor: "#213760",
        paddingTop: 16,
        paddingBottom: 16,
        height: "100%",
    },
});


function App() {
    const classes = useStyles();

    return (
    <div className={classes.app}>
        <img src="https://tedxsaclay.com/contents/content/7-actualites/20210304-klaxoon-l-outil-collaboratif-qui-booste-nos-idees/2_klaxoonlogo.png" width={200} alt="logo"/>
        <BookmarksPages/>
    </div>
  );
}

export default App;
