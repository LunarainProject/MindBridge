import React from "react";
import "./App.css";
import { connect } from "react-redux";

import Heading from "./screen-comp/Heading";
import Screen from "./screen-comp/Screen";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {    

    this.props.setPackageTitle('Mind Bridge Survey Editor');

    let pack = {};
    try {
      pack = this.props.loadPackage();

    } catch(e) {
      console.log(e);
    }
    
    if(pack) {
      const load_state = { package: pack };
      this.props.forceSetState(load_state);
    }

    this.props.state_store.clearUndo();
  }

  render() {
    return (
      <div className="app">
        <Heading {...this.props} />
        <Screen {...this.props} style={{ marginTop: "70px"}}/>
      </div>
    );
  }
}

// Add new redux-managed varriable here
function mapStateToProps(state) {
  console.log("state");
  return {
    package: state.package,
    state_store: state_store,
  };
}

//State store
class StateStore {
  constructor() {
    this.state_list = [];
    this.current_ind = -1;
    this.max_ind = -1;
    this.min_ind = -1;
    this.undoable = false;
    this.redoable = false;
  }

  getCurrentState = () => this.state_list[this.current_ind];

  isUndoable = () => this.undoable;
  isRedoable = () => this.redoable;

  push(state) {
    if(this.current_ind !== this.max_ind) this.clearRedo();
    this.current_ind++;
    this.max_ind++;
    this.state_list[this.current_ind] = state;
    
    this.undoable = true;
    this.redoable = false;
  }
  
  undo() {
    this.current_ind--;
    if(this.current_ind === this.min_ind) {
      this.undoable = false;
    }
    this.redoable = true;
  }

  redo() {
    this.current_ind++;
    if(this.current_ind === this.max_ind) {
      this.redoable = false;
    }
    this.undoable = true;
  }

  clearUndo() {
    this.min_ind = this.current_ind;
    this.undoable = false;
  }

  clearRedo() {
    this.max_ind = this.current_ind;
    this.redoable = false;
  }
} 

const state_store = new StateStore();

const initialState = { 
  package: {}
}

//Reducer
export function reducer(state = initialState, action) {
  console.log("reduce");
  console.log(JSON.stringify(state.package));

  const prev_state = state;

  console.log(state_store);

  //change state here
  switch (action.type) {
    case "SETPACKAGETITLE":
      state = {
        ...state,
        package: { ...state.package, package_title: action.package_title },
      };
      break;
    case "SETPAGETITLE":
      //check if the page exists
      if (state.package.page_list[action.page_ind] !== undefined) {
        let new_page_list = state.package.page_list.map((page, ind) =>
          ind === action.page_ind
            ? { ...page, page_title: action.page_title }
            : page
        );
        state = {
          ...state,
          package: { ...state.package, page_list: new_page_list },
        };
      }
      break;
    case "SETQUESTIONTITLE":
      //check if the page exists
      if (state.package.page_list[action.page_ind] !== undefined) {
        //check if the question exists
        if (
          state.package.page_list[action.page_ind].question_list[action.question_ind] !==
          undefined
        ) {
          let new_page_list = state.package.page_list.map((page, page_ind) => {
            if (page_ind === action.page_ind) {
              let new_question_list = page.question_list.map((question, question_ind) =>
                question_ind === action.question_ind
                  ? { ...question, question_title: action.question_title }
                  : question
              );
              return { ...page, question_list: new_question_list };
            } else {
              return page;
            }
          });
          state = {
            ...state,
            package: { ...state.package, page_list: new_page_list },
          };
        }
      }
      break;

    case "SETQUESTIONTYPE":
      //check if the page exists
      if (state.package.page_list[action.page_ind] !== undefined) {
        //check if the question exists
        if (
          state.package.page_list[action.page_ind].question_list[action.question_ind] !==
          undefined
        ) {
          let new_page_list = state.package.page_list.map((page, page_ind) => {
            if (page_ind === action.page_ind) {
              let new_question_list = page.question_list.map((question, question_ind) =>
                question_ind === action.question_ind
                  ? { ...question, type: action.question_type }
                  : question
              );
              return { ...page, question_list: new_question_list };
            } else {
              return page;
            }
          });
          state = {
            ...state,
            package: { ...state.package, page_list: new_page_list },
          };
        }
      }
      break;

    case "ADDPAGE":
      if (state.package.page_list === undefined) {
        state = {
          ...state,
          package: { ...state.package, page_list: [action.page] },
        };
      } else {
        let new_page_list = state.package.page_list.concat(action.page);
        state = {
          ...state,
          package: { ...state.package, page_list: new_page_list },
        };
      }
      break;

    case "ADDQUESTION":
      //check if the page exists
      if (state.package.page_list[action.page_ind] !== undefined) {
        let new_question_list = [];
        let new_page_list = [];

        if (
          state.package.page_list[action.page_ind].question_list === undefined
        ) {
          new_question_list = [action.question];
        } else {
          new_question_list = state.package.page_list[
            action.page_ind
          ].question_list.concat(action.question);
        }

        new_page_list = state.package.page_list.map((page, ind) =>
          ind === action.page_ind
            ? { ...page, question_list: new_question_list }
            : page
        );
        state = {
          ...state,
          package: { ...state.package, page_list: new_page_list },
        };
      }
      break;

    case "DELPAGE":
      if (state.package.page_list !== undefined) {
        let new_page_list = [];
        state.package.page_list.forEach((page, ind) => {
          if (ind === action.page_ind) {
            return;
          } else {
            new_page_list.push(page);
          }
        });

        state = {
          ...state,
          package: { ...state.package, page_list: new_page_list },
        };
      }
      break;

    case "DELQUESTION":
      if (state.package.page_list !== undefined) {
        if (state.package.page_list[action.page_ind] !== undefined) {
          let new_page_list = [];
          state.package.page_list.forEach((page, ind) => {
            if (ind === action.page_ind) {
              let new_question_list = [];
              state.package.page_list[action.page_ind].question_list.forEach(
                (question, ind) => {
                  if (ind === action.question_ind) {
                    return;
                  } else {
                    new_question_list.push(question);
                  }
                }
              );
              new_page_list.push({ ...page, question_list: new_question_list });
            } else {
              new_page_list.push(page);
            }
          });

          state = {
            ...state,
            package: { ...state.package, page_list: new_page_list },
          };
        }
      }
      break;

    case "SETSTRINGLIST":
      //check if the page exists
      if (state.package.page_list[action.page_ind] !== undefined) {
        //check if the question exists
        if (
          state.package.page_list[action.page_ind].question_list[action.question_ind] !==
          undefined
        ) {
          let new_page_list = state.package.page_list.map((page, page_ind) => {
            if (page_ind === action.page_ind) {
              let new_question_list = page.question_list.map((question, question_ind) =>
                question_ind === action.question_ind
                  ? { ...question, string_list: action.string_list }
                  : question
              );
              return { ...page, question_list: new_question_list };
            } else {
              return page;
            }
          });
          state = {
            ...state,
            package: { ...state.package, page_list: new_page_list },
          };
        }
      }
      break;

      case "SETCOUPLELIST":
        //check if the page exists
        if (state.package.page_list[action.page_ind] !== undefined) {
          //check if the question exists
          if (
            state.package.page_list[action.page_ind].question_list[action.question_ind] !==
            undefined
          ) {
            let new_page_list = state.package.page_list.map((page, page_ind) => {
              if (page_ind === action.page_ind) {
                let new_question_list = page.question_list.map((question, question_ind) =>
                  question_ind === action.question_ind
                    ? { ...question, couple_list: action.couple_list }
                    : question
                );
                return { ...page, question_list: new_question_list };
              } else {
                return page;
              }
            });
            state = {
              ...state,
              package: { ...state.package, page_list: new_page_list },
            };
          }
        }
        break;

    //force set state
    case "FORCESETSTATE":
      state = action.state;
      break;
    
    // UNDOREDO do not push to the state_store
    case "UNDO":
      if(state_store.isUndoable()) {
        state_store.undo();
        state = state_store.getCurrentState();
      }
      return state;

    case "REDO":
      if(state_store.isRedoable()) {
        state_store.redo();
        state = state_store.getCurrentState();
      }
      return state;

    default:
      break;
  }

  //check if there is an update
  if(prev_state !== state) {
    state_store.push(state);
  }

  console.log(state);

  return state;
}

// Action
const mapActionToProps = (dispatch) => {
  console.log("Action");

  return {
    setPackageTitle: (package_title) => {
      dispatch({
        type: "SETPACKAGETITLE",
        package_title,
      });
    },
    setPageTitle: (page_title, page_ind) => {
      dispatch({
        type: "SETPAGETITLE",
        page_title,
        page_ind,
      });
    },
    setQuestionTitle: (question_title, page_ind, question_ind) => {
      dispatch({
        type: "SETQUESTIONTITLE",
        question_title,
        page_ind,
        question_ind,
      });
    },
    setQuestionType: (question_type, page_ind, question_ind) => {
      dispatch({
        type: "SETQUESTIONTYPE",
        question_type,
        page_ind,
        question_ind,
      });
    },
    addPage: (page) => {
      dispatch({
        type: "ADDPAGE",
        page,
      });
    },
    deletePage: (page_ind) => {
      dispatch({
        type: "DELPAGE",
        page_ind,
      });
    },
    addQuestion: (question, page_ind) => {
      dispatch({
        type: "ADDQUESTION",
        page_ind,
        question,
      });
    },
    deleteQuestion: (page_ind, question_ind) => {
      dispatch({
        type: "DELQUESTION",
        page_ind: page_ind,
        question_ind: question_ind,
      });
    },

    setStringList: (string_list, page_ind, question_ind) => {
      dispatch({
        type: "SETSTRINGLIST",
        string_list,
        page_ind,
        question_ind,
      })
    },
    setCoupleList: (couple_list, page_ind, question_ind) => {
      dispatch({
        type: "SETCOUPLELIST",
        couple_list,
        page_ind,
        question_ind,
      })
    },
    forceSetState: (state) => {
      dispatch({
        type: "FORCESETSTATE",
        state: state
      })
    },

    undo: () => {
      dispatch({
        type: "UNDO",
      })
    },

    redo: () => {
      dispatch({
        type: "REDO",
      })
    },

    //global function
    savePackage: (pack) => {
      localStorage.setItem('package', JSON.stringify(pack));
    },

    loadPackage: () => {
      return JSON.parse(localStorage.getItem('package'));
    },
  };
};

export default connect(mapStateToProps, mapActionToProps)(App);
