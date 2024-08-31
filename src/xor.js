const { endpoints } = require('@kmamal/interval/endpoints')
const { flatMap } = require('@kmamal/util/array/flat-map')
const { mergeWith } = require('@kmamal/util/array/merge')
const { compareEndpoints } = require('./common/compare-endpoints')

const xor = (a, b) => {
	const aPoints = flatMap(a, endpoints)
	const bPoints = flatMap(b, endpoints)

	const points = mergeWith(aPoints, bPoints, compareEndpoints)

	const result = []
	let start = null
	let count = 0
	for (const { type, value } of points) {
		count += type === 'start' ? 1 : -1

		if (count === 1) {
			start = value
		} else {
			result.push([ start, value ])
		}
	}
	return result
}

module.exports = { xor }
