import { List } from '@mui/material';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Employees, IDropColumn } from 'src/Interface/Interface';
import { createSX } from 'src/utils/createStyles';
import DraggableDoctor from './DraggableDoctor';

const styles = createSX({
  list: {
    overflow: 'hidden',
    height: '100%',
  },
});

const DropColumn: React.FC<IDropColumn> = ({ list, id, isCancelled }) => {
  return (
    <Droppable droppableId={id}>
      {provided => (
        <List
          {...provided.droppableProps}
          ref={provided.innerRef}
          sx={styles.list}
        >
          {list &&
            list.map((item: Employees, index: number) => (
              <DraggableDoctor
                key={item._id}
                {...item}
                typeId={id}
                index={index}
                id={item._id}
                isCancelled={isCancelled}
              />
            ))}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  );
};
export default React.memo(DropColumn);
