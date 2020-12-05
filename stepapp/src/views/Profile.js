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

const axios = require('axios');

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
      <div className="cardStyle">
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4>Login</h4>
            </CardHeader>
            <CardBody>
              <div className="usernameInput">
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  {/*<CustomInput
                    labelText="Username"
                    id="username"
                    onChange={event => setUsername(event.target.value)}
                    formControlProps={{
                      fullWidth: true
                    }
                  />*/}
                  PUC Board Marks
                  <Input placeholder="Math" onChange = { (val) => this.setInputValue('math', val)}></Input>
                </GridItem>
              </GridContainer>
              </div>
              <div>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  {/*<CustomInput
                    labelText="Password"
                    id="password"
                    onChange={event => setPassword(event.target.value)}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />*/}
                  <Input placeholder="Chem" onChange = { (val) => this.setInputValue('chem', val)}></Input>
                </GridItem>
              </GridContainer>
              </div>
              <div>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  {/*<CustomInput
                    labelText="Password"
                    id="password"
                    onChange={event => setPassword(event.target.value)}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />*/}
                  <Input placeholder="Physics" onChange = { (val) => this.setInputValue('phy', val)}></Input>
                </GridItem>
              </GridContainer>
              </div>
              <div>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  {/*<CustomInput
                    labelText="Password"
                    id="password"
                    onChange={event => setPassword(event.target.value)}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />*/}
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
      </GridContainer>
    </div>
    );
  }

}

export default Profile;