"use client";
import React, { useEffect } from "react";
import styles from "./SingleCards.module.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Delete, DeleteForever } from "@mui/icons-material";
import { useState } from "react";
import { Input } from "@mui/material";
export default function SingleCard({ todo, setTodos, index, todos, postData }) {
  const [input, setInput] = useState({});

  const clickHandler = (e) => {
    switch (e.target.id) {
      case "DeleteTitle":
        const newtodo = [...todos];
        newtodo.splice(index, 1);
        setTodos(newtodo);
        setInput(e.target);
        // for refresh page
        postData(newtodo);
        return;
      case "AddTodo":
        postData(todos);
        return;
    }
  };

  const changeHandler = (e) => {
    const newtodo = [...todos];
    newtodo[index][e.target.id] = e.target.value;
    //dosen't need to setTodos
    setInput(e.target.value);
    // for refresh page
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.title}>
            <Input
              onChange={(e) => changeHandler(e)}
              placeholder="Todo Title"
              value={todo.todoTitle}
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
