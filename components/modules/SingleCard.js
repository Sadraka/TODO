"use client";
import React, { useEffect } from "react";
import styles from "./SingleCards.module.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Delete, DeleteForever } from "@mui/icons-material";
import { useState } from "react";
import { Input, setRef } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import Todolist from "./Todolist";
export default function SingleCard({ todo, setTodos, index, todos, postData }) {
  const [refresh, setRefresh] = useState({});
  const todolist = todos[index].todos;
  console.log(todolist.length);
  console.log(todos[index].todos);
  const clickHandler = (e) => {
    switch (e.target.id) {
      case "DeleteTitle":
        const newtodo = [...todos];
        newtodo.splice(index, 1);
        setTodos(newtodo);
        setRefresh(todolist);

        // for refresh page
        postData(newtodo);
        // fist add to DB then update ui ===>
        return;
      case "AddTodo":
        const todolist = [...todos];
        todolist[index].todos = [
          ...todolist[index].todos,
          { todoName: "", status: "" },
        ];
        setRefresh(todolist);
        postData(todos);
        return;
      case "SaveTodos":
        postData(todos);
        return;
    }
  };

  const changeHandler = (e) => {
    const newtodo = [...todos];
    newtodo[index][e.target.id] = e.target.value;
    //dosen't need to setTodos
    setRefresh(e.target.value);
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
            {todolist &&
              todolist.map((item, listindex) => (
                <Todolist
                  key={listindex}
                  setTodos={setTodos}
                  todos={todos}
                  index={index}
                  listindex={listindex}
                />
              ))}
            <div className={styles.titleButton}>
              <Button
                id="AddTodo"
                onClick={(e) => clickHandler(e)}
                variant="contained"
              >
                Add todo
              </Button>

              <IconButton id="SaveTodos" onClick={(e) => clickHandler(e)}>
                <SaveIcon />
              </IconButton>
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
