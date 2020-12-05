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
import AllProjects from "../components/Pagination/AllProjects.js"

const axios = require('axios');

class Quiz extends React.Component
{
  constructor (props)
  {
    super(props);
    this.state = {
      username:'',
      password:'',
      wrongPassword:''
    }
  }

  render()
  {
    return (
      <div className="cardStyle">
          <AllProjects></AllProjects>
    </div>
    );
  }

}

export default Quiz;