import React from "react";
import "./Question.css";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import {
  Button,
  Typography,
  Paper,
  Input,
  IconButton,
  Select,
  MenuItem,
  Radio,
} from "@material-ui/core";

export default class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit_show: false,
      title_edit: "",
    };

    this.handleTypeChange = (e) => {
      this.props.setQuestionType(
        e.target.value,
        this.props.page_ind,
        this.props.question_ind
      );
    };

    this.handleMouseHover = (hover) => {
      this.setState({ edit_show: hover });
    };

    this.handleEditChange = (e) => {
      this.setState({ editor_title: e.target.value });
    };

    this.handleSubmit = () => {
      this.props.setQuestionTitle(
        this.state.editor_title,
        this.props.page_ind,
        this.props.question_ind
      );
      this.setState({ edit_show: false, title_edit: false, editor_title: "" });
    };
    this.handleEdit = () => {
      this.setState({
        edit_show: false,
        title_edit: true,
        editor_title: this.props.question.question_title,
      });
    };
    this.handleKeyEditor = (e) => {
      if (e.key === "Enter") {
        this.handleSubmit();
      }
    };

    this.handleDelete = () => {
      this.props.deleteQuestion(this.props.page_ind, this.props.question_ind);
    };

    this.charType = (type) => {
      switch (type) {
        case 1:
          return <ChartType1 {...this.props} />;
        case 2:
          return <ChartType2 {...this.props} />;
        default:
          return;
      }
    };
  }

  render() {
    return (
      <Paper variant="outlined" className="question-container">
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
          <div style={this.state.title_edit ? { width: "100%" } : {}}>
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
                <Typography>{this.props.question.question_title}</Typography>
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
          <div class="flex-center">
            <Select
              value={this.props.question.type}
              onChange={this.handleTypeChange}
              displayEmpty
            >
              <MenuItem value="" disabled>
                문항 타입 선택
              </MenuItem>
              <MenuItem value={1}>연결 선택지</MenuItem>
              <MenuItem value={2}>단순 선택지</MenuItem>
            </Select>
            <IconButton
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
        {this.charType(this.props.question.type)}
      </Paper>
    );
  }
}

class ChartType1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      choice_edit: "",
      choice_edit_id: -1,

      couple_edit: "",
      couple_edit_id: -1,
    };

    this.handleButtonAdd = () => {
      let string_list = this.props.question.string_list;
      if (string_list.length < 5) {
        string_list.push("새 항목");
      }

      this.props.setStringList(
        string_list,
        this.props.page_ind,
        this.props.question_ind
      );
    };

    this.handleButtonRemove = () => {
      let string_list = this.props.question.string_list;
      if (string_list.length > 2) {
        string_list.pop();
      }

      this.props.setStringList(
        string_list,
        this.props.page_ind,
        this.props.question_ind
      );
    };

    /* Couple Edit Handling */
    this.handleCoupleEditChange = (e) => {
      this.setState({ couple_edit: e.target.value });
    };

    this.handleCoupleSubmit = () => {
      let couple_list = this.props.question.couple_list || [];
      couple_list[this.state.couple_edit_id] = this.state.couple_edit;

      this.props.setCoupleList(
        couple_list,
        this.props.page_ind,
        this.props.question_ind
      );
      this.setState({ couple_edit: "", couple_edit_id: -1 });
    };

    this.handleCoupleKeyEditor = (e) => {
      if (e.key === "Enter") {
        this.handleCoupleSubmit();
      }
    };

    /* Choice Edit Handling */
    this.handleEditChange = (e) => {
      this.setState({ choice_edit: e.target.value });
    };

    this.handleSubmit = () => {
      let string_list = this.props.question.string_list;
      string_list[this.state.choice_edit_id - 1] = this.state.choice_edit;

      this.props.setStringList(
        string_list,
        this.props.page_ind,
        this.props.question_ind
      );
      this.setState({ choice_edit: "", choice_edit_id: -1 });
    };

    this.handleKeyEditor = (e) => {
      if (e.key === "Enter") {
        this.handleSubmit();
      }
    };
  }

  componentDidMount() {
    // if (this.props.question_ind === 0)
    //   this.props.setStringList(
    //     ["ABC", "DEF", "GHI", "JKL"],
    //     this.props.page_ind,
    //     this.props.question_ind
    //   );
  }

  render() {
    this.draw_stringlist = [" "];
    if (this.props.question.string_list) {
      this.draw_stringlist = this.draw_stringlist.concat(
        this.props.question.string_list
      );
    }

    return (
      <div className="grid-container">
        <div
          className="grid-inner"
          style={{
            width: "100%",
            maxWidth: 150 * this.draw_stringlist.length,
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            {this.draw_stringlist.map((val, ind) => (
              <div
                className="flex-center"
                style={ind !== 0 ? { width: "100%" } : { width: "30%" }}
                key={ind}
              >
                {ind === 0 ? (
                  <div />
                ) : this.state.choice_edit_id === ind ? (
                  <Input
                    value={this.state.choice_edit}
                    inputProps={{ "aria-label": "description" }}
                    onChange={this.handleEditChange}
                    onKeyPress={this.handleKeyEditor}
                    autoFocus={true}
                    fontSize="small"
                    fullWidth="100%"
                  />
                ) : (
                  <Button
                    onClick={() => {
                      this.setState({ choice_edit_id: ind, choice_edit: val });
                    }}
                  >
                    {val}
                  </Button>
                )}
              </div>
            ))}
          </div>
          {[0, 1].map((couple_val, couple_ind) => (
            <div
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              {this.draw_stringlist.map((val, ind) => (
                <div
                  className="flex-center"
                  style={ind !== 0 ? { width: "100%" } : { width: "30%" }}
                  key={ind}
                >
                  {ind === 0 ? (
                    this.state.couple_edit_id === couple_ind ? (
                      <Input
                        value={this.state.couple_edit}
                        inputProps={{ "aria-label": "description" }}
                        onChange={this.handleCoupleEditChange}
                        onKeyPress={this.handleCoupleKeyEditor}
                        autoFocus={true}
                        fontSize="small"
                        fullWidth="100%"
                      />
                    ) : (
                      <Button
                        onClick={() => {
                          this.setState({
                            couple_edit_id: couple_ind,
                            couple_edit:
                            this.props.question.couple_list? this.props.question.couple_list[couple_ind] || ["남편", "아내"][couple_ind] : ["남편", "아내"][couple_ind],
                          });
                        }}
                      >
                        {this.props.question.couple_list? this.props.question.couple_list[couple_ind] || ["남편", "아내"][couple_ind] : ["남편", "아내"][couple_ind]}
                      </Button>
                    )
                  ) : (
                    <Radio disabled />
                  )}
                </div>
              ))}
            </div>
          ))}

          <div className="flex-center">
            <Button
              color="primary"
              style={{ marginLeft: "5px", marginRight: "5px" }}
              onClick={this.handleButtonAdd}
            >
              <AddIcon fontSize="small" />
              <Typography>항목 추가</Typography>
            </Button>
            <Button
              color="primary"
              style={{ marginLeft: "5px", marginRight: "5px" }}
              onClick={this.handleButtonRemove}
            >
              <RemoveIcon fontSize="small" />
              <Typography>항목 제거</Typography>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

class ChartType2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      choice_edit: "",
      choice_edit_id: -1,
    }

    this.handleButtonAdd = () => {
      let string_list = this.props.question.string_list;
      if (string_list.length < 5) {
        string_list.push("새 항목");
      }

      this.props.setStringList(
        string_list,
        this.props.page_ind,
        this.props.question_ind
      );
    };

    this.handleButtonRemove = () => {
      let string_list = this.props.question.string_list;
      if (string_list.length > 2) {
        string_list.pop();
      }

      this.props.setStringList(
        string_list,
        this.props.page_ind,
        this.props.question_ind
      );
    };

    /* Choice Edit Handling */
    this.handleEditChange = (e) => {
      this.setState({ choice_edit: e.target.value });
    };

    this.handleSubmit = () => {
      let string_list = this.props.question.string_list;
      string_list[this.state.choice_edit_id] = this.state.choice_edit;

      this.props.setStringList(
        string_list,
        this.props.page_ind,
        this.props.question_ind
      );
      this.setState({ choice_edit: "", choice_edit_id: -1 });
    };

    this.handleKeyEditor = (e) => {
      if (e.key === "Enter") {
        this.handleSubmit();
      }
    };
  }

  render() {
    this.draw_stringlist = this.props.question.string_list;

    return (
      <div className="grid-container">
        <div
          className="grid-inner"
          style={{
            width: "100%",
            maxWidth: 150 * this.draw_stringlist.length,
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            {this.draw_stringlist.map((val, ind) => (
              <div className="flex-center" style={{ width: "100%" }} key={ind}>
                {this.state.choice_edit_id === ind ? (
                  <Input
                    value={this.state.choice_edit}
                    inputProps={{ "aria-label": "description" }}
                    onChange={this.handleEditChange}
                    onKeyPress={this.handleKeyEditor}
                    autoFocus={true}
                    fontSize="small"
                    fullWidth="100%"
                  />
                ) : (
                  <Button
                    onClick={() => {
                      this.setState({ choice_edit_id: ind, choice_edit: val });
                    }}
                  >
                    {val}
                  </Button>
                )}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            {this.draw_stringlist.map((val, ind) => (
              <div className="flex-center" style={{ width: "100%" }} key={ind}>
                <Radio disabled />
              </div>
            ))}
          </div>

          <div className="flex-center">
            <Button
              color="primary"
              style={{ marginLeft: "5px", marginRight: "5px" }}
              onClick={this.handleButtonAdd}
            >
              <AddIcon fontSize="small" />
              <Typography>항목 추가</Typography>
            </Button>
            <Button
              color="primary"
              style={{ marginLeft: "5px", marginRight: "5px" }}
              onClick={this.handleButtonRemove}
            >
              <RemoveIcon fontSize="small" />
              <Typography>항목 제거</Typography>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
