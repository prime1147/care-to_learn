const app = require('./app')

const port = process.env.PORT || 3000

// unhandled rejection
process.on('unhandledRejection', reason => {
    console.error(`Unhandled Rejection:${reason.message || reason}`)
    throw new Error(reason.message || reason)
})

// uncaught exception
process.on('uncaughtException', error => {
    console.error(new Date().toUTCString() + ' uncaughtException:', error.message)
    console.error(error.stack)
    process.exit(1)
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})