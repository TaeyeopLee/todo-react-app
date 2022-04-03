import React, {useEffect, useState} from 'react';
import './App.css';
import Todo, {IPropsTodoItem} from "./Todo";
import AddTodo from "./AddTodo";
import { Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import { call, signout } from "./service/ApiService";

const defaultTodoItems = [
  {
    id: '0', title: "Hello World 1", done: true
  }, {
    id: '1', title: "Hello World 2", done: false
  }
]
function App() {
  const [items, setItems] = useState({items: defaultTodoItems});

  const add = (item: IPropsTodoItem) => {
    call("/todo", "POST", item).then((response) =>
      setItems({ items: response.data })
    );
  }

  const deleteItem = (item: IPropsTodoItem) => {
    call("/todo", "DELETE", item).then((response) =>
      setItems({ items: response.data })
    );
  }

  const update = (item: IPropsTodoItem) => {
    call("/todo", "PUT", item).then((response) =>
      setItems({ items: response.data })
    );
  }

  useEffect(() => {
    call("/todo", "GET", null).then((response) =>
      setItems({ items: response.data })
    );
  }, []);

  const navigationBar = (
    <AppBar position='static'>
      <Toolbar>
        <Grid justifyContent='space-between' container>
          <Grid item>
            <Typography variant='h6'>오늘의 할일</Typography>
          </Grid>
          <Grid>
            <Button color="inherit" onClick={signout}>로그아웃</Button>
          </Grid>
        </Grid>
      </Toolbar>
  </AppBar>
);

  return (
    <div className="App">
      {navigationBar}
      <Container maxWidth="md">
        <AddTodo add={add}/>
        {items.items.length > 0 && (
          <Paper style={{ margin: 16 }}>
            <List>
              {items.items.map((item, idx) => (
                <Todo item={item} key={item.id} delete={deleteItem} update={update} />
              ))}
            </List>
          </Paper>
          )
        }
      </Container>
    </div>
  );
}

export default App;
