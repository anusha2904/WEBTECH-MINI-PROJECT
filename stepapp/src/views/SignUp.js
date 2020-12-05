import './SignUp.css';
import React from 'react';
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

class SignUp extends React.Component
{
  constructor (props)
  {
    super(props);
    this.state = {
      username:'',
      password:'', 
      login:''
    }
  }

  handleButtonClick_S()
  {
    console.log("Hello in clickButton");

    console.log(this.state.username.target.value, this.state.password.target.value);
    
    axios
        .post('http://localhost:5000/signup', {
          "username": this.state.username.target.value,
          "password": this.state.password.target.value
        })
        .then(res => { 
                if(res.data.signup == true)
                {
                    return(this.setState({login:"You have successfully signed up."})); 
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
                  <Input placeholder="Username" onChange = { (val) => this.setInputValue('username', val)}></Input>
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
                  <Input placeholder="Password" onChange = { (val) => this.setInputValue('password', val)}></Input>
                </GridItem>
              </GridContainer>
              </div>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={() => this.handleButtonClick_S()}>Sign Up</Button>
            </CardFooter>
          </Card>
          <div>{this.state.login}</div> 
        </GridItem>
      </GridContainer>
    </div>
    );
  }

}

export default SignUp;