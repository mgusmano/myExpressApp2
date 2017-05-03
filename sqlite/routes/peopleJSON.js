module.exports = function(db, app, router, dbutil) {
	app.get('/PeopleJSON/:Id', function (req, res) {
		var id = req.params.Id
		sqlPerson = `SELECT * FROM People where id = '${id}';`
		sqlOffice = `SELECT off.* FROM Offices off, People ppl WHERE ppl.id = '${id}' AND ppl.office_id = off.id;`
		sqlOrganization = `SELECT org.* FROM Organizations org, People ppl WHERE ppl.id = '${id}' AND ppl.organization_id = org.id;`
		sqlActions = `SELECT act.* FROM People ppl, Actions act WHERE ppl.id = '${id} AND ppl.id = act.person_id;'`
		sqlManage = `SELECT * FROM Organizations WHERE manager_id = '${id}'`
		Promise.all([
			dbutil.promiseItGet('Person',sqlPerson,db), 
			dbutil.promiseItGet('Office',sqlOffice,db), 
			dbutil.promiseItGet('Organization',sqlOrganization,db), 
			dbutil.promiseItAll('Actions',sqlActions,db),
			dbutil.promiseItGet('Manage',sqlManage,db) 
		]).then(values => {
			if(dbutil.promiseErrors(values) != 0) { return } 
			var person = values[0]
			person.office = values[1]
			person.organization = values[2]
			person.actions = values[3],
			person.manage = values[4]
			res.json({result: 'success', data: person})
		})
	})
}