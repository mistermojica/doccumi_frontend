import React from 'react';
import namor from 'namor';
import {Button} from 'react-bootstrap';

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i += 1) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  let statusval = '';
  if (statusChance > 0.66) statusval = 'relationship';
  else if (statusChance > 0.33) statusval = 'complicated';
  else statusval = 'single';

  return {
    firstName: namor.generate({words: 1, numbers: 0}),
    lastName: namor.generate({words: 1, numbers: 0}),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status: statusval
  };
};

// Button component
function Action() {
  return (
    <div>
      <Button
        size="sm"
        variant="primary"
        onClick={() => {
          // handleViewShow(
          //   SetRowData(item),
          //   SetDelete(false)
          // );
        }}
      >
        View
      </Button>
      |
      <Button
        size="sm"
        variant="warning"
        onClick={() => {
          // handleEditShow(
          //   SetRowData(item),
          //   SetId(item._id));
        }}
      >
        Editar
      </Button>
      |
      <Button
        size="sm"
        variant="danger"
        onClick={() => {
          // handleViewShow(
          //   SetRowData(item),
          //   SetId(item._id),
          //   SetDelete(true)
          // );
        }}
      >
        Borrar
      </Button>
    </div>
  );
}

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map(() => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
        actions: <Action>&nbsp;</Action>
      };
    });
  };

  return makeDataLevel();
}
