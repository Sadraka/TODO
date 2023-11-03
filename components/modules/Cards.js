"use client";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import SingleCard from "./SingleCard";
import styles from "./Cards.module.css";
export default function Cards({
  todo,
  postData,
  saveload,
  deleteload,
  delstatus,
}) {
  const [todos, setTodos] = useState([...todo]);
  const clickHandler = (e) => {
    setTodos([...todos, { todoTitle: "", todos: [] }]);
  };

  return (
    <>
      <div className={styles.container}>
        {todos &&
          todos.map((item, index) => (
            <div className={styles.singlecard} key={index}>
              <SingleCard
                todo={item}
                todos={todos}
                setTodos={setTodos}
                index={index}
              />
            </div>
          ))}

        <Button
          onClick={(e) => clickHandler(e)}
          variant="text"
          sx={{
            color: "black",
            minWidth: "245px",
            marginLeft: "15px",
            marginRight: "15px",
            marginTop: "15px",
          }}
          endIcon={<AddIcon />}
          id="AddTitle"
        >
          Add Todo Title
        </Button>
      </div>
    </>
  );
}
