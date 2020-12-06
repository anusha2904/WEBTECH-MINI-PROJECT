import './Login.css';
import React from 'react';
import ButtonAppBar from "../components/Sidebar/ButtonAppBar.js"
import Background from "../assets/img/background4.jpeg";
import Button from "@material-ui/core/Button";
import ls from 'local-storage';

const axios = require('axios');

var sectionStyle = {
    width:"100%",
    height:"400px",
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
                    
                    <div className="takeTestDiv">
                        <p>Your aptitude test result is: {this.state.quizResult}</p>
                        <Button color="default" variant="outlined">Get your recommendations</Button>
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
                    
                    <div className="takeTestDiv">
                        <p>Take the test to get your result</p>
                        <Button color="default" variant="outlined" href="/quiz">Take the test!</Button>
                    </div>
                </div>
            </div>
        );
    }
    
  }

}

export default QuizResult;