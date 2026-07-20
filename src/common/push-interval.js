const { nextToward } = require('@kmamal/util/ieee-float/double')

const pushInterval = (result, start, end) => {
	const last = result.length > 0 ? result[result.length - 1] : null
	if (last !== null && start <= nextToward(last[1], Infinity)) {
		if (last[1] < end) { last[1] = end }
	}
	else {
		result.push([ start, end ])
	}
}

module.exports = { pushInterval }
