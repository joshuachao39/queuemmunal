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
import SignUp from './SignUp';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';

var MobileContainer = React.createClass({
	render: function() {
		return (
    			<Router history={browserHistory}>
    				<Route path="/" component={SignIn} />
                    <Route path="/SignUp" component={SignUp} />
    				<Route path="mobile" component={Navigation}>
    					<IndexRoute component={Rooms} />
                        <Route path="/mobile/rooms/:roomName" component={RoomNavigation}>
                            <IndexRoute component={Queue} />
                            <Route path="/mobile/rooms/:roomName/roommates" component={Roommates} />
                        </Route>
    					<Route path="Profile" component={Profile} />
    					<Route path="My Library" component={Library} />
    				</Route>
    			</Router>
		);
	}
});

export default MobileContainer;
