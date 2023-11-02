import React, { useState } from "react";
import styles from "./Todolist.module.css";
import { Input } from "@mui/material";
export default function Todolist({ setTodos, index, listindex, todos }) {
  const [refresh, setRefresh] = useState({});
  const inputValue = todos[index].todos[listindex].todoName;
  //   console.log(refresh);
  const changeHandler = (e) => {
    const newtodo = [...todos];
    newtodo[index].todos[listindex].todoName = e.target.value;
    //dosen't need to setTodos
    setRefresh(e.target.value);
  };

  return (
    <div className={styles.container}>
      <Input
        onChange={(e) => changeHandler(e)}
        placeholder="Your Todo"
        multiline
        value={inputValue && inputValue}
        disableUnderline
        minRows={3}
        id="todolist"
      />
      {/* add status button */}
    </div>
  );
}
