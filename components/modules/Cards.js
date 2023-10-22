"use client";
import React, { useEffect } from "react";
import styles from "./Cards.module.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { Delete, DeleteForever } from "@mui/icons-material";
import { useState } from "react";
export default function Cards() {
  const [input, setInput] = useState();
  const [addtodo, setAddtodo] = useState("");

  const clickHandler = (e) => {
    setAddtodo(true);
    console.log(e.target.attributes.class.nodeValue);
    switch (e.target.id) {
      case "AddTitle":
        setAddtodo([...addtodo, e.target.attributes.class.nodeValue]);
        return;
      case "DeleteTitle":
        setAddtodo("");

        return;
    }
  };

  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    console.log(addtodo);
  });
  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          {!addtodo && (
            <Button
              onClick={(e) => clickHandler(e)}
              variant="text"
              sx={{ color: "black", minWidth: "245px" }}
              endIcon={<AddIcon />}
              id="AddTitle"
            >
              Add Todo List
            </Button>
          )}
          {addtodo && (
            <div className={styles.title}>
              <input
                onChange={(e) => changeHandler(e)}
                placeholder="Todo Title"
              />
              <div className={styles.titleButton}>
                <Button onClick={(e) => clickHandler(e)} variant="contained">
                  Add todo
                </Button>
                <IconButton id="DeleteTitle" onClick={(e) => clickHandler(e)}>
                  <Delete />
                </IconButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
