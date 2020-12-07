import './Login.css';
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
import ButtonAppBar from "../components/Sidebar/ButtonAppBar.js"
import ls from 'local-storage';
import '../components/Cards.css'
import HeroSection3 from '../components/HeroSection3';


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
          aptitude:"",
          displayMessage:"",
          ifQuiz:"",
          ifProfile:""
        }
        this.sortByRankAsc = this.sortByRankAsc.bind(this);
        this.sortByRankDesc = this.sortByRankDesc.bind(this);
        this.sortByDistance = this.sortByDistance.bind(this);
    }
    
    componentDidMount() 
    {
        axios
          .post('http://localhost:5000/getIfQuizAndProfile', {
            "username": ls.get("username")
          })
          .then(res => { 
              console.log("response of quiz and profile: ", res);
              if(res.data.hasTakenTest == "true")
              {
                this.setState({ifQuiz:"taken aptitude test"});
                this.setState({aptitude:res.data.quizResult});
              }

              else
              {
                this.setState({ifQuiz:"not taken aptitude test"});
                this.setState({aptitude:""});
              }

              if(res.data.hasFilledProfile == "true")
              {
                this.setState({ifProfile:"filled profile"});
              }

              else
              {
                this.setState({ifProfile:"not filled profile"});
              }

              this.setState({displayMessage:"Showing results for: " + this.state.ifQuiz + " and " + this.state.ifProfile});

              axios
                .post('http://localhost:5000/suggestion', {
                  "courseOffered": this.state.aptitude
                })
                .then(res => {
                    this.setState({colleges:res.data.colleges});


                    this.state.colleges.forEach(element => {  
                      navigator.geolocation.getCurrentPosition((position) =>
                        {
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
          this.state.colleges.sort((a, b) => (a.distance - b.distance))
  
      });
      this.setState({colleges:this.state.colleges});
        
      }
    
   handleclick()
   {
     window.location.href = "https://www.pes.edu/"
   }
 
  render()
  {
    
    const { classes } = this.props;
    return(
    
    <div>
    
    <ButtonAppBar></ButtonAppBar>

      {/* <div className="suggestionMessageDiv">
        {this.state.displayMessage}
      </div> */}
      <div><HeroSection3/></div>
      <div className = "sortbtndiv">
        <Card>
            <CardActionArea>
              <CardContent>
              <div className="suggestionButtonDivStyles">
                  <div className="suggestionButtonStyles">
                    <Button size="medium"  variant="contained" onClick={this.sortByRankAsc }>
                      Sort By Rank(LOW-HIGH)
                    </Button>
                  </div>
                  <div className="suggestionButtonStyles">
                    <Button size="medium"  variant="contained" onClick={this.sortByRankDesc }>
                      Sort By Rank(HIGH-LOW)
                    </Button>
                  </div>
                  <div className="suggestionButtonStyles">
                    <Button size="medium"  variant="contained" onClick={this.sortByDistance}>
                      Sort Distance(Near-far)
                    </Button>
                  </div>
              </div>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>

    <div className="suggestionDiv">
      {this.state.colleges.map(college => {  
        var imgName = null;


        return(

          <div key={college._id} className="suggestionCardDiv">
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  style = {{ height: "10px", paddingTop: '0'}}
                  title="Colleges"
                  
                  src="../assets/img/background.jpg"
                />
                <img alt= 'Travel image' src={imagesArray[college.image]} style = {{ width:"500px", height: "400px", paddingTop: ''}} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {college.collegeName+ " FOR " +college.courseOffered.toUpperCase()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {college.description}<br/>
                    {"Rank CutOff: "+college.cetCutoff}<br/>
                    {"Distance: "+college.distance+" km"} 
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" onClick={()=> this.handleclick()} >
                  Learn More
                </Button>
              </CardActions>
            </Card>
    
          </div>
        );      
          
      })}

    </div>
    </div>
    );
      
  }
}

Suggestion.propTypes = {
    classes: PropTypes.object.isRequired,
}; 

export default withStyles(styles)(Suggestion);