const router = require('express').Router()

router.get('/users/signin', (req, res) => {
	res.send('Sign In')
})

router.get('/users/signup', (req, res) => {
	res.send('Authentication')
})

module.exports = router