import React, { useState } from "react";
import styles from "./Todolist.module.css";
import { Input } from "@mui/material";
export default function Todolist({ setTodos, index, listindex, todos }) {
  const [input, setInput] = useState({});
  const changeHandler = (e) => {
    setInput(e.target.value);
    const newtodo = [...todos];
    newtodo[index].todos[listindex].todoName = e.target.value;
    //dosen't need to setTodos
    setInput(e.target.value);
  };

  return (
    <div className={styles.container}>
      <Input
        onChange={(e) => changeHandler(e)}
        placeholder="Your Todo"
        multiline
        disableUnderline
        minRows={3}
        id="todolist"
      />
    </div>
  );
}
