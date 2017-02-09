import React from "react";
import '../styles/App.css';
import SignIn from './SignIn';
import Navigation from './Navigation';
import Rooms from './Rooms';
import Profile from './Profile';
import Library from './Library';
import Queue from './Queue';
import Roommates from './Roommates';
import RoomNavigation from './RoomNavigation';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';


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
				<Route path="mobile" component={Navigation}>
					<IndexRoute component={Rooms} />
					<Route path="Profile" component={Profile} />
					<Route path="My Library" component={Library} />
					<Route path="rooms" component={RoomNavigation}>
						<Route path="room1">
							<IndexRoute component={Queue} />
							<Route path="roommates" component={Roommates} />
						</Route>
					</Route>
				</Route> 
			</Router>
		);
	}
});

export default MobileContainer;
