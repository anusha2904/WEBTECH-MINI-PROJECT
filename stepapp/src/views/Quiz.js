import './Login.css';
import React from "react";
import { Component , useState} from "react";
import { List, ListItem, makeStyles, Divider, Box } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import Button from "@material-ui/core/Button";
import ButtonAppBar from "../components/Sidebar/ButtonAppBar.js"
import ls from 'local-storage';
import { getDistance } from 'geolib';

const axios = require('axios');

const projectList1 = [{
    questionId: 1,
    questionText: "1.) Hello",
    option1:"Karnataka",
    option2:"Madhya Pradesh",
    option3:"Himachal Pradesh",
    option4:"Assam",  
    selectedChoice:""
   
  },
  {
    questionId: 2,
    questionText: "2.) Hey", 
    option1:"Bharti AXA General Insurance",
    option2:"TATA AIG Insurance Company",
    option3:"Bajaj Allianz General Insurance",
    option4:"HDFC ERGO General Insurance Company",
    selectedChoice:""
  }];

const answers = {"1":"", "2":"", "3":"", "4":"", "5":""};

class AllProjects extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            currentList:projectList1,
            pageNo:1,
            noOfPages:4,
            showButton:false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitQuiz = this.handleSubmitQuiz.bind(this);
    }
      
    componentDidMount()
    {
        var username = ls.get('username');

        axios
            .post('http://localhost:5000/getQuizQuestions', {
                "questionIndex": "1",
                "username": username
            })
            .then(res => {
                this.setState({currentList:res.data.questions});
            })
            .catch(error => {
                console.error(error)
            })
    }

    handleChange(event, value)
    {
        console.log(value);
        this.setState({pageNo:value});
    
        if(value == 4)
        {
            this.setState({showButton:true})
        }
        else
        {
            this.setState({showButton:false})
        }

        var username = ls.get('username');
        axios
            .post('http://localhost:5000/getQuizQuestions', {
                "questionIndex": value.toString(),
                "username": username
            })
            .then(res => {
                console.log("response from handleChange: ", res);
                this.setState({currentList:res.data.questions});
            })
            .catch(error => {
                console.error(error)
            })
    }

    handleSubmitQuiz()
    {
        console.log("answers: ", answers);

        var username = ls.get('username');

        axios
            .post('http://localhost:5000/submitQuiz', {
                "quizQuestions": answers,
                "username": username
            })
            .then(res => {
                console.log(res);
                window.location.href = "/quizresult";
            })
            .catch(error => {
                console.error(error)
            })
    }

    render()
    {
        return(
        <div>
            <ButtonAppBar></ButtonAppBar>

            <div>
            
            <div className="quizDiv">
                {this.state.currentList
                .map(projectItem => {

                    return (
                    <div id={"question"+projectItem.questionId} className="questionDiv" key={"key"+projectItem.questionId}>

                    <div>{projectItem.questionText}</div>
                    <div className="optionsDiv" id={"options"+projectItem.questionId}>
                        <div>
                        <input type="radio" onChange={()=>{projectItem.selectedChoice = "1"; answers[projectItem.questionId] = "1";}} name={"q"+projectItem.questionId} value={projectItem.option1} id={"option"+projectItem.questionId+"1"} />
                        <label>{projectItem.option1}</label>
                        </div>
                        <div>
                        <input type="radio" onChange={()=>{projectItem.selectedChoice = "2"; answers[projectItem.questionId] = "2";}} name={"q"+projectItem.questionId} value={projectItem.option2} id={"option"+projectItem.questionId+"2"} />
                        <label>{projectItem.option2}</label>
                        </div>

                        <div>
                        <input type="radio" onChange={()=>{projectItem.selectedChoice = "3"; answers[projectItem.questionId] = "3";}} name={"q"+projectItem.questionId} value={projectItem.option3} id={"option"+projectItem.questionId+"3"} />
                        <label>{projectItem.option3}</label>
                        </div>

                        <div>
                        <input type="radio" onChange={()=>{projectItem.selectedChoice = "4"; answers[projectItem.questionId] = "4";}} name={"q"+projectItem.questionId} value={projectItem.option4} id={"option"+projectItem.questionId+"4"} />
                        <label>{projectItem.option4}</label>
                        </div>
                    </div>

                    </div>
                    );
                })}
            </div>

            <Divider />
            <div className="paginatorDiv">
                <Box component="span">
                    <Pagination
                    count={this.state.noOfPages}
                    page={this.state.pageNo}
                    onChange={this.handleChange}
                    defaultPage={1}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                    className = "paginator"
                    />
                </Box>
            </div>
            <Button color="primary" style={this.state.showButton ? {'display':"block"}:{'display':"none"}} onClick={this.handleSubmitQuiz}>Submit Quiz</Button>
            {/* <div style={!showResult ? {'display':"none"}:{'display':"block"}}>
            </div> */}
            </div>
        </div>
    )};
}

export default AllProjects;