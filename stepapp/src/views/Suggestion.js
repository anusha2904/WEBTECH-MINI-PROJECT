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


const styles = theme => ({
    root: {
      maxWidth: 1500,
    },
    media: {
      height: 140,
    },
  });


const employees = [
    { _id: 1, name: "foo", contact: "abc", age: 20 },
    { _id: 2, name: "bar", contact: "efg", age: 30 },
    { _id: 3, name: "baz", contact: "hij", age: 40 }
  ];


  
  const fakeRequest = () =>
    new Promise(resolve => setTimeout(() => resolve(employees), 100));

class Suggestions extends React.Component{
    state = {
        employees: []
      };
      componentDidMount() {
        fakeRequest().then(employees => this.setState({ employees }));
      }

  render()
  {
    const { classes } = this.props;
    const employees = this.state.employees.map(employee => (
        <div key={employee._id}>
  <Card className={classes.root}>
    <CardActionArea>
      <CardMedia
        className={classes.media}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {employee.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
          across all continents except Antarctica
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="small" color="primary">
        Share
      </Button>
      <Button size="small" color="primary">
        Learn More
      </Button>
    </CardActions>
  </Card>
        </div>
      ));
    
      return (
    <div>
  {employees}
  </div>
);} 
}

Suggestions.propTypes = {
    classes: PropTypes.object.isRequired,
}; 

export default withStyles(styles)(Suggestions);