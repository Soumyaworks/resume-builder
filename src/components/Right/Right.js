import React, { useContext } from "react";
import Paper from "./Paper/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { green, pink } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import ClearIcon from "@material-ui/icons/Clear";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "@material-ui/core";
import { ResumeContext } from "../../contexts/ResumeContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    "& > *": {
      margin: 0,
    },
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
    margin: 10,
  },
  green: {
    color: "#fff",
    backgroundColor: green[500],
    margin: 10,
  },
}));

function Right() {
  const { setContent } = useContext(ResumeContext);
  const classes = useStyles();
  const history = useHistory();
  const handleDeleteDate = (event) => {
    event.preventDefault();
    localStorage.clear();
    setContent({
      header: {},
      professional: { desc1: ["", "", ""], desc2: ["", "", ""] },
      education: {},
      additional: [],
    });
  };
  const handleSaveToPDF = (event) => {
    event.preventDefault();
    window.print();
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    history.replace("/login");
  };

  return (
    <div className="right" style={{ position: "relative" }}>
      <button
        onClick={handleLogout}
        style={{
          position: "absolute",
          right: 10,
          height: "30px",
          width: "100px",
        }}
      >
        Logout
      </button>
      <div className={classes.root}>
        <Link href="#" onClick={handleDeleteDate}>
          <Tooltip title="Delete All Data" placement="right">
            <Avatar className={classes.pink}>
              <ClearIcon />
            </Avatar>
          </Tooltip>
        </Link>
        <Link href="#" onClick={handleSaveToPDF}>
          <Tooltip title="Save to PDF" placement="right">
            <Avatar className={classes.green}>
              <PictureAsPdfIcon />
            </Avatar>
          </Tooltip>
        </Link>
      </div>
      <Paper />
    </div>
  );
}

export default Right;
