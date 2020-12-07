import './Login.css';
import React from 'react';
import ls from 'local-storage'; 
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import CustomInput from "../components/CustomInput/CustomInput.js";
// import Button from "components/CustomButtons/Button.js";
import Card from "../components/Card/Card.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardAvatar from "../components/Card/CardAvatar.js";
import CardBody from "../components/Card/CardBody.js";
import CardFooter from "../components/Card/CardFooter.js";
import Input from '@material-ui/core/Input';
import ButtonAppBar from "../components/Sidebar/ButtonAppBar.js"
import Background from "../assets/img/28.jpg";
import { Helmet } from 'react-helmet'

const TITLE = 'TheIdealUniversity'

const axios = require('axios');

var sectionStyle = {
  width:"100%",
  height:"670px",
  backgroundImage: "url(" + Background + ")"
};

class Profile extends React.Component
{
  constructor (props)
  {
    super(props);
    this.state = {
      math: '', 
      chem: '', 
      phy: '', 
      cetRank: '', 
      username: ls.get('username'), 
      update:''  
    }
  }

  handleButtonClick()
  {
    console.log("Hello"); 
    axios
        .post('http://localhost:5000/profile', {
          "math": this.state.math.target.value,
          "chem": this.state.chem.target.value,
          "phy": this.state.phy.target.value,
          "cetRank": this.state.cetRank.target.value, 
          "username":ls.get('username')
        })
        .then(res => { 
                console.log(res);
                if(res.data.profile == true)
                {
                    this.setState({update:"You have successfully updated."}); 
                }
          
        })
        .catch(error => {
          console.error(error)
        })
  }

  setInputValue(property, val) {
    if (val.length > 12) {
      return;
    }
    this.setState({
      [property]: val
    })
  }

  render()
  {
    return (

      <div>
      <ButtonAppBar></ButtonAppBar>
      <Helmet>
          <title>{ TITLE }</title>
        </Helmet>

      <div className="cardStyle" style={sectionStyle}>
        <Grid container>
          <GridItem xs={8} sm={8} md={8}>
            <Card>
              <CardHeader color="">
                <h4>Fill Your Profile</h4>
              </CardHeader>
              <CardBody>
              <div className="usernameInput">
                <GridContainer>
                  <GridItem xs={8} sm={8} md={6}>   
                    PUC BOARD MARKS                
                  </GridItem>
                </GridContainer>
                </div>
                <div className="usernameInput">
                <GridContainer>
                  <GridItem xs={8} sm={8} md={6}>
                    <Input placeholder="Math" onChange = { (val) => this.setInputValue('math', val)}></Input>
                  </GridItem>
                </GridContainer>
                </div>
                <div className="usernameInput">
                <GridContainer>
                  <GridItem xs={8} sm={8} md={6}>
                    <Input placeholder="Chem" onChange = { (val) => this.setInputValue('chem', val)}></Input>
                  </GridItem>
                </GridContainer>
                </div>
                <div className="usernameInput">
                <GridContainer>
                  <GridItem xs={8} sm={8} md={6}>
                    <Input placeholder="Physics" onChange = { (val) => this.setInputValue('phy', val)}></Input>
                  </GridItem>
                </GridContainer>
                </div>
                <div className="usernameInput">
                <GridContainer>
                  <GridItem xs={8} sm={8} md={6}>
                    <Input placeholder="CET Rank" onChange = { (val) => this.setInputValue('cetRank', val)}></Input>
                  </GridItem>
                </GridContainer>
                </div>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={() => this.handleButtonClick()}>Update Profile</Button>
              </CardFooter>
            </Card>
            <div>{this.state.update}</div>
          </GridItem>
        </Grid>
      </div>
    </div>
    );
  }

}

export default Profile;