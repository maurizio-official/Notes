const router = require('express').Router()

router.get('/notes/add', (req, res) => {
	res.render('notes/new-note')
})

router.post('/notes/new-note', (req, res) => {
	const { title, description } = req.body
	const err = []
	if (!title) {
		err.push({text: 'Please write a title'})
	}
	if (!description) {
		err.push({text: 'Please write a description'})
	}
	if (err.length > 0){
		res.render('notes/new-note', {
			err,
			title,
			description
		})
	} else {
		res.send('Ok')
	}
})

router.get('/notes', (req, res) => {
	res.send('Notes from DB')
})

module.exports = router