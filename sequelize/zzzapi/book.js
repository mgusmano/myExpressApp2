module.exports = function(Book) {
	var Service = {
		get: function(res, query, callback) {
			Book.findAll({}).then(collection => {callback(collection)}, 
			function(err) {res.status(500).send(err)})
		},
		post: function(body, callback) {
			Book.create(body).then(instance => {callback(instance)}, 
			function(err) {res.status(500).send(err)})
		},
		getById: function(res, id, callback) {
			Book.findById(id).then(instance => {
				if (instance == null) {res.status(500).send(id + ' not found')}
				else {callback(instance.get({plain:true}))}
			}, 
			function(err) {res.status(500).send(err)})
		},
		delete: function(res, id, callback) {
			Book.destroy({where:{id:id}}).then(deleted => {
				callback(id)
			}, 
			function(err) {res.status(500).send(err)})
		},
		putpatch: function(res, id, newData, callback) {
			Book.update(newData, {where:{id:id}}).then(affected => {
				if (affected[0] == 1) {
					Book.findById(id).then(instance => {callback(instance.get({plain:true}))}, 
					function(err) {res.status(500).send(err)})
				}
				else {res.status(500).send('no rows affected')}
			}, 
			function(err) {res.status(500).send(err)})
		}
	};
	return Service
}
