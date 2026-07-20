const { endpoints } = require('@kmamal/interval/endpoints')
const { flatMap } = require('@kmamal/util/array/flat-map')
const { mergeWith } = require('@kmamal/util/array/merge')
const { compareEndpoints } = require('./common/compare-endpoints')
const { pushInterval } = require('./common/push-interval')

const intersection = (a, b) => {
	const aPoints = flatMap(a, endpoints)
	const bPoints = flatMap(b, endpoints)

	const points = mergeWith(aPoints, bPoints, compareEndpoints)

	const result = []
	let start = null
	let count = 0
	for (const { type, value } of points) {
		if (type === 'start') {
			count += 1
			if (count === 2) { start = value }
		}
		else {
			if (count === 2) { pushInterval(result, start, value) }
			count -= 1
		}
	}
	return result
}

module.exports = { intersection }
