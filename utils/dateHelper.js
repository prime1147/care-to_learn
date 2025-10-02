const moment = require('moment-timezone')

class DateHelper {
    constructor(date = new Date(), timezone = 'America/New_York') {
        this.timezone = timezone
        this.date = date
    }

    getYMDDashFormat = () => {
        return moment(this.date).tz(this.timezone).format('YYYY-MM-DD')
    }
    getYMDFormat = () => {
        return moment(this.date).format('YYYY/MM/DD')
    }
    getMDYFormat = () => {
        return moment(this.date).tz(this.timezone).format('MM-DD-YYYY')
    }

    getDMYFormat = () => {
        return moment(this.date).tz(this.timezone).format('DD-MM-YYYY')
    }

    getHMFormat = () => {
        return moment(this.date).tz(this.timezone).format('HH:mm')
    }

    getHMSFormat = () => {
        return moment(this.date).tz(this.timezone).format('HH:mm:ss')
    }

    getHMSMFormat = () => {
        return moment(this.date).tz(this.timezone).format('HH:mm:ss.SSS')
    }

    getMDYHMFormat = () => {
        return moment(this.date).tz(this.timezone).format('MM-DD-YYYY HH:mm')
    }

    getDMYHMFormat = () => {
        return moment(this.date).tz(this.timezone).format('DD-MM-YYYY HH:mm')
    }

    getYMDHMFormat = () => {
        return moment(this.date).tz(this.timezone).format('YYYY-MM-DD HH:mm')
    }

    getMDYHMSFormat = () => {
        return moment(this.date).tz(this.timezone).format('MM-DD-YYYY HH:mm:ss')
    }

    getDMYHMSFormat = () => {
        return moment(this.date).tz(this.timezone).format('DD-MM-YYYY HH:mm:ss')
    }

    getYMDHMSFormat = () => {
        return moment(this.date).tz(this.timezone).format('YYYY-MM-DD HH:mm:ss')
    }

    getMDYHMSMFormat = () => {
        return moment(this.date).tz(this.timezone).format('MM-DD-YYYY HH:mm:ss.SSS')
    }

    getPlusDate = (date, num) => {
        let dd = new Date(date)
        return new Date(dd.setDate(dd.getDate() + num))
    }

    getMinusDate = (date, num) => {
        let dd = new Date(date)
        return new Date(dd.setDate(dd.getDate() - num))
    }
    getYMDFormatWithSlash = () => {
        return moment(this.date).tz(this.timezone).format('MM/DD/YYYY')
    }

    DMYDateFormat = date => {
        return moment(date).format('MM/DD/YYYY')
    }
}

module.exports = DateHelper