"use client";
import React, { useEffect } from "react";
import styles from "./SingleCards.module.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Delete, DeleteForever } from "@mui/icons-material";
import { useState } from "react";
import { Input } from "@mui/material";
export default function SingleCard({ todo, setTodos, index, todos }) {
  const [input, setInput] = useState({});
  const [addtodo, setAddtodo] = useState("");

  // console.log("singlecard", todo, setTodos, index, todos);
  const clickHandler = (e) => {
    switch (e.target.id) {
      case "DeleteTitle":
        return;
      case "AddTodo":
        setCtodo();
    }
  };

  const changeHandler = (e) => {
    const newtodo = [...todos];
    newtodo[index][e.target.id] = e.target.value;
    //dosen't need to setTodos
  };

  useEffect(() => {}, [addtodo]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.title}>
            <Input
              onChange={(e) => changeHandler(e)}
              placeholder="Todo Title"
              multiline
              disableUnderline
              maxRows={4}
              id="todoTitle"
            />

            <div className={styles.titleButton}>
              <Button
                id="AddTodo"
                onClick={(e) => clickHandler(e)}
                variant="contained"
              >
                Add todo
              </Button>
              <IconButton id="DeleteTitle" onClick={(e) => clickHandler(e)}>
                <Delete />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
