import React, { Component } from "react"; 
import '../../App.css';

function Mark(props){
  document.getElementById("quizpage");
  var c1=0,c2=0,c3=0,c4=0,c5=0,c6=0,c7=0;
  document.getElementsByClassName("aptitude")
  { 
    if(props.ans[0] == 2) {c1++};
    if(props.ans[1] == 4) {c1++};
    if(props.ans[2] == 3) {c1++};
    if(props.ans[3] == 4) {c1++};
    if(props.ans[4] == 4) {c1++};
    if(props.ans[5] == 2) {c2++};
    if(props.ans[6] == 3) {c2++};
    if(props.ans[7] == 1) {c2++};
    if(props.ans[8] == 3) {c3++};
    if(props.ans[9] == 3) {c3++};
    if(props.ans[10] == 2) {c3++};
    if(props.ans[11] == 2) {c4++};
    if(props.ans[12] == 3) {c4++};
    if(props.ans[13] == 2) {c4++};
    if(props.ans[14] == 3) {c5++};
    if(props.ans[15] == 1) {c5++};
    if(props.ans[16] == 1) {c5++};
    if(props.ans[17] == 1) {c6++};
    if(props.ans[18] == 1) {c6++};
    if(props.ans[19] == 2) {c6++};
    if(props.ans[20] == 1) {c7++};
    if(props.ans[21] == 3) {c7++};
    if(props.ans[22] == 1) {c7++};
  }
  var total=c1+c2+c3+c4+c5+c6+c7;
  return (
    <div>
      <h2 id="result">RESULTS: </h2>
      <h3 id="total">Total Marks: {total}</h3>
      <h3 id="aptitude">Aptitude: {c1}</h3>
      <h3 id="investigation">Investigation: {c2}</h3>
      <h3 id="enterprising">Enterprising: {c3}</h3>
      <h3 id="social">Social: {c4}</h3>
      <h3 id="business">Business: {c5}</h3>
      <h3 id="engineering">Engineering: {c6}</h3>
      <h3 id="art">Art: {c7}</h3>
    </div>  
  );
}

export default Mark;