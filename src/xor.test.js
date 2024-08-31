const { test } = require('@kmamal/testing')
const { xor } = require('./xor')

test("intervals.xor", (t) => {
	t.equal(xor([], []), [])
	t.equal(xor([], [ [ 1, 2 ] ]), [ [ 1, 2 ] ])
	t.equal(xor([ [ 1, 2 ] ], []), [ [ 1, 2 ] ])
	t.equal(xor([ [ 1, 2 ] ], [ [ 3, 4 ] ]), [ [ 1, 2 ], [ 3, 4 ] ])
	t.equal(xor([ [ 3, 4 ] ], [ [ 1, 2 ] ]), [ [ 1, 2 ], [ 3, 4 ] ])
	t.equal(xor([ [ 1, 3 ] ], [ [ 2, 4 ] ]), [ [ 1, 2 ], [ 3, 4 ] ])
	t.equal(xor([ [ 2, 4 ] ], [ [ 1, 3 ] ]), [ [ 1, 2 ], [ 3, 4 ] ])
	t.equal(xor([ [ 1, 4 ] ], [ [ 2, 3 ] ]), [ [ 1, 2 ], [ 3, 4 ] ])
	t.equal(xor([ [ 2, 3 ] ], [ [ 1, 4 ] ]), [ [ 1, 2 ], [ 3, 4 ] ])
})
