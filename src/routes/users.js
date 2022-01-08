const router = require('express').Router()

const User = require('../models/User')

const passport = require('passport')

router.get('/users/signin', (req, res) => {
	res.render('users/signin')
})

router.post('/users/signin', passport.authenticate('local', {
	successRedirect: '/notes',
	failureRedirect: '/users/signin',
	failureFlash: true
}))

router.get('/users/signup', (req, res) => {
	res.render('users/signup')
})

router.post('/users/signup', async (req, res) => {
	const { name, email, password, confirm_password } = req.body
	const err = []
	if (name == '' || email == '' || password == '' || confirm_password == ''){
		err.push({text: 'Please fill all fields'})
	}
	if (password != confirm_password) {
		err.push({text: 'Password do not match'})
	}
	if (password.lenght < 4){
		err.push({text: 'Password must be at least 4 characters'})
	}
	if (err.length > 0){
		res.render('users/signup', {
			err,
			name,
			email,
			password,
			confirm_password
		})
	} else {
		const emailUser = await User.findOne({ email: email })
		if (emailUser){
			req.flash('error_msg', 'Email is already in use')
			res.redirect('/users/signin')
		}
		const newUser = new User({name, email, password})
		newUser.password = await newUser.encryptPassword(password)
		await newUser.save()
		req.flash('success_msg', 'You are registered')
		res.redirect('/users/signin')
	}
})

router.get('/users/logout', (req, res) => {
	req.logout()
	res.redirect('/')
})

module.exports = router