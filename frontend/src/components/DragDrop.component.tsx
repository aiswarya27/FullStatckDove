import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { LinkPreview } from './LinkPreview.component'

interface DataElement {
  id: string
  title: string
}
interface Props {
  dataList: DragDropList
  onDragEnd: (result: any) => void
}

export type DragDropList = DataElement[]

export const DragDropComponent: React.FC<Props> = ({ dataList, onDragEnd }) => {
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {dataList.map((data, index) => (
                <Draggable draggableId={data.id} index={index} key={data.id}>
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <LinkPreview key={data.id} title={data.title} link={`/notes/${data.id}`} />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}
