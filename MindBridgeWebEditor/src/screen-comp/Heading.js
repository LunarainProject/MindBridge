import React from "react";
import "./Heading.css";

import EditIcon from "@material-ui/icons/Edit";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import SaveIcon from "@material-ui/icons/Save";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import {
  IconButton,
  Typography,
  TextField,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  Snackbar,
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
  Button,
  Input,
} from "@material-ui/core";
import { ThumbsUpDownOutlined } from "@material-ui/icons";

export default class Heading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popup_open: false,
      snackbar_open: false,
      snackbar_message: "",
      edit_show: false,
      title_edit: false,
      editor_title: "",
    };

    this.anchorRef = React.createRef();

    this.handleSave = () => {
      this.props.savePackage(this.props.package);
      this.snackbarOpen('저장되었습니다.', 600);
    }

    this.handleToggle = () => {
      this.setState({ popup_open: !this.state.popup_open });
    };

    this.handleClose = (event) => {
      this.setState({ popup_open: false });
    };

    this.handleMouseHover = (hover) => {
      this.setState({ edit_show: hover });
    };

    this.handleEdit = () => {
      this.setState({
        title_edit: true,
        editor_title: this.props.package.package_title,
      });
    };

    this.handleEditChange = (e) => {
      this.setState({ editor_title: e.target.value });
    };

    this.handleSubmit = () => {
      console.log('submit')
      this.props.setPackageTitle(this.state.editor_title);
      this.setState({ edit_show: false, title_edit: false, editor_title: "" });
    };

    this.snackbarOpen = (message, duration) => {
      this.setState({ snackbar_open: true, snackbar_message: message });
      setTimeout(() => {
        this.setState({ snackbar_open: false, message: "" });
      }, duration);
    };

    this.exportData = () => {
      const element = document.createElement("a");
      const file = new Blob([JSON.stringify(this.props.package)], {
        type: "text/plain",
      });
      element.href = URL.createObjectURL(file);
      element.download = this.props.package.package_title + ".survey";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    };

    this.loadData = (event) => {
      const files = event.target.files;
      if (files.length === 0) {
        this.snackbarOpen("불러오기에 실패했습니다.", 600);
        return;
      }

      const file = files[0];

      file.text().then((txt) => {
        let data = {};
        try {
          data = JSON.parse(txt);
          this.props.forceSetState({ package: data });
          this.props.state_store.clearUndo();
        } catch (e) {
          this.snackbarOpen("잘못된 파일입니다.", 600);
          console.log(e);
        }
      });
    };

    this.handleKeyEditor = (e) => {
      if(e.key === 'Enter') {
        this.handleSubmit();
      }
    }
  }

  render() {
    return (
      <Paper elevation={2} className="heading">
        <Snackbar
          open={this.state.snackbar_open}
          message={this.state.snackbar_message}
          key="undo"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
        <div
          onMouseEnter={() => {
            this.handleMouseHover(true);
          }}
          onMouseLeave={() => {
            this.handleMouseHover(false);
          }}
          className="flex-row-container"
        >
          <CheckCircleOutlineIcon
            color="primary"
            fontSize="large"
            style={{ marginLeft: "5px", marginRight: "5px" }}
          />
          {this.state.title_edit ? (
            <div
              noValidate
              autoComplete="off"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Input
                value={this.state.editor_title}
                inputProps={{ "aria-label": "description" }}
                onChange={this.handleEditChange}
                onKeyPress={this.handleKeyEditor}
                onBlur={this.handleSubmit}
                autoFocus={true}
              />
              <Button
                color="primary"
                onClick={this.handleSubmit}
                style={{ marginLeft: "4px" }}
              >
                수정
              </Button>
            </div>
          ) : (
            <div
              className="flex-row-container"
            >
              <Typography variant="h5" component="h5">
                {this.props.package.package_title}
              </Typography>
              <IconButton
                onClick={this.handleEdit}
                style={{
                  visibility: this.state.edit_show ? "visible" : "hidden",
                }}
              >
                <EditIcon color="action" />
              </IconButton>
            </div>
          )}
        </div>
        <div className="flex-row-container">
          <IconButton
            onClick={this.handleSave}
          >
            <SaveIcon />
          </IconButton>
          <IconButton
            ref={this.anchorRef}
            aria-controls={this.state.popup_open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
            <MoreVertIcon />
          </IconButton>
          <Popper
            open={this.state.popup_open}
            anchorEl={this.anchorRef.current}
            role={undefined}
            transition
            disablePortal
            className="popper"
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper elevation={3}>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList
                      autoFocusItem={this.state.popup_open}
                      id="menu-list-grow"
                    >
                      <MenuItem
                        onClick={() => {
                          this.handleClose();
                          this.props.undo();
                          this.snackbarOpen(
                            "문서를 이전 상태로 되돌렸습니다.",
                            600
                          );
                        }}
                        disabled={!this.props.state_store.isUndoable()}
                      >
                        <ListItemIcon>
                          <UndoIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>되돌리기</ListItemText>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          this.handleClose();
                          this.props.redo();
                          this.snackbarOpen(
                            "되돌리기를 수행한 편집을 다시 실행했습니다.",
                            600
                          );
                        }}
                        disabled={!this.props.state_store.isRedoable()}
                      >
                        <ListItemIcon>
                          <RedoIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>다시 실행</ListItemText>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          this.handleClose();
                          this.exportData();
                        }}
                      >
                        <ListItemIcon>
                          <SaveAltIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>내보내기</ListItemText>
                      </MenuItem>
                      <input
                        accept=".survey"
                        id="contained-button-file"
                        type="file"
                        style={{ opacity: 0, position: "absolute" }}
                        onChange={this.loadData}
                      />
                      <label htmlFor="contained-button-file">
                        <MenuItem style={{ flexDirection: "row" }}>
                          <ListItemIcon>
                            <FolderOpenIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>불러오기</ListItemText>
                        </MenuItem>
                      </label>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Paper>
    );
  }
}
