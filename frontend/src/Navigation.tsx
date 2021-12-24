import { MenuItem } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import NotesIcon from "@material-ui/icons/Notes";
import React from "react";
import { Link } from "react-router-dom";

export const Navigation: React.FC = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Tiny Dovetail
          </Typography>
          <MenuItem component={Link} to={"/notes"}>
            <NotesIcon />
            All Notes
          </MenuItem>
        </Toolbar>
      </AppBar>
    </>
  );
};
