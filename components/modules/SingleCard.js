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
export default function SingleCard({
  todo,
  setTodos,
  index,
  todos,
  postData,
  saveload,
  deleteload,
}) {
  const [refresh, setRefresh] = useState({});

  const todolist = todos[index].todos;
  // console.log(todolist.length);
  // console.log(todos[index].todos);
  const clickHandler = async (e) => {
    switch (e.target.id) {
      case "DeleteTitle":
        const newtodo = [...todos];
        newtodo.splice(index, 1);

        // for refresh page

        // fist add to DB then update ui ===> add async await
        await postData(newtodo);
        setRefresh(todolist);
        setTodos(newtodo);
        return;
      case "AddTodo":
        console.log(e.target.id);
        const todolist = [...todos];
        todolist[index].todos = [
          ...todolist[index].todos,
          { todoName: "", status: "" },
        ];
        await postData(todos);
        setRefresh(todolist);

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
                className={styles.addtodoButton}
                id="AddTodo"
                onClick={(e) => clickHandler(e)}
                variant="contained"
              >
                {saveload ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="18" cy="12" r="0" fill="currentColor">
                      <animate
                        attributeName="r"
                        begin=".67"
                        calcMode="spline"
                        dur="1.5s"
                        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                        repeatCount="indefinite"
                        values="0;2;0;0"
                      />
                    </circle>
                    <circle cx="12" cy="12" r="0" fill="currentColor">
                      <animate
                        attributeName="r"
                        begin=".33"
                        calcMode="spline"
                        dur="1.5s"
                        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                        repeatCount="indefinite"
                        values="0;2;0;0"
                      />
                    </circle>
                    <circle cx="6" cy="12" r="0" fill="currentColor">
                      <animate
                        attributeName="r"
                        begin="0"
                        calcMode="spline"
                        dur="1.5s"
                        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                        repeatCount="indefinite"
                        values="0;2;0;0"
                      />
                    </circle>
                  </svg>
                ) : (
                  "Add Todo"
                )}
              </Button>

              <IconButton id="SaveTodos" onClick={(e) => clickHandler(e)}>
                {saveload ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="18" cy="12" r="0" fill="currentColor">
                      <animate
                        attributeName="r"
                        begin=".67"
                        calcMode="spline"
                        dur="1.5s"
                        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                        repeatCount="indefinite"
                        values="0;2;0;0"
                      />
                    </circle>
                    <circle cx="12" cy="12" r="0" fill="currentColor">
                      <animate
                        attributeName="r"
                        begin=".33"
                        calcMode="spline"
                        dur="1.5s"
                        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                        repeatCount="indefinite"
                        values="0;2;0;0"
                      />
                    </circle>
                    <circle cx="6" cy="12" r="0" fill="currentColor">
                      <animate
                        attributeName="r"
                        begin="0"
                        calcMode="spline"
                        dur="1.5s"
                        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                        repeatCount="indefinite"
                        values="0;2;0;0"
                      />
                    </circle>
                  </svg>
                ) : (
                  <SaveIcon />
                )}
              </IconButton>
              <IconButton id="DeleteTitle" onClick={(e) => clickHandler(e)}>
                {deleteload ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="18" cy="12" r="0" fill="currentColor">
                      <animate
                        attributeName="r"
                        begin=".67"
                        calcMode="spline"
                        dur="1.5s"
                        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                        repeatCount="indefinite"
                        values="0;2;0;0"
                      />
                    </circle>
                    <circle cx="12" cy="12" r="0" fill="currentColor">
                      <animate
                        attributeName="r"
                        begin=".33"
                        calcMode="spline"
                        dur="1.5s"
                        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                        repeatCount="indefinite"
                        values="0;2;0;0"
                      />
                    </circle>
                    <circle cx="6" cy="12" r="0" fill="currentColor">
                      <animate
                        attributeName="r"
                        begin="0"
                        calcMode="spline"
                        dur="1.5s"
                        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                        repeatCount="indefinite"
                        values="0;2;0;0"
                      />
                    </circle>
                  </svg>
                ) : (
                  <Delete />
                )}
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
