const jwt = require('jsonwebtoken')
const { prop, or, slice, startsWith, pipe, otherwise, then } = require('ramda')

const secret = 'worldisfullofdevelopers'

const getOneOfAccessProp = o => or(prop('x-access-token', o), prop('authorization', o))

const verifyWithSecret = token => new Promise(
	(resolve, reject) => 
		jwt.verify(token, secret, 
			(err, decoded) => err 
				? reject({ success: false, message: 'Token is not valid' }) : resolve(decoded))
)

const success = (req, next) => decoded => {
	req.decoded = decoded
	next()
}

const checkToken = (req, res, next) => {
	const handleVerified = success(req, next)

	const verifyToken = pipe(
		slice(7, Infinity),
		verifyWithSecret,
		then(handleVerified),
		otherwise(res.json)
	)

	const accessProp = getOneOfAccessProp(req.headers)
	console.log(accessProp)
	startsWith('Bearer ', accessProp)
		? verifyToken(accessProp)
		: res.json({ success: false, message: 'Auth token is not supplied' })
}

module.exports = checkToken
