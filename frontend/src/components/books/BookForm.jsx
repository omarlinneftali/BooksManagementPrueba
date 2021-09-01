import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { v4 as uuid } from "uuid";
import { Input, TextArea } from "../commons/Inputs";
import { ButtonSave } from "../commons/Button";
import {
   getBooksById,
  saveBooks,
} from "../../services/books/booksService";
import { Row, Col, Card, CardBody,  } from "reactstrap";
import {
  messageDialog,
  displayHttpErrorMessage,
} from "../../utils/utilityMessageDialogFunctions";
import { getInputValue } from "../../utils/utilityInputFunctions";
import {
  hasEnoughLength,
  isGreaterThanZero,
  istNullOrEmpty
} from "../../validations/generalValidations";
import useForm from "../../hooks/useForm";

const BookForm = () => {
  const initialState = {
    id: 0,
    title: "",
    description: "",
    pageCount:0,
    excerpt:"",
    publishDate:""
    

  };
  const validations = {
    title: (title) =>
      !hasEnoughLength(title,5) ? "Titulo especificado es invalido, debe tener minimo 5 caracteres" : null,
    description: (description) =>
      !hasEnoughLength(description, 8) ? "Descripcion especificado es invalido, debe tener minimo 8 caracteres" : null,
      excerpt: (excerpt) =>
      !hasEnoughLength(excerpt, 5) ? "Resumen especificado es invalido, debe tener minimo 5 caracteres" : null,
      publishDate: (publishDate) =>
      istNullOrEmpty(publishDate) ? "Debe especificarse la fecha" : null,
      pageCount: (pageCount) =>
      !isGreaterThanZero(pageCount, ) ? "La cantidad de páginas debe ser mayor a cero" : null,
      
  };

  const handleSaveBook = async (state) => {
    try {
      const { data } = await saveBooks(state);

      if (data!==null || data!==undefined) {
        history.replace("/books");
      }
      return;
    } catch (error) {
      displayHttpErrorMessage(error);
    }
  };

  const { handleChangeInput, errors, state, setState, handleSubmit } =
    useForm(initialState, validations, handleSaveBook);

  const {  
    title,
    description,
    pageCount,
    excerpt,
    publishDate } = state;
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => populateBook(), []);

  const populateBook = async () => {
    const noFound = 404;
    try {
      if (id === "new") return;
      const {
        data
      } = await getBooksById(id);
      const book = data;

      if (book) {
        setState((data) => ({ ...data, ...book }));
      }
    } catch (error) {
      if (error?.response?.status === noFound) {
        history.replace("/not-found");
        console.error("erroer update");
      }

    }
  };


  return (
    <center className="justify-content-center mt-5">
      <Card className={"w-50 align-items-center justify-content-center"}>
        <CardBody>
         
          <Row>
            <Col md={12}>
              <Input
                name="title"
                label="Titulo"
                value={title}
                onChange={handleChangeInput}
                errors={errors}
                isRequired
              />
            </Col>
            <Col md={12}>
              <Input
                name="pageCount"
                label="Cantidad Páginas"
                value={pageCount}
                type="number"
                min="0"
                onChange={handleChangeInput}
                errors={errors}
                isRequired
              />
            </Col>
            <Col md={12}>
            <TextArea
                           rows="3"

                name="description"
                label="Descripcion"
                value={description}
                onChange={handleChangeInput}
                errors={errors}
              />
            </Col>
            <Col md={12}>
              <TextArea
               rows="3"
                name="excerpt"
                label="Resumen"
                value={excerpt}
                onChange={handleChangeInput}
                errors={errors}
              />
            </Col>
            <Col md={12}>
              <Input
                name="publishDate"
                type="Date"
                label="Fecha Publicacion"
                value={publishDate}
                onChange={handleChangeInput}
                errors={errors}
              />
            </Col>
      
          </Row>

          <Row>
            <Col md={12}>
              <div className="float-right mt-3">
                <ButtonSave onClick={handleSubmit} />
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </center>
  );
};

export default BookForm;









