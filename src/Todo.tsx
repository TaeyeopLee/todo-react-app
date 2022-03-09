import React, {useState} from 'react';
import { ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton } from "@material-ui/core";
import {DeleteOutlined} from "@material-ui/icons";

interface IPropsTodo {
  item: IPropsTodoItem;
}

export interface IPropsTodoItem {
  id: string;
  title: string;
  done: boolean;
}

const Todo = ( props: IPropsTodo ) => {
  const [item, setItem] = useState<IPropsTodoItem>(props.item);
  return (
    <ListItem>
      <Checkbox checked={item.done} />
      <ListItemText>
        <InputBase
          inputProps={{ "aria-label": "naked"}}
          type="text"
          id={item.id}
          name={item.id}
          value={item.title}
          multiline={true}
          fullWidth={true}
        />
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete Todo">
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default Todo;
