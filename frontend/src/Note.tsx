import { gql, useMutation } from "@apollo/client";
import {
  Chip,
  createStyles,
  InputLabel,
  makeStyles,
  Paper,
  TextField,
  Theme
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, { useCallback } from "react";
import { graphql } from "./types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2),
      margin: theme.spacing(3, 0)
    },
    input: {
      margin: theme.spacing(3, 0)
    },
    tag: {
      margin: theme.spacing(0.5)
    }
  })
);

interface Props {
  id: string;
  title: string;
  content: string;
}

const NOTE_TITLE_MUTATION = gql`
  mutation NoteTitleMutation($id: ID!, $title: String!) {
    updateNoteTitle(id: $id, title: $title) {
      id
      title
      content
    }
  }
`;

const NOTE_CONTENT_MUTATION = gql`
  mutation NoteContentMutation($id: ID!, $content: String!) {
    updateNoteContent(id: $id, content: $content) {
      id
      title
      content
    }
  }
`;

export const Note: React.FC<Props> = ({ id, title, content }) => {
  const classes = useStyles();
  const [updateNoteTitleMutation] = useMutation<
    graphql.NoteTitleMutation,
    graphql.NoteTitleMutationVariables
  >(NOTE_TITLE_MUTATION);
  const [updateNoteContentMutation] = useMutation<
    graphql.NoteContentMutation,
    graphql.NoteContentMutationVariables
  >(NOTE_CONTENT_MUTATION);

  const handleTitleChange = useCallback(
    async e => {
      const title = e.target.value;
      await updateNoteTitleMutation({
        variables: {
          id,
          title
        }
      });
    },
    [id, updateNoteTitleMutation]
  );

  const handleContentChange = useCallback(
    async e => {
      const content = e.target.value;
      await updateNoteContentMutation({
        variables: {
          id,
          content
        }
      });
    },
    [id, updateNoteContentMutation]
  );

  return (
    <Paper className={classes.root}>
      <Typography variant="h3">Note</Typography>
      <TextField
        label={"Title"}
        className={classes.input}
        defaultValue={title}
        onBlur={handleTitleChange}
        fullWidth
      />
      <TextField
        label={"Content"}
        className={classes.input}
        defaultValue={content}
        onBlur={handleContentChange}
        fullWidth
        multiline
      />
      <div>
        <InputLabel shrink>Labels</InputLabel>
        <Chip className={classes.tag} label={"Hardcoded"} onDelete={() => {}} />
        <Chip className={classes.tag} label={"Tags"} onDelete={() => {}} />
        <Chip
          className={classes.tag}
          label={"Not Persisted on Server"}
          onDelete={() => {}}
        />
      </div>
    </Paper>
  );
};
