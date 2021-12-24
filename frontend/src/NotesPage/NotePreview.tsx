import { createStyles, makeStyles, Paper, Theme } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { MoveNote } from "./MoveNote";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2),
      margin: theme.spacing(3, 0),
      display: "flex",
      justifyContent: "space-between"
    }
  })
);

interface Props {
  id: string;
  title: string;
  onMoveNoteUp: (id: string) => void;
  onMoveNoteDown: (id: string) => void;
}

export const NotePreview: React.FC<Props> = ({
  id,
  title,
  onMoveNoteUp,
  onMoveNoteDown
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Link component={RouterLink} to={`/notes/${id}`}>
        {title}
      </Link>
      <MoveNote id={id} onUpClick={onMoveNoteUp} onDownClick={onMoveNoteDown} />
    </Paper>
  );
};
