import React from 'react';
import * as firebase from 'firebase';

let Home = React.createClass({
	render: function() {
		let user = firebase.auth().currentUser;
		console.log(user);
		return (
			<div>
				This is the home page!
			</div>
		);
	}
});

export default Home;