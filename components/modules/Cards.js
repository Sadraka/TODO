"use client";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import SingleCard from "./SingleCard";
import styles from "./Cards.module.css";
export default function Cards({ todo }) {
  const [addTitle, setAddTitle] = useState();
  const [todos, setTodos] = useState([...todo]);
  const clickHandler = (e) => {
    setTodos([
      ...todos,
      { todoTitle: "", todos: [{ todoName: "", status: "" }] },
    ]);
  };
  console.log("cards", todos);
  return (
    <>
      <div className={styles.container}>
        {todos &&
          todos.map((item, index) => (
            <div className={styles.singlecard}>
              <SingleCard
                todo={item}
                key={index}
                setTodos={setTodos}
                index={index}
                todos={todos}
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
