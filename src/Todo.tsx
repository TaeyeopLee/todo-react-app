import React, {useEffect, useState} from 'react';
import { ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton } from "@material-ui/core";
import {DeleteOutlined} from "@material-ui/icons";

interface IPropsTodo {
  item: IPropsTodoItem;
  readOnly?: boolean;
  delete: any;
}

export interface IPropsTodoItem {
  id: string;
  title: string;
  done: boolean;
}

const Todo = ( props: IPropsTodo ) => {
  const [item, setItem] = useState<IPropsTodo>({item: props.item, delete: props.delete, readOnly: true});

  const deleteEventHandler = () => {
    props.delete(item);
  }

  const enterKeyEventHandler = (e: any) => {
    if (e.key === "Enter") {
      setItem({ ...item, readOnly: true});
    }
  }
  const offReadOnlyMode = () => {
    console.log("Event!" , item.readOnly);
    setItem({...item, readOnly: false })
  }

  const editEventHandler = (e: any) => {
    const thisItem = item.item;
    thisItem.title = e.target.value;
    setItem({ ...item, item: thisItem})
  }

  const checkboxEventHandler = (e: any) => {
    const thisItem = item.item;
    thisItem.done = !thisItem.done;
    setItem({ ...item, item: thisItem });
  }

  useEffect(() => {
    console.log("ReadOnly? ", item.readOnly);
  }, [item.readOnly]);

  return (
    <ListItem>
      <Checkbox checked={item.item.done} onChange={checkboxEventHandler} />
      <ListItemText>
        <InputBase
          inputProps={{
            "aria-label": "naked",
            readOnly: item.readOnly,
          }}
          type="text"
          id={item.item.id}
          name={item.item.id}
          value={item.item.title}
          multiline={true}
          fullWidth={true}
          onClick={offReadOnlyMode}
          onChange={editEventHandler}
          onKeyPress={enterKeyEventHandler}
        />
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton
          aria-label="Delete Todo"
          onClick={deleteEventHandler}
        >
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default Todo;
