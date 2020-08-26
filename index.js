import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Row, Col, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './style.css';

class Index extends React.Component {

  state = {
    totalPrincipal: "",
    totalInterest: "",
    totalPaid: "",
    years: "",
    interestRateAnnual: "",
    monthlyAmount: "",
  }

  handlePrincipal = (event) => {this.setState({
    totalPrincipal: event.target.value
  })}

  handleInterest = (event) => {this.setState({
    interestRateAnnual: event.target.value
  })}
  
  handleYears = (event) => {this.setState({
    years: event.target.value
  })}


  calcLoan = (event) => {
    event.preventDefault();
    let n = this.state.years * 12
    let r = (this.state.interestRateAnnual / 100) / 12

    let monthlyPayment = parseFloat(this.state.totalPrincipal * ((r * Math.pow((1 + r), n)) / ((Math.pow((1 + r), n) - 1)))).toFixed(2)
    let paid = parseFloat(monthlyPayment * this.state.years * 12).toFixed(2)
    let interest = parseFloat(paid - this.state.totalPrincipal).toFixed(2)

    this.setState({
      totalPaid: paid,
      totalInterest: interest,
      monthlyAmount: monthlyPayment
    })
  }

  render() {
    return (
      <div class="container"> 
        
        <div>
        <h1>Amortized Loan Calculator</h1>
        <hr color="black"></hr>
        <br/>
        <br/>
        <br/>
        </div>
       
        <Form onSubmit={this.calcLoan}>

        <div class="gridRow">

            <div>
            <div class="blockItems">
            Principal Amount: <Form.Control type="number" placeholder="Amount in $" value={this.state.totalPrincipal} onChange={this.handlePrincipal} />
            </div>

            <br />
            <br />

            <div class="blockItems">
            Interest Rate: <Form.Control type="number" placeholder="Percentage" value={this.state.interestRateAnnual} onChange={this.handleInterest} />
            </div>

            <br />
            <br />

            <div class="blockItems">
            Years: <Form.Control type="number" placeholder="Years" value={this.state.years} onChange={this.handleYears} />
            </div>
            
            <br />
            <br />
            <br />

            <Button variant="primary" type="submit">
              Submit
            </Button>
            </div>

        <div class = "results">
        <p>Principal:  <strong>${this.state.totalPrincipal}</strong></p>
        <p>Total Paid:  <strong>${this.state.totalPaid}</strong></p>
        <p>Total Interest:  <strong>${this.state.totalInterest}</strong></p>
        <hr color="black"></hr>
        <p><h2>Monthly Payment:  <strong>${this.state.monthlyAmount}</strong></h2></p>
        </div>

        {/* endGridRow */}
        </div> 
        </Form>


      </div>
    );
  }
}

ReactDOM.render(<Index/>, document.getElementById('root'));