import React from "react";
import Table from "../commons/Table";
import { Input } from "../commons/Inputs";
import { ButtonEdit, ButtonDelete } from "../commons/Button";






const BookTable = ({ data, handleEditBook, handleDeleteBook }) => {
  const columns = [
   
    {
      Header: "Titulo",
      accessor: "title",
    },
    {
      Header: "Descripcion",
      accessor: "description",
    },
    {
      Header: "#Páginas",
      accessor: "pageCount",
    },
    {
      Header: "Resumen",
      accessor: "excerpt",
    },
    {
      Header: "Fecha Publicación",
      accessor: "publishDate",
    },
    

    {
      Header: "Acciones",
      Cell: ({ original: book }) => {
        return (
          <>
            <center
              style={{
                width: "100%",
              }}
            >
              <ButtonEdit onClick={() => handleEditBook(book)} />

              <ButtonDelete onClick={() => handleDeleteBook(book)} />
            </center>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Table columns={columns} data={data}></Table>
    </>
  );
};

export default BookTable;
