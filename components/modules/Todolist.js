"use client";
import React, { useState } from "react";
import styles from "./Todolist.module.css";

import { Input, Tooltip } from "@mui/material";

export default function Todolist({
  setTodos,
  index,
  listindex,
  todos,
  postData,
}) {
  const [refresh, setRefresh] = useState({});
  const inputValue = todos[index].todos[listindex].todoName;
  const status = todos[index].todos[listindex].status;

  const changeHandler = (e) => {
    const newtodo = [...todos];
    newtodo[index].todos[listindex].todoName = e.target.value;

    //dosen't need to setTodos
    setRefresh(e.target.value);
  };
  const clickHandler = async (e) => {
    switch (e.target.id) {
      case "deletetodo":
        // how to prevent to refresh page before post

        const newtodo = [...todos];
        newtodo[index].todos.splice(listindex, 1);
        await postData(newtodo);
        return;
      case "done":
        const donetodo = [...todos];
        donetodo[index].todos[listindex].status = e.target.id;

        await postData(donetodo);
        return;
      case "progress":
        const progresstodo = [...todos];
        progresstodo[index].todos[listindex].status = e.target.id;
        await postData(progresstodo);
        return;
      case "review":
        const reviewtodo = [...todos];
        reviewtodo[index].todos[listindex].status = e.target.id;
        await postData(reviewtodo);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.todo}>
        <Input
          onChange={(e) => changeHandler(e)}
          placeholder="Your Todo"
          multiline
          value={inputValue && inputValue}
          disableUnderline
          minRows={5}
          maxRows={7}
          id="todolist"
        />
        {/* add status button */}
        <div className={styles.buttonlist}>
          <Tooltip title="Done" placement="left">
            <button
              onClick={(e) => clickHandler(e)}
              id="done"
              className={status === "done" ? styles.done : null}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m6.7 18l-5.65-5.65l1.425-1.4l4.25 4.25l1.4 1.4L6.7 18Zm5.65 0L6.7 12.35l1.4-1.425l4.25 4.25l9.2-9.2l1.4 1.425L12.35 18Zm0-5.65l-1.425-1.4L15.875 6L17.3 7.4l-4.95 4.95Z"
                />
              </svg>
            </button>
          </Tooltip>
          <Tooltip title="Progress" placement="left">
            <button
              onClick={(e) => clickHandler(e)}
              id="progress"
              className={status === "progress" ? styles.progress : null}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M1 1h22M10 4.5h4V6c0 1-2 2-2 2s-2-1-2-2V4.5ZM5 1v5c0 3 5 3.235 5 6s-5 3-5 6v5M19 1v5c0 3-5 3.235-5 6s5 3 5 6v5M1 23h22M8 21c0-2 4-4 4-4s4 2 4 4v2H8v-2Z"
                />
              </svg>
            </button>
          </Tooltip>
          <Tooltip title="Review" placement="left">
            <button
              onClick={(e) => clickHandler(e)}
              id="review"
              className={status === "review" ? styles.review : null}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M9 2.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm1.45-.5a2.5 2.5 0 0 0-4.9 0H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-2.55ZM8 5H5.5V3.5h-2v11h9v-11h-2V5H8ZM5 7.75A.75.75 0 0 1 5.75 7h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 5 7.75Zm.75 1.75a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </Tooltip>
          <Tooltip title="Delete todo" placement="left">
            <button
              onClick={(e) => clickHandler(e)}
              id="deletetodo"
              className={styles.delete}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m20.37 8.91l-1 1.73l-12.13-7l1-1.73l3.04 1.75l1.36-.37l4.33 2.5l.37 1.37l3.03 1.75M6 19V7h5.07L18 11v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2Z"
                />
              </svg>
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
