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

class HomePage extends React.Component
{
  constructor (props)
  {
    super(props);
    this.state = {
      hasTakenTest:false
    }
  }

  componentDidMount() {
    
    console.log("loaded!");

    var username = ls.get('username');
    axios
        .post('http://localhost:5000/checkHasTakenTest', {
          "username": username,
        })
        .then(res => {
          console.log(res);
          if(res.data.hasTakenTest == "true")
          {
            this.setState({ hasTakenTest: true });
          }
        })
        .catch(error => {
          console.error(error)
        })

  }

  render()
  {

    if(this.state.hasTakenTest)
    {
        return (
            <div>
            <ButtonAppBar></ButtonAppBar>
            
            <div className="homepageMainDiv" style={sectionStyle}>
              
              <div className="contentDiv">
                <div className="takeTestDiv">
                    <h2 className="textStyle">Take our aptitute test again!</h2>
                    <Button color="primary" variant="contained" href="/quiz">Take the test!</Button>
                </div>
                <div className="takeTestDiv">
                    <h1 className="textStyle">See the results</h1>
                    <Button color="primary" variant="contained" href="/quizresult">Results</Button>
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
                  <h2 className="textStyle">Take our aptitute test to determine your strengths!</h2>
                  <Button color="primary" variant="contained" href="/quiz">Take the test!</Button>
              </div>
            </div>
            </div>
          </div>
          );
    }
  }

}

export default HomePage;