import React from "react";
import { Route, Switch } from "react-router-dom";
import BookForm from "../components/books/BookForm";
import BookList from "../components/books/BookList";
function AppRoutes() {
  return (
    <>
      <Switch>
        <Route exact path="/books/:id" component={BookForm}></Route>
        <Route path="/" component={BookList}></Route>
      </Switch>

    </>
  );
}

export default AppRoutes;
