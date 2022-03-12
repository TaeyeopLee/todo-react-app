import React, {useEffect, useState} from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";

interface IAddTodoItem {
  title: string;
  done: boolean;
}
const defaultAddTodoItem: IAddTodoItem = {
  title: "",
  done: false
}
const AddTodo = ({add}: any) => {
  const [item, setItem] = useState({item: defaultAddTodoItem});

  const onInputChange = (e: any) => {
    console.log(e);
    const newitem = item.item;
    newitem.title = e.currentTarget.value;
    setItem({item: newitem} );
  }

  useEffect(() => {
    console.log(item);
  }, [item.item.title])

  const onButtonClick = () => {
    add(item.item);
    setItem({item: defaultAddTodoItem});
  }

  const enterKeyEventHandler = (e: any) => {
    console.log("enterKey");
    if (e.key === 'Enter') {
      onButtonClick();
    }
  }

  return (
    <Paper style={{ margin: 16, padding: 16 }}>
      <Grid container>
        <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
          <TextField
            placeholder="Add Todo here"
            fullWidth
            onChange={onInputChange}
            value={item.item.title}
            onKeyPress={enterKeyEventHandler}
          />
        </Grid>
        <Grid xs={1} md={1} item>
          <Button
            fullWidth
            color="secondary"
            variant="outlined"
            onClick={onButtonClick}
          >
            +
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default AddTodo;

