import React, {useState} from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";

interface IAddTodoItem {
  title: string;
}
const defaultAddTodoItem: IAddTodoItem = {
  title: ""
}
const AddTodo = ({add}: any) => {
  const [item, setItem] = useState(defaultAddTodoItem);

  const onInputChange = (e: any) => {
    const newitem = item;
    newitem.title = e.target.value;
    setItem(newitem);
    console.log(newitem);
  }

  const onButtonClick = () => {
    add(item);
    setItem({title: ""});
  }

  const enterKeyEventHandler = (e: any) => {
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
            value={item.title}
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

