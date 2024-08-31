const { endpoints } = require('@kmamal/interval/endpoints')
const { flatMap } = require('@kmamal/util/array/flat-map')
const { forEach } = require('@kmamal/util/array/for-each')
const { mergeWith } = require('@kmamal/util/array/merge')
const { compareEndpoints } = require('./common/compare-endpoints')

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
			} else if (count === 2 && source === b && start !== value) {
				result.push([ start, value ])
			}
		} else {
			count -= 1
			if (count === 0 && source === a && start !== value) {
				result.push([ start, value ])
			} else if (count === 1 && source === b) {
				start = value
			}
		}
	}
	return result
}

module.exports = { difference }
