const { endpoints } = require('@kmamal/interval/endpoints')
const { flatMap } = require('@kmamal/util/array/flat-map')
const { forEach } = require('@kmamal/util/array/for-each')
const { mergeWith } = require('@kmamal/util/array/merge')
const { compareEndpoints } = require('./common/compare-endpoints')

const intersection = (a, b) => {
	const makeEndpointA = (y) => { y.source = a }
	const makeEndpointB = (y) => { y.source = b }
	const aPoints = flatMap(a, (x) => forEach(endpoints(x), makeEndpointA))
	const bPoints = flatMap(b, (x) => forEach(endpoints(x), makeEndpointB))

	const points = mergeWith(aPoints, bPoints, compareEndpoints)

	const result = []
	let start = null
	let count = 0
	for (const { type, value } of points) {
		if (type === 'start') {
			count += 1
			if (count === 2) { start = value }
		} else {
			if (count === 2) { result.push([ start, value ]) }
			count -= 1
		}
	}
	return result
}

module.exports = { intersection }
