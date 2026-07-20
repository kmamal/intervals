const { endpoints } = require('@kmamal/interval/endpoints')
const { flatMap } = require('@kmamal/util/array/flat-map')
const { forEach } = require('@kmamal/util/array/for-each')
const { mergeWith } = require('@kmamal/util/array/merge')
const { nextToward } = require('@kmamal/util/ieee-float/double')
const { compareEndpoints } = require('./common/compare-endpoints')
const { pushInterval } = require('./common/push-interval')

const difference = (a, b) => {
	const makeEndpointA = (y) => { y.source = a }
	const makeEndpointB = (y) => { y.source = b }
	const aPoints = flatMap(a, (x) => forEach(endpoints(x), makeEndpointA))
	const bPoints = flatMap(b, (x) => forEach(endpoints(x), makeEndpointB))

	const points = mergeWith(aPoints, bPoints, compareEndpoints)

	const result = []
	let start = null
	let count = 0
	for (const { type, value, source } of points) {
		if (type === 'start') {
			count += 1
			if (count === 1 && source === a) {
				start = value
			}
			else if (count === 2 && source === b) {
				const end = nextToward(value, -Infinity)
				if (start <= end) { pushInterval(result, start, end) }
			}
		}
		else {
			count -= 1
			if (count === 0 && source === a && start <= value) {
				pushInterval(result, start, value)
			}
			else if (count === 1 && source === b) {
				start = nextToward(value, Infinity)
			}
		}
	}
	return result
}

module.exports = { difference }
