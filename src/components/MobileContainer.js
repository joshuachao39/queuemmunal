import React from "react";
import '../styles/App.css';
import SignIn from './SignIn';
import Home from './Home';
import { Router, Route, browserHistory } from 'react-router';

var MobileContainer = React.createClass({
	render: function() {
		return (
			<Router history={browserHistory}>
				<Route path="/" component={SignIn} />
				<Route path="home" component={Home}/>
			</Router>
		);
	}
});

export default MobileContainer;
