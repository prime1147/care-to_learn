class ConditionFilters {
    constructor() { }

    searchCondition = (search, ...parameters) => {
        if (!search || !parameters?.length) {
            return {}
        }

        // Split by spaces → ["john", "smith"]
        const keywords = search.split(/\s+/).filter(Boolean)

        // For each keyword, match across all parameters (fields)
        const searchConditions = keywords.map(keyword => ({
            OR: parameters.map(field => ({
                [field]: {
                    contains: keyword,
                    mode: 'insensitive'
                }
            }))
        }))

        // All keywords must match (in any field)
        return {
            AND: searchConditions
        }
    }

    whereCondition = (data) => {
        const conditionPayload = {}

        for (const key in data) {
            if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
                conditionPayload[key] = data[key]
            }
        }

        return conditionPayload
    }
}

module.exports = new ConditionFilters()
