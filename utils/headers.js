const checkNecessaryHeaders = headers => {
    let necessaryHeaders = [
        'x-access-token',
        'x-platform',
        'x-version',
        'x-timezone'
    ]

    let missingHeaders = necessaryHeaders.filter(header => {
        return !headers[header]
    })

    return missingHeaders.length > 0 ? true : false
}

module.exports = { checkNecessaryHeaders }
