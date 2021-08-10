import React from 'react';
import './App.css';
import {Nav,Navbar,Row,Col,Container} from 'react-bootstrap';
import './bootstrap-4.5.0-dist/css/bootstrap.min.css';
import {GitHub,WhatsApp,LinkedIn,Instagram,VisibilityRounded,PeopleAltRounded} from '@material-ui/icons';
import GitHubButton from 'react-github-btn';
import moment from 'moment';
import CountUp from 'react-countup';

class Get extends React.Component{ 
  constructor(props){
      super(props);
      this.state={
            amount: '',
            startd: '',
            endd: '',
            interest: '',
            time: '',
            iamount: '',
            tamount: '',
            count: 0,
            Visits: 0,
      };
      var load = localStorage.getItem('on_load_page');
    if (load === null) {
        load = 0;
    }
    load++;
    localStorage.setItem("on_load_page", load);
    this.state.visits = load;
  }

  mySubmitHandler = (event) => {
    event.preventDefault()
    this.setState({iamount: this.state.iamount+1});
    var startdateMoment = moment(this.state.startd);
    var enddateMoment = moment(this.state.endd);
    if (startdateMoment.isValid() === true && enddateMoment.isValid() === true) {
          var years = enddateMoment.diff(startdateMoment, 'years');
          var months = enddateMoment.diff(startdateMoment, 'months') - (years * 12);
          startdateMoment.add(years, 'years').add(months, 'months');
          var days = enddateMoment.diff(startdateMoment, 'days')
          // console.log(years+'-'+months+'-'+days);
          this.setState({time: years+'-'+months+'-'+days});
          months = years*12 + months;
          // console.log((this.state.interest*months*this.state.amount/100));
          var Interest_amount = ((this.state.interest*months*this.state.amount/100)+(this.state.interest*days*this.state.amount/3000));
          this.setState({iamount: Interest_amount});
          this.setState({tamount: Interest_amount+this.state.amount/1});
        }
      else{
        console.log("undefined");
      }
    this.setState({
            amount: '',
            startd: '',
            endd: '',
            interest: ''
          });
    var n = localStorage.getItem('on_load');
    if (n === null) {
        n = 0;
    }
    n++;
    localStorage.setItem("on_load", n);
    this.setState({count : n});
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }



  render(){
    var n = localStorage.getItem('on_load');
    if (n === null) {
        n = 0;
    }
    this.state.count = n;
  return (
    <div className="pt_70 bg_image">
        <Navbar collapseonselect="true" expand="lg" variant="dark" className="header" fixed="top">
          <Navbar.Brand href="#home" className="navbrand">
            <span>Sinterest</span> Calculator
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse>
            <Nav className="mr-auto header_middle d-none d-md-block">
                Smart App 1.0
            </Nav>
            <div className="header_right justify-content-center">
                  <a className="pt-2"><GitHubButton href="https://github.com/jay-498/Sinterest_calculator" data-color-scheme="no-preference: dark; light: dark; dark: light;" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star jay-498/Sinterest_calculator on GitHub">Star</GitHubButton></a>
                  <a href="https://github.com/jay-498" target='_blank' rel="noreferrer">
                    <GitHub />
                  </a>
                  <a href="https://api.whatsapp.com/send?phone=919390181313" target='_blank' rel="noreferrer">
                    <WhatsApp />
                  </a>
                  <a href="https://www.linkedin.com/in/ajay-pediredla-125887191" rel="noreferrer" target='_blank'>
                    <LinkedIn />
                  </a>
                  <a href="https://www.instagram.com/_ajay_pediredla__/" target='_blank' rel="noreferrer">
                    <Instagram />
                  </a>
            </div>
          </Navbar.Collapse>
        </Navbar>
        <Container className="Form mt-5 pt-4">
          <Row>
              <Col sm={12} md={6}>
                  <form onSubmit={this.mySubmitHandler}>
                     <label>Amount</label>
                     <input name="amount" type="number" value={this.state.amount} onChange={this.myChangeHandler} placeholder="Principal Amount" required/>
                     <label>Start Date</label>
                     <input name="startd" type="date" value={this.state.startd} onChange={this.myChangeHandler} required/>
                     <label>End Date</label>
                     <input name="endd" type="date" value={this.state.endd} onChange={this.myChangeHandler} required/>
                     <label>Interest</label>
                     <input name="interest" type="float" value={this.state.interest} onChange={this.myChangeHandler} placeholder="Monthly Interest" required/>
                     <input type="submit" className="submitButton" />
                   </form>
              </Col>
              <Col sm={12} md={6}>
                    <form>
                     <label>Time</label>
                     <input type="text" name="time" value={this.state.time} placeholder="Years-Months-Days" readOnly= {true}/>
                     <label>Interest Amount</label>
                     <input type="number" name="iamount" value={this.state.iamount} placeholder="Interest Amount" readOnly= {true}/>
                     <label>Total Amount</label>
                     <input type="text" name="tmount" value={this.state.tamount} placeholder="Total Amount" readOnly= {true}/>
                   </form>
              </Col>
          </Row>
             <div className="counter">
             <Row className="justify-content-center">
             <h3><PeopleAltRounded className="mr-2"/><CountUp prefix="+" end={this.state.count} duration={5}/></h3>
             <h3><VisibilityRounded className="mr-2"/><CountUp prefix="+" end={this.state.visits} duration={5}/></h3>
             </Row>
             </div>
        </Container>
    </div>
  );  
}
};



export default Get;