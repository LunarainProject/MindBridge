import React from "react";
import "./PageTitle.css";

import FileCopyIcon from '@material-ui/icons/FileCopy';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button, Typography, Input, IconButton, Snackbar } from "@material-ui/core";

export default class PageTitle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit_show: false,
      title_edit: "",
      snackbar_open: false,
      snackbar_message: "",
    };

    this.handleMouseHover = (hover) => {
      this.setState({ edit_show: hover });
    };

    this.handleEdit = () => {
      this.setState({
        edit_show: false,
        title_edit: true,
        editor_title: this.props.page.page_title,
      });
    };

    this.handleEditChange = (e) => {
      this.setState({ editor_title: e.target.value });
    };

    this.handleSubmit = () => {
      console.log("submit");
      this.props.setPageTitle(this.state.editor_title, this.props.ind);
      this.setState({ edit_show: false, title_edit: false, editor_title: "" });
    };

    this.handleKeyEditor = (e) => {
      if (e.key === "Enter") {
        this.handleSubmit();
      }
    };

    this.snackbarOpen = (message, duration) => {
      this.setState({ snackbar_open: true, snackbar_message: message });
      setTimeout(() => {
        this.setState({ snackbar_open: false, message: "" });
      }, duration);
    };

    this.handleDelete = () => {
      this.props.deletePage(this.props.ind);
    };

    this.handleDublicate = () => {
      let new_page_list = [];
      this.props.package.page_list.forEach((page, page_ind) => {
        new_page_list.push(page);
        if(page_ind === this.props.ind) new_page_list.push(page);
      })

      this.props.forceSetState({ package: { ...this.props.package, page_list: new_page_list }})
      this.snackbarOpen('페이지가 복제되었습니다.', 600);
    };
  }

  render() {
    return (
      <div
        onMouseEnter={() => {
          this.handleMouseHover(true);
        }}
        onMouseLeave={() => {
          this.handleMouseHover(false);
        }}
        className="flex-row-container"
        style={{
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Snackbar
          open={this.state.snackbar_open}
          message={this.state.snackbar_message}
          key="undo"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
        <div
          style={this.state.title_edit ? { width: "100%" } : {}}
          onClick={(event) => event.stopPropagation()}
          onFocus={(event) => event.stopPropagation()}
        >
          {this.state.title_edit ? (
            <div
              noValidate
              autoComplete="off"
              className="flex-row-container"
              style={{ width: "100%" }}
            >
              <Input
                value={this.state.editor_title}
                inputProps={{ "aria-label": "description" }}
                onChange={this.handleEditChange}
                onKeyPress={this.handleKeyEditor}
                autoFocus={true}
                fontSize="small"
                fullWidth="100%"
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
            <div className="flex-row-container">
              <Typography>{this.props.page.page_title}</Typography>

              <IconButton
                onClick={this.handleEdit}
                style={{
                  visibility: this.state.edit_show ? "visible" : "hidden",
                }}
              >
                <EditIcon color="action" size="small" />
              </IconButton>
            </div>
          )}
        </div>
        <div className="flex-row-container">
          <IconButton
            style={ this.props.expanded ? {} : {display: "none"}}
            onClick={(event) => {
              event.stopPropagation();
              this.handleDublicate();
            }}
            onFocus={(event) => event.stopPropagation()}
          >
            <FileCopyIcon color="action" size="small" />
          </IconButton>
          <IconButton
            style={ this.props.expanded ? {} : {display: "none"}}
            onClick={(event) => {
              event.stopPropagation();
              this.handleDelete();
            }}
            onFocus={(event) => event.stopPropagation()}
          >
            <DeleteIcon color="action" size="small" />
          </IconButton>
        </div>
      </div>
    );
  }
}
