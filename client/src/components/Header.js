import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">SignIN with Google</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  }
  render() {
    console.log(this.props);

    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={this.props.auth ? "/surveys" : "/"} className="brand-logo">
            Ezio
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps)(Header);

/*
to hook up the component to redux store we import connect then map state to props function 
*/
