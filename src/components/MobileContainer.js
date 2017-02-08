import React from "react";
import '../styles/App.css';
import SignIn from './SignIn';
import Navigation from './Navigation';
import { Router, Route, browserHistory } from 'react-router';


/* let routes = {
	path: '/', 
	component: SignIn,
	childRoutes: [
		{ path: '/home', component: Home }
	]
}; */
var MobileContainer = React.createClass({
	render: function() {
		return (
			<Router history={browserHistory}>
				<Route path="/" component={SignIn} />
				<Route path="mobile" component={Navigation} /> 
			</Router>
		);
	}
});

export default MobileContainer;
