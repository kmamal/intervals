const { test } = require('@kmamal/testing')
const { normalize } = require('./normalize')

test("intervals.normalize", (t) => {
	t.equal(normalize([]), [])
	t.equal(normalize([ [ 1, 2 ] ]), [ [ 1, 2 ] ])
	t.equal(normalize([ [ 1, 2 ], [ 3, 4 ] ]), [ [ 1, 2 ], [ 3, 4 ] ])
	t.equal(normalize([ [ 1, 3 ], [ 2, 4 ] ]), [ [ 1, 4 ] ])
	t.equal(normalize([ [ 1, 2 ], [ 2, 3 ], [ 3, 4 ] ]), [ [ 1, 4 ] ])
	t.equal(normalize([ [ 1, 2 ], [ 2, 3 ], [ 3, 4 ], [ 0, 5 ] ]), [ [ 0, 5 ] ])
	t.equal(normalize([ [ 1, -1 ] ]), [])
})
