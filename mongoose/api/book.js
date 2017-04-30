module.exports = function(Book) {
	var Service = {
		get: function(query, callback) {
			Book.find(query, function(err,bookCollection) {
				callback(err,bookCollection)
			})
		}
	};
	return Service
}
