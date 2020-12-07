import { PieChart } from 'react-minimal-pie-chart'; 
import './Login.css';
import React from 'react';
import ButtonAppBar from "../components/Sidebar/ButtonAppBar.js"
import Background from "../assets/img/background4.jpeg";
import Button from "@material-ui/core/Button";
import ls from 'local-storage';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Helmet } from 'react-helmet'

const TITLE = 'TheIdealUniversity'

const axios = require('axios');
  
  const rows = [
    {"name":'Question1', "calories":159, "fat":6.0},
    {"name":'Question2', "calories":159, "fat":6.0},
    {"name":'Question3', "calories":159, "fat":6.0},
    {"name":'Question4', "calories":159, "fat":6.0},
    {"name":'Question5', "calories":159, "fat":6.0},
  ];

class Stats extends React.Component
{
  constructor (props)
  {
    super(props);
    this.state = {
      hasTakenTest:false,
      tableContent:[],
      pieChartData:[],
      percentageUsers:'',
      aptitude:'',
      lineWidth:60
    }
   
  }

  componentDidMount()
  {
    axios
      .post('http://localhost:5000/getStats', {
          "username": ls.get("username")
      })
      .then(res => {
          console.log(res);
          this.setState({tableContent:res.data.tableStats});

          var pieChartContent = [
            {title:"Arts", value:res.data.aptitudeDict["Arts"], color:'#E38627'},
            {title:"Business", value:res.data.aptitudeDict["Business"], color:'#C13C37'},
            {title:"Engineering", value:res.data.aptitudeDict["Engineering"], color:'#6A2135'},
            {title:"Law", value:res.data.aptitudeDict["Law"], color:'#ff9999'},
          ];

          this.setState({pieChartData:pieChartContent});
          this.setState({percentageUsers:res.data.percentage});
          this.setState({aptitude:res.data.reqAptitude})
      })
      .catch(error => {
          console.error(error)
      })

      this.setState({contents:rows});
  }


  render()
  {
    return (
        <div>
        <ButtonAppBar></ButtonAppBar>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>

        <div className = "table">
       
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell align="right">Your Answer</TableCell>
            <TableCell align="right">Correct Answer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.tableContent.map((row) => (
            <TableRow key={row.questionText}>
              <TableCell component="th" scope="row">
                {row.questionText}
              </TableCell>
              <TableCell align="right">{row.userAnswer}</TableCell>
              <TableCell align="right">{row.answer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>

      <div className="statsDivForPieChart">
        <div className="statsCardDiv">
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {this.state.percentageUsers+"%"}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {"Percentage of users with the same aptitude as you: "+this.state.aptitude}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        <div className="piechart">
            <PieChart
                data={this.state.pieChartData}

                style={{
                    fontFamily:
                      '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                    fontSize: '8px',
                  }}
                  radius={PieChart.defaultProps.radius - 2}
                  
                  segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
                  segmentsShift={(index) => (index === this.selected ? 6 : 1)}
                  animate
                  label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%' == '0%' ? '': Math.round(dataEntry.percentage) + '%'}
                  labelPosition={60}
                  labelStyle={{
                    fill: '#fff',
                    opacity: 0.75,
                    pointerEvents: 'none',
                    fontSize:'7px'
                  }}
                
                />
        </div>
        </div>
      </div>
      );
  }

}

export default Stats;

