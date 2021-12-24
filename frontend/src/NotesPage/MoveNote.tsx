import { createStyles, makeStyles, Theme } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column"
    },
    icon: {
      cursor: "pointer",
      "&:hover": {
        borderRadius: "5px",
        background: "lavender"
      }
    }
  })
);

interface Props {
  id: string;
  onUpClick: (id: string) => void;
  onDownClick: (id: string) => void;
}

export const MoveNote: React.FC<Props> = ({ id, onUpClick, onDownClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ArrowDropUpIcon
        className={classes.icon}
        onClick={() => onUpClick(id)}
      ></ArrowDropUpIcon>
      <ArrowDropDownIcon
        className={classes.icon}
        onClick={() => onDownClick(id)}
      ></ArrowDropDownIcon>
    </div>
  );
};
