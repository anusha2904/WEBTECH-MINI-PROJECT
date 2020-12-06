import './Login.css';
import React from "react";
import { Component , useState} from "react";
import { List, ListItem, makeStyles, Divider, Box } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Pagination from "@material-ui/lab/Pagination";
import Button from "@material-ui/core/Button";
import ButtonAppBar from "../components/Sidebar/ButtonAppBar.js"

const axios = require('axios');

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  item: {
    padding: theme.spacing(1.2)
  },
  avatar: { marginRight: theme.spacing(5) },
  paginator: {
    justifyContent: "center",
    padding: "10px"
  }
}));

const AllProjects = props => {
  const classes = useStyles();
  const itemsPerPage = 2;
  const [showQ,setShowQ] = useState(0);
  const [page, setPage] = React.useState(1);
  const [showSubmit, setShowSubmit] = React.useState('');
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(0); 
  const [checkedRadio, setCheckedRadio] = useState(false);
  const [noOfPages] = React.useState(
    Math.ceil(projectsList.length / itemsPerPage)
  );

  const handleSubmitQuiz = (event, value) => {
    console.log("hello from submit quiz");
    axios
        .post('http://localhost:5000/submitQuiz', {
          "quizDetails": projectsList,
        })
        .then(res => { 
          console.log(res);
        })
        .catch(error => {
          console.error(error)
        })
  };

  const handleChange = (event, value) => {
    setPage(value);
    setCheckedRadio(false);

    if(value == 4)
    {
      setShowSubmit("Submit quiz");
    }
    else
    {
      setShowSubmit("");
    }
  };

  return (

    <div>
    <ButtonAppBar></ButtonAppBar>

    <div>
      
      <div className="quizDiv">
        {projectsList
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map(projectItem => {
            const labelId = `list-secondary-label-${projectItem.projectName}`;
            return (
            <div id={"question"+projectItem.projectID} className="questionDiv">

              <div>{projectItem.projectName}</div>
              <div className="optionsDiv">
                <div>
                  <input type="radio" onChange={()=>{projectItem.choice = "1"}} name={"q"+projectItem.projectID} value={projectItem.option1} checked={checkedRadio}/>
                  <label>{projectItem.option1}</label>
                </div>
                <div>
                  <input type="radio" onChange={()=>{projectItem.choice = "2"; console.log(projectsList)}} name={"q"+projectItem.projectID} value={projectItem.option2} checked={checkedRadio}/>
                  <label>{projectItem.option2}</label>
                </div>

                <div>
                  <input type="radio" onChange={()=>{projectItem.choice = "3"}} name={"q"+projectItem.projectID} value={projectItem.option3} checked={checkedRadio}/>
                  <label>{projectItem.option3}</label>
                </div>

                <div>
                  <input type="radio" onChange={()=>{projectItem.choice = "4"}} name={"q"+projectItem.projectID} value={projectItem.option4} checked={checkedRadio}/>
                  <label>{projectItem.option4}</label>
                </div>
              </div>

            </div>
            );
          })}
        </div>

      <Divider />
      <Box component="span">
        <Pagination
          count={noOfPages}
          page={page}
          onChange={handleChange}
          defaultPage={1}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
          classes={{ ul: classes.paginator }}
        />
      </Box>
      {/* <input type="button" value="Submit" onClick={()=>{console.log(1);setShowResult(true);console.log(showResult);}}/>  */}
        <Button color="primary" onClick={handleSubmitQuiz}>{showSubmit}</Button>
      <div style={!showResult ? {'display':"none"}:{'display':"block"}}>
      </div>
    </div>
  </div>
  );
};

export default AllProjects;

const projectsList = [
  {
    projectID: 0,
    projectName: "1.) Nati is a dance form of Indian state of",
    option1:"Karnataka",
    option2:"Madhya Pradesh",
    option3:"Himachal Pradesh",
    option4:"Assam", 
    answer: "3", 
    choice:""
   
  },
  {
    projectID: 1,
    projectName: "2.) Airtel Payments Bank partnered with this insurance company to offer Smart Plan Shop Package Policy", 
    option1:"Bharti AXA General Insurance",
    option2:"TATA AIG Insurance Company",
    option3:"Bajaj Allianz General Insurance",
    option4:"HDFC ERGO General Insurance Company",
    answer:"1",
    choice:""
  },
  {
    projectID: 2,
    projectName: "3.) What is the probability that a chosen number is a perfect cube if it is chosen at random from the set (1, 2, 3…, 100)?",
    option1:"4/13",
    option2:"1/2",
    option3:"1/25",
    option4:"1/10",
    answer:"3",
    choice:""
  },
  {
    projectID: 3,
    projectName: "4.) Private International law is also called",
    option1:"Local laws",
    option2:"Conflict of laws",
    option3:"Common law",
    option4:"Civil law",
    answer:"2",
    choice:""
  },
  {
    projectID: 4,
    projectName: "5.) In below mentioned question, there is a relationship between given words on one side of: : and another word on another side of: : . Find another word that has the same relation with the words in the given pair bear.Scribble: Write: : Stammer : ?",
    option1:"walk",
    option2:"dance",
    option3:"play",
    option4:"speak",
    answer:"4",
    choice:""
  },
  {
    projectID: 5,
    projectName: "6.) What is your favourite class?",
    option1:"Social studies",
    option2:"English",
    option3:"Math",
    option4:"Business",
    choice:""
  },
  {
    projectID: 6,
    projectName: "7.) What extracurricular activities do you participate in?",
    option1:"Investing in the stock market",
    option2:"Social work",
    option3:"Drawing/Writing",
    option4:"Doing puzzles",
    choice:""
  },
  {
    projectID: 7,
    projectName: "8.) What sounds best?",
    option1:"Writing a song",
    option2:"Managing a restaurant",
    option3:"Doing volunteer work",
    option4:"Creating an app",
    choice:""
  },
];