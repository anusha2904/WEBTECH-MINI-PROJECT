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

    //var username = ls.get('username');
    var username = "pooja";
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
              
              <div className="takeTestDiv">
                  <p>Take our aptitute test again!</p>
                  <Button color="default" variant="outlined">Take the test!</Button>
              </div>
              <div className="takeTestDiv">
                  <p>See the results</p>
                  <Button color="default" variant="outlined">Results</Button>
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
                  <p>Take our aptitute test to determine your strengths!</p>
                  <Button color="default" variant="outlined">Take the test!</Button>
              </div>
            </div>
          </div>
          );
    }
  }

}

export default HomePage;