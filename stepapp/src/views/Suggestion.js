import React from 'react';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import imagebmsef from '../assets/img/bmsef.jpg';
import imagebms from '../assets/img/bms.jpg'; 
import imagedayanandsagar from '../assets/img/dayanandsagar.jpg'; 
import imagenirma from '../assets/img/nirma.jpg'; 
import imagepandit from '../assets/img/pandit.jpg'; 
import imagepanditdeen from '../assets/img/panditdeen.jpg'; 
import imageparul from '../assets/img/parul.jpg'; 
import imagepese from '../assets/img/pese.jpg'; 
import imagerv from '../assets/img/rv.jpg'; 
import imagesiddanga from '../assets/img/siddanga.jpg'; 
import imagesilveroak from '../assets/img/silveroak.jpg';
import AllProjects from './Quiz';
import { getDistance } from 'geolib';

const imagesArray = {"bmsef":imagebmsef, "dayanandsagar":imagedayanandsagar, "nirma":imagenirma, "pandit":imagepandit, "panditdeen":imagepanditdeen, "parul":imageparul, "pese":imagepese, "rv":imagerv, "siddanga":imagesiddanga, "silveroak":imagesilveroak, "bms": imagebms};

const distance = {"bmsef":imagebmsef, "dayanandsagar":imagedayanandsagar, "nirma":imagenirma, "pandit":imagepandit, "panditdeen":imagepanditdeen, "parul":imageparul, "pese":imagepese, "rv":imagerv, "siddanga":imagesiddanga, "silveroak":imagesilveroak, "bms": imagebms}


const axios = require('axios');
const styles = theme => ({
    root: {
      maxWidth: 500,
      
    },
    media: {
      height: 100
    },
  });



class Suggestion extends React.Component{
    constructor(props)
    {
      super(props);
      this.state = 
        { 
          colleges:[],
        }
        this.sortByRankAsc = this.sortByRankAsc.bind(this);
        this.sortByRankDesc = this.sortByRankDesc.bind(this);
        this.sortByDistance = this.sortByDistance.bind(this);
    }
    
    componentDidMount() 
    {
        axios
        .post('http://localhost:5000/suggestion', {
          "courseOffered": "Arts"
        })
        .then(res => {
            this.setState({"colleges":res.data.colleges});
            console.log("colleges: from this: ", this.state.colleges);
            console.log(typeof(this.state.colleges)); 

            this.state.colleges.forEach(element => {  
              navigator.geolocation.getCurrentPosition((position) =>
                {
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);

                var distance = getDistance(
                    { latitude: position.coords.latitude, longitude: position.coords.longitude },
                    { latitude: element.latitude, longitude: element.longitude}
                );

                var distancekms = distance/1000; 
                
              element["distance"] = distancekms; 

            });
        })
    })
    .catch(error => {
      console.error(error)
    })
  }

    sortByRankAsc() 
    {
      this.setState(prevState => 
        {
          this.state.colleges.sort((a, b) => (a.cetCutoff - b.cetCutoff))
        });

      this.setState({colleges:this.state.colleges});
    }

    sortByRankDesc() 
    {
      this.setState(prevState => {
        this.state.colleges.sort((a, b) => (b.cetCutoff - a.cetCutoff))

    });
    this.setState({colleges:this.state.colleges});
    }

    sortByDistance()
      {
        this.setState(prevState => {
          this.state.colleges.sort((a, b) => (b.distance - a.distance))
  
      });
      this.setState({colleges:this.state.colleges});
        
      }
    
   
 
  render()
  {
    
    const { classes } = this.props;
    return(
    <div>
      {this.state.colleges.map(college => {  
        var imgName = null;


        return(

          <div key={college._id}>
            <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            style = {{ height: "10px", paddingTop: '0'}}
            title="Colleges"
            src="../assets/img/background.jpg"
          />
          <img src={imagesArray[college.image]} style = {{ width:"500px", height: "400px", paddingTop: ''}} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {college.collegeName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {college.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    
          </div>
        );      
          
      })}
    <Button size="small" color="primary" onClick={this.sortByRankAsc }>
      Sort Asc
    </Button>
    <Button size="small" color="primary" onClick={this.sortByRankDesc }>
      Sort Desc
    </Button>
    <Button size="small" color="primary" onClick={this.sortByDistance }>
      Sort Distance
    </Button>

    </div>
    );
      
  }
}

Suggestion.propTypes = {
    classes: PropTypes.object.isRequired,
}; 

export default withStyles(styles)(Suggestion);