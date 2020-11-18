import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function DnDItems(props) {
  const [state, setState] = useState({
    items: props.items,
    selected: [],
  });

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
 const move = (source, destination, droppableSource, droppableDestination) => {
     const sourceClone = Array.from(source);
     const destClone = Array.from(destination);
     const [removed] = sourceClone.splice(droppableSource.index, 1);
     destClone.splice(droppableDestination.index, 0, removed);
     const result = {};
     result[droppableSource.droppableId] = sourceClone;
     result[droppableDestination.droppableId] = destClone;
     return result;
 };
 
 const grid = 8;
 
 const getItemStyle = (isDragging, draggableStyle) => ({
     userSelect: 'none',
     height: `fitContent`,
     padding: `0 5px 0 5px`,
     margin: 4,
     borderRadius: 4,
     background: isDragging ? 'lightgreen' : 'lightblue',
     ...draggableStyle
 });
 
 const getListStyle = isDraggingOver => ({
     background: isDraggingOver ? 'lightblue' : 'lightgrey',
     borderRadius: 4,
     minHeight: 50,
     padding: grid,
     marginBottom: 10,
     flexWrap: `wrap`,
     boxShadow: `inset 2px 2px 5px 0px rgba(0,0,0,0.75)`
 });
  
const id2List = {
    droppable: 'items',
    droppable2: 'selected'
};

const getList = id => state[id2List[id]];

const onDragEnd = result => {
    const { source, destination } = result;
    if (!destination) {
        return;
    }
    if (source.droppableId === destination.droppableId) {
        const items = reorder(
            getList(source.droppableId),
            source.index,
            destination.index
        );
        let state = { items };
        if (source.droppableId === 'droppable2') {
            state = { selected: items };
        }
        setState(state);
    } else {
        const result = move(
            getList(source.droppableId),
            getList(destination.droppableId),
            source,
            destination
        );
        setState({items: result.droppable, selected: result.droppable2 });
        props.onUpdateNecItems(result.droppable2);
    }
};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
          {(provided, snapshot) => (
              <div className="d-flex"
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}>
                  {state.items.map((item, index) => (
                      <Draggable className="nec-items"
                          key={item.id}
                          draggableId={item.id}
                          index={index}>
                          {(provided, snapshot) => (
                              <div className="nec-item"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={getItemStyle(
                                      snapshot.isDragging,
                                      provided.draggableProps.style
                                  )}>
                                  {item.name}
                              </div>
                          )}
                      </Draggable>
                  ))}
                  {provided.placeholder}
              </div>
          )}
      </Droppable>
      <Droppable droppableId="droppable2">
          {(provided, snapshot) => (
              <div className="d-flex"
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}>{(state.selected.length<1)?'Drop Required Items Here!' :''}
                  {state.selected.map((item, index) => (
                      <Draggable className="nec-items"
                          key={item.id}
                          draggableId={item.id}
                          index={index}>
                          {(provided, snapshot) => (
                              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}> 
                                  {item.name}
                              </div>
                          )}
                      </Draggable>
                  ))}
                  {provided.placeholder}
              </div>
          )}
      </Droppable>
    </DragDropContext>
  );
}

export default DnDItems;
