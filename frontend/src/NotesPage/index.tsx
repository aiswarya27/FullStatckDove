import { gql, useQuery } from "@apollo/client";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import { graphql } from "../types";
import { nonNullable } from "../util";
import { NotePreview } from "./NotePreview";
import { useClientNoteOrder } from "./useClientNoteOrder";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(3, 0)
    }
  })
);

const NOTES_QUERY = gql`
  query NotesQuery {
    notes {
      id
      title
    }
  }
`;

export const NotesPage: React.FC = () => {
  const classes = useStyles();
  const { data } = useQuery<graphql.NotesQuery>(NOTES_QUERY);
  const { orderedNoteIds, moveNoteUp, moveNoteDown } = useClientNoteOrder(
    data && data.notes.map(n => n.id)
  );

  if (data === undefined || orderedNoteIds === undefined) {
    return null;
  }

  const notesInOrder = orderedNoteIds
    .map(noteId => data.notes.find(n => n.id === noteId))
    .filter(nonNullable);

  return (
    <div className={classes.root}>
      <Typography variant="h3">All Notes</Typography>
      {notesInOrder.map(note => (
        <NotePreview
          id={note.id}
          key={note.id}
          title={note.title}
          onMoveNoteUp={moveNoteUp}
          onMoveNoteDown={moveNoteDown}
        />
      ))}
    </div>
  );
};
