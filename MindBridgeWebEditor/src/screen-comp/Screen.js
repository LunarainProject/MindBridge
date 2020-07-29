import React from "react";
import "./Screen.css";

import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
  Paper,
} from "@material-ui/core";

import PageTitle from './draw-comp/PageTitle';
import Question from './draw-comp/Question';

export default class Screen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };

    this.handleChange = (panel) => (event, isExpanded) => {
      this.setState({ expanded: isExpanded ? panel : false });
    };
  }

  render() {
    return (
      <div className="screen" style={this.props.style}>
        {this.props.package.page_list === undefined ? (
          <div />
        ) : (
          <div className="accordion-container">
            {this.props.package.page_list.map((page, page_ind) => (
              <Accordion
                expanded={this.state.expanded === "panel" + page_ind}
                onChange={this.handleChange("panel" + page_ind)}
                key={page_ind}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <PageTitle page={page} ind={page_ind} expanded={this.state.expanded === "panel" + page_ind} {...this.props} />
                </AccordionSummary>
                <AccordionDetails style={{ flexDirection: "column" }}>
                  {page.question_list.map((question, question_ind) => (
                    <Question {...this.props} page_ind={page_ind} question_ind={question_ind} question={question} key={question_ind}/>
                  ))}

                  <div className="add-container">
                    <Button
                      onClick={() => {
                        this.props.addQuestion({
                          question_title: "새로운 문항",
                          type: 1,
                          string_list: ["항목1", "항목2"],
                          couple_list: ["남편", "아내"],
                        }, page_ind);
                      }}
                      color="primary"
                    >
                      <AddIcon color="primary" fontSize="small" />
                      <Typography>
                        새 문항 만들기
                      </Typography>
                    </Button>
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        )}

        <div className="add-container">
          <Button
            onClick={() => {
              this.props.addPage({
                page_title: "새로운 페이지",
                question_list: [
                  {
                    question_title: "새로운 문항",
                    type: 1,
                    string_list: ["항목1", "항목2"],
                    couple_list: ["남편", "아내"],
                  },
                ],
              });
            }}
            color="primary"
          >
            <AddIcon color="primary" fontSize="small" />
            <Typography>
              새 페이지 만들기
            </Typography>
          </Button>
        </div>
      </div>
    );
  }
}