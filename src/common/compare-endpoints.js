
const compareEndpoints = (a, b) => {
	if (a.value !== b.value) { return a.value - b.value }
	if (a.type !== b.type) { return a.type === 'start' ? -1 : 1 }
	return 0
}

module.exports = { compareEndpoints }
