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

const axios = require('axios');

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

class Stats extends React.Component
{
  constructor (props)
  {
    super(props);
    this.state = {
      hasTakenTest:false,
      
        
      lineWidth:60
    }
   
  }


  render()
  {

    return (
        <div>
        <ButtonAppBar></ButtonAppBar>

        <div className = "table">
       
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
        <div>
        <Card>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Hello
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              helloooooo
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
        </div>
        <div className="piechart">
            <PieChart
                data={[
                    { title: 'One', value: 10, color: '#E38627' },
                    { title: 'Two', value: 15, color: '#C13C37' },
                    { title: 'Three', value: 20, color: '#6A2135' },
                ]}

                style={{
                    fontFamily:
                      '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                    fontSize: '8px',
                  }}
                  radius={PieChart.defaultProps.radius - 24}
                  
                  segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
                  segmentsShift={(index) => (index === this.selected ? 6 : 1)}
                  animate
                  label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
                  labelPosition={60}
                  labelStyle={{
                    fill: '#fff',
                    opacity: 0.75,
                    pointerEvents: 'none',
                  }}
                
                />
        </div>
      </div>
      );
  }

}

export default Stats;

