module.exports = function() {
	//var faker = require("faker");
	var Chance = require("chance");
	var _ = require("lodash");
	var chance = new Chance();
	return {
		people: _.times(100, function(n) {
			return {
				id: n,
				name: chance.name(),
				address: chance.address(),
				city: chance.city(),
				state: chance.state(),
				zip: chance.zip(),
				phone: chance.phone()
			}
		}
		
		
		
		)
	}
}