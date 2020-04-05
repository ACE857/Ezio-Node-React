import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import Landing from "./Landing";
import { connect } from "react-redux";
import * as actions from "../actions";
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>Survey New</h2>;
class App extends Component {
  componentDidMount() {
    // lifecycle method and wire his class to get
    // updates from redux and call action creators

    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route path="/" exact component={Landing} />
            <Route path="/surveys" exact component={Dashboard} />
            <Route path="/surveys/new" exact component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default connect(null, actions)(App);
/*
connect() connects this component to redux store
take 2 arguments which are functions 
1. mapPropsToState update props to new global state
2. mapDispatchTostate returns functions which call dispatch to make changes in global state

redux calls these two functions through connect and then automatically add them to the props of the component 
passed as argument

*/
