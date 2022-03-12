import React, {useEffect, useState} from 'react';
import './App.css';
import Todo, {IPropsTodoItem} from "./Todo";
import AddTodo from "./AddTodo";
import { Paper, List, Container } from "@material-ui/core";

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
    const thisItems = items.items;
    item.id = "ID-" + thisItems.length;
    item.done = false;
    thisItems.push(item);
    setItems({items: thisItems});
  }

  const deleteItem = (item: IPropsTodoItem) => {
    const thisItems = items.items;
    console.log("Before Update Items: ", items);
    const newItems = thisItems.filter(e => e.id !== item.id);
    setItems({items: newItems});
  }

  useEffect(() => {
    console.log("Update Items: ", items);
  }, [items]);

  return (
    <div className="App">
      <Container maxWidth="md">
        <AddTodo add={add}/>
        {items.items.length > 0 && (
          <Paper style={{ margin: 16 }}>
            <List>
              {items.items.map((item, idx) => (
                <Todo item={item} key={item.id} delete={deleteItem} />
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
