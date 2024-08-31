const { test } = require('@kmamal/testing')
const { union } = require('./union')

test("intervals.union", (t) => {
	t.equal(union([], []), [])
	t.equal(union([], [ [ 1, 2 ] ]), [ [ 1, 2 ] ])
	t.equal(union([ [ 1, 2 ] ], []), [ [ 1, 2 ] ])
	t.equal(union([ [ 1, 2 ] ], [ [ 3, 4 ] ]), [ [ 1, 2 ], [ 3, 4 ] ])
	t.equal(union([ [ 3, 4 ] ], [ [ 1, 2 ] ]), [ [ 1, 2 ], [ 3, 4 ] ])
	t.equal(union([ [ 1, 3 ] ], [ [ 2, 4 ] ]), [ [ 1, 4 ] ])
	t.equal(union([ [ 2, 4 ] ], [ [ 1, 3 ] ]), [ [ 1, 4 ] ])
	t.equal(union([ [ 1, 2 ], [ 3, 4 ] ], [ [ 2, 3 ] ]), [ [ 1, 4 ] ])
	t.equal(union([ [ 2, 3 ] ], [ [ 1, 2 ], [ 3, 4 ] ]), [ [ 1, 4 ] ])
})
