import './Login.css';
import React from 'react';
import ButtonAppBar from "../components/Sidebar/ButtonAppBar.js"
import Background from "../assets/img/28.jpg";
import Button from "@material-ui/core/Button";
import ls from 'local-storage';

const axios = require('axios');

var sectionStyle = {
    width:"100%",
    height:"670px",
    backgroundImage: "url(" + Background + ")"
  };

class QuizResult extends React.Component
{
  constructor (props)
  {
    super(props);
    this.state = {
      hasQuizResult:true,
      quizResult:''
    }
  }

  componentDidMount() {
    
    console.log("loaded!");

    var username = ls.get('username');
    axios
        .post('http://localhost:5000/getQuizResult', {
          "username": username,
        })
        .then(res => {
          console.log(res);
          if(res.data.hasQuizResult == "true")
          {
            this.setState({ hasQuizResult: true });
            this.setState({ quizResult: res.data.quizResult });
          }
          else
          {
              this.setState({hasQuizResult: false});
          }
        })
        .catch(error => {
          console.error(error)
        })

  }

  render()
  {
    if(this.state.hasQuizResult)
    {
        return (
            <div>
            <ButtonAppBar></ButtonAppBar>
            
                <div className="homepageMainDiv" style={sectionStyle}>
                    
                <div className="contentDiv">
                    <div className="takeTestDiv">
                        <h2 className="textStyle">Your aptitude test result is: {this.state.quizResult}</h2>
                        <Button  variant="contained" color="primary" href="/suggestion">Get your recommendations</Button>
                    </div>
                    <div className="takeTestDiv">
                      <Button  variant="contained" color="primary" href="/stats">See the stats</Button>
                    </div>
                </div>
              </div>
            </div>
        );
    }

    else
    {
        return (
            <div>
            <ButtonAppBar></ButtonAppBar>
            
                <div className="homepageMainDiv" style={sectionStyle}>
                    
                <div className="contentDiv">
                    <div className="takeTestDiv">
                        <h2 className="textStyle">Take the test to get your result</h2>
                        <Button color="secondary" variant="contained" href="/quiz">Take the test!</Button>
                    </div>
                </div>
                </div>
            </div>
        );
    }
    
  }

}

export default QuizResult;