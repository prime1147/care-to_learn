const { verify } = require('../utils/jwtHelper')
const commnResponse = require('../utils/response')
const { checkNecessaryHeaders } = require('../utils/headers')

module.exports.AuthGuard = function (role) {
    return async function (req, res, next) {
        let { platform, version, timezone } = req.headers
        if (
            checkNecessaryHeaders(req.headers) &&
            !platform &&
            !version &&
            !timezone
        ) {
            let errorMsg = commnResponse.respondGet(
                'Missing some of header parameters'
            )
            return res.status(errorMsg.code).send(errorMsg)
        }

        let token = req.headers['x-access-token']
        if (!token) {
            let errorMsg = commnResponse.respondUnauthorized(
                'Authentication token is missing'
            )
            res.status(errorMsg.code).send(errorMsg)
            return
        }
        const decryptedToken = verify(token)
        if (!decryptedToken) {
            let errorMsg = commnResponse.respondUnauthorized('Token Expired')
            res.status(errorMsg.code).send(errorMsg)
            return
        }
        if (role.length > 0 && role.indexOf(decryptedToken.role) === -1) {
            let errorMsg = commnResponse.respondUnauthorized('Unauthorized Access')
            res.status(errorMsg.code).send(errorMsg)
            return
        }

        req.userDetails = decryptedToken
        next()
    }
}