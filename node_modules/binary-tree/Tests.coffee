vows = require "vows"
assert = require "assert"
require "coffee-script"

BinaryTree = null

construct = (nodes = {}, root = null, duplicating = 0, merging = 1) ->
	getNode = (address, callback) => callback [address, nodes[address]...]
	setLeft = (address, link, callback) =>
		nodes[address][1] = link
		callback [address, nodes[address]...]
	setRight = (address, link, callback) =>
		nodes[address][2] = link
		callback [address, nodes[address]...]
	setNode = (address, left, right, callback) =>
		nodes[address][1] = left
		nodes[address][2] = right
		callback [address, nodes[address]...]
	getRoot = (callback) => callback root
	setRoot = (link, callback) => callback root = link
	new BinaryTree getNode, setLeft, setRight, setNode, getRoot, setRoot, duplicating, merging, yes

equal = -> assert.deepEqual arguments...

vows.describe("BinaryTree").addBatch(
	
	"module":
		"source": -> BinaryTree = require "./BinaryTree.js"
		"directory": -> require "./"
	
	"constructor":
		"is function": -> assert.isFunction BinaryTree
	
	"instance":
		"is object": -> assert.isObject do construct

		"unsafe":
			"is object": ->
				instance = do construct
				assert.isObject instance.unsafe
		
			"travel":
				"traveling": ->
					instance = construct
						0: [1, null, 1], 1: [3, 2, null], 2: [2, null, null]
						null, 0, 1
					
					counter = 0
					instance.unsafe.travel [0, 1, null, 1], (node, next) ->
						counter++
						equal node, [0, 1, null, 1] if counter is 1
						equal node, [1, 3, 2, null] if counter is 2
						equal node, [2, 2, null, null] if counter is 3
						if counter is 1 then next [1, 3, 2, null]
						else if counter is 2 then next [2, 2, null, null]
					equal counter, 3
			
			"double":
				"without duplicating":
					"without duplicates": ->
						instance = construct
							0: [1, null, 1], 1: [2, null, null]
							null, 0, 1
					
						counter = 0
						instance.unsafe.double [0, 1, null, 1], (node, next) ->
							counter++
							equal node, [0, 1, null, 1] if counter is 1
							if next? then do next
						equal counter, 1
						
					"with duplicates": ->
						instance = construct
							0: [1, null, 1], 1: [1, null, null]
							null, 0, 1
					
						counter = 0
						instance.unsafe.double [0, 1, null, 1], (node, next) ->
							counter++
							equal node, [0, 1, null, 1] if counter is 1
							if next? then do next
						equal counter, 1
				
				"duplicating left":
					"left duplicates": ->
						instance = construct
							0: [1, 1, null], 1: [1, null, null]
							null, 1, 1
					
						counter = 0
						instance.unsafe.double [0, 1, 1, null], (node, next) ->
							counter++
							equal node, [0, 1, 1, null] if counter is 1
							equal node, [1, 1, null, null] if counter is 2
							if next? then do next
						equal counter, 2
						
					"right duplicates": ->
						instance = construct
							0: [1, null, 1], 1: [1, null, null]
							null, 1, 1
					
						counter = 0
						instance.unsafe.double [0, 1, null, 1], (node, next) ->
							counter++
							equal node, [0, 1, null, 1] if counter is 1
							if next? then do next
						equal counter, 1
				
				"duplicating right":
					"left duplicates": ->
						instance = construct
							0: [1, 1, null], 1: [1, null, null]
							null, 2, 1
					
						counter = 0
						instance.unsafe.double [0, 1, 1, null], (node, next) ->
							counter++
							equal node, [0, 1, 1, null] if counter is 1
							if next? then do next
						equal counter, 1
						
					"right duplicates": ->
						instance = construct
							0: [1, null, 1], 1: [1, null, null]
							null, 2, 1
					
						counter = 0
						instance.unsafe.double [0, 1, null, 1], (node, next) ->
							counter++
							equal node, [0, 1, null, 1] if counter is 1
							equal node, [1, 1, null, null] if counter is 2
							if next? then do next
						equal counter, 2

			"corner":
				"without duplicating":
					"direction left": ->
						instance = construct
							0: [3, 1, null], 1: [2, 2, null], 2: [1, null, null]
							null, 0, 1
					
						counter = 0
						instance.unsafe.corner [0, 3, 1, null], 1, (node, next) ->
							#console.log [node, next]
							counter++
							equal node, [0, 3, 1, null] if counter is 1
							equal node, [1, 2, 2, null] if counter is 2
							equal node, [2, 1, null, null] if counter is 3
							if next? then do next
						equal counter, 3
					
					"direction right": ->
						instance = construct
							0: [1, null, 1], 1: [2, null, 2], 2: [3, null, null]
							null, 0, 1
					
						counter = 0
						instance.unsafe.corner [0, 1, null, 1], 2, (node, next) ->
							counter++
							equal node, [0, 1, null, 1] if counter is 1
							equal node, [1, 2, null, 2] if counter is 2
							equal node, [2, 3, null, null] if counter is 3
							if next? then do next
						equal counter, 3
				
				"duplicating left":
					"direction left": ->
						instance = construct
							0: [2, 1, null], 1: [2, 2, null], 2: [1, null, null]
							null, 1, 1
					
						counter = 0
						instance.unsafe.corner [0, 2, 1, null], 1, (node, next) ->
							counter++
							equal node, [0, 2, 1, null] if counter is 1
							equal node, [1, 2, 2, null] if counter is 2
							equal node, [2, 1, null, null] if counter is 3
							if next? then do next
						equal counter, 3
					
					"direction right": ->
						instance = construct
							0: [1, 1, null], 1: [1, null, 2], 2: [2, null, null]
							null, 1, 1
					
						counter = 0
						instance.unsafe.corner [0, 1, 1, null], 2, (node, next) ->
							counter++
							equal node, [0, 1, 1, null] if counter is 1
							equal node, [1, 1, null, 2] if counter is 2
							equal node, [2, 2, null, null] if counter is 3
							if next? then do next
						equal counter, 3
				
				"duplicating right":
					"direction left": ->
						instance = construct
							0: [2, null, 1], 1: [2, 2, null], 2: [1, null, null]
							null, 2, 1
					
						counter = 0
						instance.unsafe.corner [0, 2, null, 1], 1, (node, next) ->
							counter++
							equal node, [0, 2, null, 1] if counter is 1
							equal node, [1, 2, 2, null] if counter is 2
							equal node, [2, 1, null, null] if counter is 3
							if next? then do next
						equal counter, 3
					
					"direction right": ->
						instance = construct
							0: [2, null, 1], 1: [2, null, 2], 2: [1, null, null]
							null, 2, 1
					
						counter = 0
						instance.unsafe.corner [0, 2, null, 1], 2, (node, next) ->
							counter++
							equal node, [0, 2, null, 1] if counter is 1
							equal node, [1, 2, null, 2] if counter is 2
							equal node, [2, 1, null, null] if counter is 3
							if next? then do next
						equal counter, 3
			
			"search":
				"without duplicating":
					"from node to node": ->
						instance = construct
							0: [3, 1, null], 1: [1, null, 2], 2: [2, null, null]
							null, 0, 1
						
						counter = 0
						instance.unsafe.search [0, 3, 1, null], [2, 2, null, null], (node, next) ->
							counter++
							equal node, [0, 3, 1, null] if counter is 1
							equal node, [1, 1, null, 2] if counter is 2
							equal node, [2, 2, null, null] if counter is 3
							if next? then do next
						equal counter, 3
					
					"from node to nonexists node": ->
						instance = construct
							0: [4, 1, null], 1: [1, null, 2], 2: [2, null, null]
							0, 0, 1
						
						counter = 0
						instance.unsafe.search [0, 4, 1, null], [3, 3, null, null], (node, next) ->
							counter++
							equal node, [0, 4, 1, null] if counter is 1
							equal node, [1, 1, null, 2] if counter is 2
							equal node, [2, 2, null, null] if counter is 3
							if next? then do next
						equal counter, 3
				
				"left duplicating":
					"from node to node with left duplicates": ->
						instance = construct
							0: [3, 1, null], 1: [1, 2, null], 2: [1, null, 3], 3: [2, null, null]
							null, 1, 1
						
						counter = 0
						instance.unsafe.search [0, 3, 1, null], [3, 2, null, null], (node, next) ->
							counter++
							equal node, [0, 3, 1, null] if counter is 1
							equal node, [1, 1, 2, null] if counter is 2
							equal node, [2, 1, null, 3] if counter is 3
							equal node, [3, 2, null, null] if counter is 4
							if next? then do next
						equal counter, 4
					
					"from node to node with right duplicates": ->
						instance = construct
							0: [3, 1, null], 1: [1, null, 2], 2: [1, null, 3], 3: [2, null, null]
							null, 1, 1
						
						counter = 0
						instance.unsafe.search [0, 3, 1, null], [3, 2, null, null], (node, next) ->
							counter++
							equal node, [0, 3, 1, null] if counter is 1
							equal node, [1, 1, null, 2] if counter is 2
							equal node, [2, 1, null, 3] if counter is 3
							equal node, [3, 2, null, null] if counter is 4
							if next? then do next
						equal counter, 4

				"right duplicating":
					"from node to node with left duplicates": ->
						instance = construct
							0: [3, 1, null], 1: [1, 2, null], 2: [1, null, 3], 3: [2, null, null]
							null, 2, 1
						
						counter = 0
						instance.unsafe.search [0, 3, 1, null], [3, 2, null, null], (node, next) ->
							counter++
							equal node, [0, 3, 1, null] if counter is 1
							equal node, [1, 1, 2, null] if counter is 2
							if next? then do next
						equal counter, 2
					
					"from node to node with right duplicates": ->
						instance = construct
							0: [3, 1, null], 1: [1, null, 2], 2: [1, null, 3], 3: [2, null, null]
							null, 2, 1
						
						counter = 0
						instance.unsafe.search [0, 3, 1, null], [3, 2, null, null], (node, next) ->
							counter++
							equal node, [0, 3, 1, null] if counter is 1
							equal node, [1, 1, null, 2] if counter is 2
							equal node, [2, 1, null, 3] if counter is 3
							equal node, [3, 2, null, null] if counter is 4
							if next? then do next
						equal counter, 4
				
			"attach":
				"node to root": ->
					instance = construct 0: [1, null, null], null, 0, 1
					
					counter = 0
					instance.unsafe.attach null, [0, 1, null, null], (node, next) ->
						counter++
						equal node, null if counter is 1
						equal node, 0 if counter is 2
						equal node, [0, 1, null, null] if counter is 3
						if next? then do next
					equal counter, 3
				
				"without duplicating":
					"node to node": ->
						instance = construct
							0: [1, null, null], 1: [2, null, null]
							null, 0, 1
						
						counter = 0
						instance.unsafe.attach [0, 1, null, null], [1, 2, null, null], (node, next) ->
							counter++
							equal node, [0, 1, null, null] if counter is 1
							equal node, [0, 1, null, 1] if counter is 2
							equal node, [1, 2, null, null] if counter is 3
							if next? then do next
						equal counter, 3
					
					"duplicate to node": ->
						instance = construct
							0: [1, null, null], 1: [1, null, null]
							null, 0, 1
						
						counter = 0
						instance.unsafe.attach [0, 1, null, null], [1, 1, null, null], (node, next) ->
							counter++
							equal node, [0, 1, null, null] if counter is 1
							if next? then do next
						equal counter, 1
					
				"left duplicating":
					"duplicate to empty node": ->
						instance = construct
							0: [1, null, null], 1: [1, null, null]
							null, 1, 1
						
						counter = 0
						instance.unsafe.attach [0, 1, null, null], [1, 1, null, null], (node, next) ->
							counter++
							equal node, [0, 1, null, null] if counter is 1
							equal node, [0, 1, 1, null] if counter is 2
							equal node, [1, 1, null, null] if counter is 3
							if next? then do next
						equal counter, 3
					
					"duplicate to noempty node": ->
						instance = construct
							0: [1, null, 2], 1: [1, null, null], 2: [2, null, null]
							null, 1, 1
						
						counter = 0
						instance.unsafe.attach [0, 1, null, 2], [1, 1, null, null], (node, next) ->
							counter++
							equal node, [0, 1, null, 2] if counter is 1
							equal node, [0, 1, 1, null] if counter is 2
							equal node, [1, 1, null, null] if counter is 3
							equal node, [1, 1, null, 2] if counter is 4
							if next? then do next
						equal counter, 4
				
				"right duplicating":
					"duplicate to noempty node": ->
						instance = construct
							0: [1, null, null], 1: [1, null, null]
							null, 2, 1
						
						counter = 0
						instance.unsafe.attach [0, 1, null, null], [1, 1, null, null], (node, next) ->
							counter++
							equal node, [0, 1, null, null] if counter is 1
							equal node, [0, 1, null, 1] if counter is 2
							equal node, [1, 1, null, null] if counter is 3
							if next? then do next
						equal counter, 3

					"duplicate to noempty node": ->
						instance = construct
							0: [2, 2, 3], 1: [2, null, null], 2: [1, null, null], 3: [3, null, null]
							null, 1, 1
						
						counter = 0
						instance.unsafe.attach [0, 2, 2, 3], [1, 2, null, null], (node, next) ->
							counter++
							equal node, [0, 2, 2, 3] if counter is 1
							equal node, [0, 2, 1, null] if counter is 2
							equal node, [1, 2, null, null] if counter is 3
							equal node, [1, 2, 2, 3] if counter is 4
							if next? then do next
						equal counter, 4
			
			"merge":
				"left noempty node with right noempty node": ->
					instance = construct
						0: [2, 1, 2]
						1: [1, null, null]
						2: [3, null, null]
						3: [5, 3, 4]
						4: [4, null, null]
						5: [6, null, null]
						null, 0, 1
					
					counter = 0
					instance.unsafe.merge [0, 2, 1, 2], [3, 5, 3, 4], (node, next) ->
						counter++
						equal node, [0, 2, 1, 2] if counter is 1
						equal node, [2, 3, null, null] if counter is 2
						equal node, [2, 3, null, 3] if counter is 3
						equal node, [0, 2, 1, 2] if counter is 4
						if next? then do next
					equal counter, 4
				
				"right noempty node with left noempty node": ->
					instance = construct
						0: [2, 1, 2]
						1: [1, null, null]
						2: [3, null, null]
						3: [5, 4, 5]
						4: [4, null, null]
						5: [6, null, null]
						null, 0, 2
					
					counter = 0
					instance.unsafe.merge [0, 2, 1, 2], [3, 5, 4, 5], (node, next) ->
						counter++
						equal node, [3, 5, 4, 5] if counter is 1
						equal node, [4, 4, null, null] if counter is 2
						equal node, [4, 4, 0, null] if counter is 3
						equal node, [3, 5, 4, 5] if counter is 4
						if next? then do next
					equal counter, 4
			
			"detach":
				"empty node from root": ->
					instance = construct
						0: [1, null, null], 0, 0, 1
					
					counter = 0
					instance.unsafe.detach 0, [0, 1, null, null], (node, next) ->
						counter++
						#console.log node
						equal node, [0, 1, null, null] if counter is 1
						equal node, 0 if counter is 2
						equal node, null if counter is 3
						if next? then do next
					equal counter, 3
				
				"node with child from root": ->
					instance = construct
						0: [1, null, 1], 1:[2, null, null], 0, 0, 1
					
					counter = 0
					instance.unsafe.detach 0, [0, 1, null, 1], (node, next) ->
						counter++
						#console.log node
						equal node, [0, 1, null, 1] if counter is 1
						equal node, [0, 1, null, null] if counter is 2
						equal node, 0 if counter is 3
						equal node, 1 if counter is 4
						if next? then do next
					equal counter, 4
				
				"node with children from root": ->
					instance = construct
						0: [2, 1, 2], 1:[1, null, null], 2: [3, null, null], 0, 0, 1
					
					counter = 0
					instance.unsafe.detach 0, [0, 2, 1, 2], (node, next) ->
						counter++
						#console.log node
						equal node, [0, 2, 1, 2] if counter is 1
						equal node, [0, 2, null, null] if counter is 2
						equal node, [1, 1, null, null] if counter is 3
						equal node, [1, 1, null, 2] if counter is 4
						equal node, 0 if counter is 5
						equal node, 1 if counter is 6
						if next? then do next
					equal counter, 6
				
				"empty node from node": ->
					instance = construct
						0: [1, null, 1], 1: [2, null, null], null, 0, 1
					
					counter = 0
					instance.unsafe.detach [0, 1, null, 1], [1, 2, null, null], (node, next) ->
						counter++
						#console.log node
						equal node, [1, 2, null, null] if counter is 1
						equal node, [0, 1, null, 1] if counter is 2
						equal node, [0, 1, null, null] if counter is 3
						if next? then do next
					equal counter, 3
				
				"node with child from node": ->
					instance = construct
						0: [3, 1, null], 1: [1, null, 2], 2: [3, null, null], 0, 0, 1
					
					counter = 0
					instance.unsafe.detach [0, 3, 1, null], [1, 1, null, 2], (node, next) ->
						counter++
						#console.log node
						equal node, [1, 1, null, 2] if counter is 1
						equal node, [1, 1, null, null] if counter is 2
						equal node, [0, 3, 1, null] if counter is 3
						equal node, [0, 3, 2, null] if counter is 4
						if next? then do next
					equal counter, 4
				
				"node with children from node": ->
					instance = construct
						0: [1, null, 1]
						1: [3, 2, 3]
						2: [2, null, null]
						3: [3, null, null]
						0, 0, 1
					
					counter = 0
					instance.unsafe.detach [0, 1, null, 1], [1, 3, 2, 3], (node, next) ->
						counter++
						#console.log node
						equal node, [1, 3, 2, 3] if counter is 1
						equal node, [1, 3, null, null] if counter is 2
						equal node, [2, 2, null, null] if counter is 3
						equal node, [2, 2, null, 3] if counter is 4
						equal node, [0, 1, null, 1] if counter is 5
						equal node, [0, 1, null, 2] if counter is 6
						if next? then do next
					equal counter, 6
				
				"left duplicating":
					"detach duplicate": ->
						instance = construct
							0: [1, 1, null], 1: [1, null, 2], 2: [2, null, null]
							0, 1, 1
						
						counter = 0
						instance.unsafe.detach [0, 1, 1, null], [1, 1, null, 2], (node, next) ->
							counter++
							#console.log node
							equal node, [1, 1, null, 2] if counter is 1
							equal node, [1, 1, null, null] if counter is 2
							equal node, [0, 1, 1, null] if counter is 3
							equal node, [0, 1, null, 2] if counter is 4
							if next? then do next
						equal counter, 4
				
				"right duplicating":
					"detach duplicate": ->
						instance = construct
							0: [2, null, 1], 1: [2, 2, null], 2: [1, null, null]
							0, 2, 1
						
						counter = 0
						instance.unsafe.detach [0, 2, null, 1], [1, 2, 2, null], (node, next) ->
							counter++
							#console.log node
							equal node, [1, 2, 2, null] if counter is 1
							equal node, [1, 2, null, null] if counter is 2
							equal node, [0, 2, null, 1] if counter is 3
							equal node, [0, 2, 2, null] if counter is 4
							if next? then do next
						equal counter, 4

		"safe":
			"is object": ->
				instance = do construct
				assert.isObject instance.safe
		
			"search": ->
				instance = construct
					0: [3, 1, null], 1: [1, null, 2], 2: [2, 3, null], 3: [2, null, null]
					0, 1, 1
				
				counter = 0
				instance.safe.search [3, 2, null, null], (node, next) ->
					counter++
					#console.log node	
					equal node, [0, 3, 1, null] if counter is 1
					equal node, [1, 1, null, 2] if counter is 2
					equal node, [2, 2, 3, null] if counter is 3
					equal node, [3, 2, null, null] if counter is 4
					if next? then do next
				equal counter, 4
			
			"attach":
				"to root": ->
					instance = construct
						0: [1, null, null], null, 0, 1
						
					counter = 0
					instance.safe.attach [0, 1, null, null], (node, next) ->
						counter++
						#console.log node
						equal node, null if counter is 1
						equal node, 0 if counter is 2
						equal node, [0, 1, null, null] if counter is 3
						if next? then do next
					equal counter, 3
			
				"to node": ->
					instance = construct
						0: [1, null, null], 1: [2, null, null], 0, 0, 1
						
					counter = 0
					instance.safe.attach [1, 2, null, null], (node, next) ->
						counter++
						#console.log node
						equal node, [0, 1, null, null] if counter is 1
						equal node, [0, 1, null, 1] if counter is 2
						equal node, [1, 2, null, null] if counter is 3
						if next? then do next
					equal counter, 3

				"to duplicate": ->
					instance = construct
						0: [2, 2, null], 1: [2, null, null], 2: [1, null, null], 0, 2, 1
					
					counter = 0
					instance.safe.attach [1, 2, null, null], (node, next) ->
						counter++
						#console.log node
						equal node, [0, 2, 2, null] if counter is 1
						equal node, [0, 2, null, 1] if counter is 2
						equal node, [1, 2, null, null] if counter is 3
						equal node, [1, 2, 2, null] if counter is 4
						if next? then do next
					equal counter, 4
			
			"detach":
				"from root": ->
					instance = construct
						0: [1, null, null], 0, 0, 1
						
					counter = 0
					instance.safe.detach [0, 1, null, null], (node, next) ->
						counter++
						#console.log node
						equal node, [0, 1, null, null] if counter is 1
						equal node, 0 if counter is 2
						equal node, null if counter is 3
						if next? then do next
					equal counter, 3
				
				"from deep tree": ->
					instance = construct
						0: [4, 1, null]
						1: [1, null, 2]
						2: [3, null, 3]
						3: [3, 4, null]
						4: [2, null, null]
						0, 2, 1
					
					counter = 0
					instance.safe.detach [3, 3, 4, null], (node, next) ->
						counter++
						#console.log node
						equal node, [0, 4, 1, null] if counter is 1
						equal node, [1, 1, null, 2] if counter is 2
						equal node, [2, 3, null, 3] if counter is 3
						equal node, [3, 3, 4, null] if counter is 4
						equal node, [3, 3, null, null] if counter is 5
						equal node, [2, 3, null, 3] if counter is 6
						equal node, [2, 3, 4, null] if counter is 7
						if next? then do next
					equal counter, 7

).export(module)
