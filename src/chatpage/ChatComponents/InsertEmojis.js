import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import "emoji-mart/css/emoji-mart.css";
import { Picker} from "emoji-mart";
import MoodIcon from "@material-ui/icons/Mood";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));



export default function InsertEmojis({ setInput }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    console.log("InsertEmojis mounting!")
    return (
      console.log("InsertEmojis unmounting!")
    )
  },[])
  return (
    <div>
      <MoodIcon
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      />

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Picker
          onSelect={(e) => {
            // let emoji = e.native
            setInput((input) => input + e.native);
          }}
        />
      </StyledMenu>
    </div>
  );
}
