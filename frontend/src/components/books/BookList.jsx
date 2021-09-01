import React, { useEffect, useState } from "react";

import { Row, Col, Card, CardBody } from "reactstrap";
import BookTable from "./BookTable";
import { getBooks, deleteBooks } from "../../services/books/booksService";
import InputSearch from "./../commons/Inputs/InputSearch";
import { useHistory, useParams } from "react-router-dom";
import { ButtonAdd } from "../commons/Button";
import { isValueStartsWith } from "../../utils/utilityGeneralFunctions";
import useForm from "./../../hooks/useForm";

import {
  messageDialog,
  messageConfirmationDialog,
  displayHttpErrorMessage,
} from "./../../utils/utilityMessageDialogFunctions";

const BookList = () => {
  const initalState = {
    filter: "",
    books: [],
    filteredBooks: [],
  };

  const { state: booksData, setState: setBooksData } = useForm(initalState);

  const { filter, books, filteredBooks } = booksData;

  const handleChangeInput = ({ currentTarget: input }) => {
    setBooksData((data) => ({ ...data, filter: input.value }));
    handleSearchBook(input.value);
  };

  const handleSearchBook = (filter = "") => {
    const booksFiltered = filterBooks(filter, books);
    setBooksData((data) => ({
      ...data,
      filteredBooks: booksFiltered,
    }));
  };

  const history = useHistory();

  const filterBooks = (filter, books = []) => {
    const booksFiltered = books?.filter(
      (book) =>
        isValueStartsWith(book?.title, filter) ||
        isValueStartsWith(book?.id, filter)
    );
    return booksFiltered;
  };

  const handleEditBook = ({ id }) => {
    history.push("books/" + id);
  };

  const handleAddBook = ({ id }) => {
    history.push("books/new");
  };

  const handleDeleteBook = ({ id }) => {
    messageConfirmationDialog({
      text: "Esta seguro que desea eliminar este elemento",
      callback: async (response) => {
        if (response) {
          deleteBookElement(id);
        }
      },
    });
  };

  const deleteBookElement = async (id) => {
    try {
      const response = await deleteBooks(id);
      const data = response.data;

      if (data !== null || data !== undefined) {
        const booksUpdated = filteredBooks?.filter((book) => book.id !== id);
        setBooksData((bookData) => ({
          ...bookData,
          books: booksUpdated,
          filteredBooks: booksUpdated,
        }));
      }
      messageDialog({ text: data.message });
    } catch (error) {
      displayHttpErrorMessage(error);
    }
  };

  const populateBooks = async () => {
    try {
      const response = await getBooks();
      const books = response.data;

      setBooksData((bookData) => ({
        ...bookData,
        books,
        filteredBooks: books,
      }));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    populateBooks();
  }, []);

  return (
    <>
      <Row>
        <Col md={12}>
          <InputSearch
            label="Filtro"
            onChange={handleChangeInput}
            value={filter}
            onClick={handleSearchBook}
            onEnter={handleSearchBook}
          />
        </Col>

        <Col md={12}>
          <Row>
            <Col md={12}>
              <div className="float-right mt-3 mb-3">
                <ButtonAdd onClick={handleAddBook} />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <BookTable
            data={filteredBooks}
            handleEditBook={handleEditBook}
            handleDeleteBook={handleDeleteBook}
          />
        </Col>
      </Row>
    </>
  );
};

export default BookList;
