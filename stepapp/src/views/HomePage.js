import './Login.css';
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

class HomePage extends React.Component
{
  constructor (props)
  {
    super(props);
    this.state = {
      username:'',
      password:''
    }
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
          In homepage
    </div>
    );
  }

}

export default HomePage;