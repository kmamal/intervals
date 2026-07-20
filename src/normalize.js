const { endpoints } = require('@kmamal/interval/endpoints')
const { flatMap } = require('@kmamal/util/array/flat-map')
const { sortWith } = require('@kmamal/util/array/sort')
const { compareEndpoints } = require('./common/compare-endpoints')
const { pushInterval } = require('./common/push-interval')

const makePoints = (x) => x[0] <= x[1] ? endpoints(x) : []

const normalize = (intervals) => {
	const points = flatMap(intervals, makePoints)
	sortWith.$$$(points, compareEndpoints)

	const result = []
	let start
	let count = 0
	for (const { type, value } of points) {
		if (type === 'start') {
			count += 1
			if (count === 1) { start = value }
		}
		else {
			count -= 1
			if (count === 0) { pushInterval(result, start, value) }
		}
	}
	return result
}

module.exports = { normalize }
