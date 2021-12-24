import { gql, useQuery } from '@apollo/client'
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import { graphql } from '../types'
import { nonNullable } from '../util'
import { useClientNoteOrder } from './useClientNoteOrder'
import { DragDropComponent, DragDropList } from '../components/DragDrop.component'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(3, 0),
    },
  }),
)

const NOTES_QUERY = gql`
  query NotesQuery {
    notes {
      id
      title
    }
  }
`

export const NotesPage: React.FC = () => {
  const classes = useStyles()
  const { data } = useQuery<graphql.NotesQuery>(NOTES_QUERY)
  const { orderedNoteIds, onDragEnd } = useClientNoteOrder(data && data.notes.map(n => n.id))

  if (data === undefined || orderedNoteIds === undefined) {
    return null
  }

  const notesInOrder: DragDropList = orderedNoteIds
    .map(noteId => data.notes.find(n => n.id === noteId))
    .filter(nonNullable)
    .map(note => {
      return { id: note.id, title: note.title }
    })

  return (
    <div className={classes.root}>
      <Typography variant="h3">All Notes</Typography>
      <DragDropComponent dataList={notesInOrder} onDragEnd={onDragEnd} />
    </div>
  )
}
