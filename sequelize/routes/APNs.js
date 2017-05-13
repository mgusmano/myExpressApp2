module.exports = function(sequelize, app, router, dbutil, models) {

	app.get('/APNs', function (req, res) {

		var apn = require('apn');

		var options = {
			token: {
				key: "APNsAuthKey_36P9U59FBH.p8",
				keyId: "36P9U59FBH",
				teamId: "HFGYQM2MC2"
			},
			production: false
		};
		
		var apnProvider = new apn.Provider(options);

		let deviceToken = "1532A98A5F8DC663E7C9FC1FDF64297B3B8F591044181AFF8CFC8718E9D73244"

		var note = new apn.Notification();
		
		note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now. 
		note.badge = 5;
		note.sound = "a_sound.aiff" //ping.aiff";
		note.alert = "\uD83D\uDCE7 \u2709 You have a new message from Azure";
		note.payload = {'messageFrom': 'John Appleseed'};
		note.topic = "com.gusmano.Examples";

		apnProvider.send(note, deviceToken).then( (result) => {
			// see documentation for an explanation of result 
		});






		res.json({result: "success"})
	})

}