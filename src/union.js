const { endpoints } = require('@kmamal/interval/endpoints')
const { flatMap } = require('@kmamal/util/array/flat-map')
const { mergeWith } = require('@kmamal/util/array/merge')
const { compareEndpoints } = require('./common/compare-endpoints')

const union = (a, b) => {
	const aPoints = flatMap(a, endpoints)
	const bPoints = flatMap(b, endpoints)

	const points = mergeWith(aPoints, bPoints, compareEndpoints)

	const result = []
	let start
	let count = 0
	for (const { type, value } of points) {
		if (type === 'start') {
			count += 1
			if (count === 1) { start = value }
		} else {
			count -= 1
			if (count === 0) { result.push([ start, value ]) }
		}
	}
	return result
}

module.exports = { union }
