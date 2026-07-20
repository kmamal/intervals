const { endpoints } = require('@kmamal/interval/endpoints')
const { flatMap } = require('@kmamal/util/array/flat-map')
const { mergeWith } = require('@kmamal/util/array/merge')
const { nextToward } = require('@kmamal/util/ieee-float/double')
const { compareEndpoints } = require('./common/compare-endpoints')
const { pushInterval } = require('./common/push-interval')

const xor = (a, b) => {
	const aPoints = flatMap(a, endpoints)
	const bPoints = flatMap(b, endpoints)

	const points = mergeWith(aPoints, bPoints, compareEndpoints)

	const result = []
	let start = null
	let count = 0
	for (const { type, value } of points) {
		if (type === 'start') {
			count += 1
			if (count === 1) {
				start = value
			}
			else {
				const end = nextToward(value, -Infinity)
				if (start <= end) { pushInterval(result, start, end) }
			}
		}
		else {
			count -= 1
			if (count === 1) {
				start = nextToward(value, Infinity)
			}
			else if (start <= value) {
				pushInterval(result, start, value)
			}
		}
	}
	return result
}

module.exports = { xor }
