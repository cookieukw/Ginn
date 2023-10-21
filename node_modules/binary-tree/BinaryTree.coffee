BinaryTree = constructor = (
	userGetNode, userSetLeft, userSetRight, userSetNode, userGetRoot, userSetRoot
	duplicating, merging, debug
) ->
	
	# Aliases
	binaryTree = instance = this
	
	# Aethods of validation
	instance.is = valid =
		array: (argument) -> Object.prototype.toString.call(argument) is "[object Array]"
		boolean: (argument) -> typeof argument is "boolean"
		function: (argument) -> typeof argument is "function"
		direction: (argument) -> argument in [1, 2]
		merging: (argument) -> valid.direction (argument)
		duplicating: (argument) -> argument in [0, 1, 2]
		key: (argument) -> typeof argument is "number"
		address: (argument) -> typeof argument in ["string", "number"]
		link: (argument) -> valid.address(argument) or argument is null
		node: (argument) -> valid.array(argument) and argument.length is 4 and valid.address(argument[0]) and valid.key(argument[1]) and valid.link(argument[2]) and valid.link(argument[3])
		cursor: (argument) -> argument is null or valid.address(argument) or valid.node(argument)
		pointer: (argument) -> argument is null or valid.node(argument)
		nodeOrAddress: (argument) -> valid.address(argument) or valid.node(argument)
	
	# Aethods of assertion
	instance.assert = assert = {}
	do ->
		create =
			if debug
				(key, method) -> assert[key] = (argument) ->
					if not method(argument) then throw new Error key+" "+argument
			else (key) -> assert[key] = ->
		for key, method of valid
			create key, method
	
	# Wrap arguments
	assert.duplicating duplicating
	assert.merging merging
	assert.boolean debug
	
	instance.user = {}
	if debug
		instance.user.getNode = getNode = (address, callback) ->
			assert.address address
			userGetNode address, (node) ->
				assert.node node
				callback node

		instance.user.setLeft = setLeft = (address, link, callback) ->
			assert.address address
			assert.link link
			userSetLeft address, link, (node) ->
				assert.node node
				callback node

		instance.user.setRight = setRight = (address, link, callback) ->
			assert.address address
			assert.link link
			userSetRight address, link, (node) ->
				assert.node node
				callback node
		
		instance.user.setNode = setNode = (address, left, right, callback) ->
			assert.address address
			assert.link left
			assert.link right
			userSetNode address, left, right, (node) ->
				assert.node node
				callback node

		instance.user.getRoot = getRoot = (callback) ->
			userGetRoot (root) ->
				assert.link root
				callback root

		instance.user.setRoot = setRoot = (link, callback) ->
			assert.link link
			userSetRoot link, (root) ->
				assert.link root
				callback root
	else
		instance.user.getNode = getNode = userGetNode
		instance.user.setLeft = setLeft = userSetLeft
		instance.user.setRight = setRight = userSetRight
		instance.user.setNode = setNode = userSetNode
		instance.user.getRoot = getRoot = userGetRoot
		instance.user.setRoot = setRoot = userSetRoot
	
	# Unsafe
	instance.unsafe = {}

	# Unsafe Travel
	instance.unsafe.travel = unsafeTravel = (node, handler) ->
		assert.node node
		assert.function handler
		
		action = (node) ->
			handler node, (node) ->
				assert.node node
				action node
	
		action node

	# Unsafe Double
	duplicatingDirection = duplicating+1

	instance.unsafe.double = unsafeDouble = (node, handler) ->
		assert.node node
		assert.function handler
		
		unsafeDoubleTravel node, handler
	
	unsafeDoubleTravel =
		if duplicating is 0 then (node, handler) -> handler node, null
		else (node, handler) ->	unsafeTravel node, unsafeDoubleHandler node, handler
	
	unsafeDoubleHandler = (first, handler) -> (node, next) ->
		if node[duplicatingDirection]?
			getNode node[duplicatingDirection], (duplicate) ->
				if duplicate[1] is first[1]
					handler node, -> next duplicate
				else handler node, null
		else handler node, null
	
	# Unsafe Corner
	instance.unsafe.corner = unsafeCorner = (node, direction, handler) ->
		assert.node node
		assert.direction direction
		assert.function handler
		
		direct = direction+1
		
		unsafeTravel node, (nodeT, nextT) ->
			unsafeDouble nodeT, (nodeD, nextD) ->
				if nextD? then handler nodeD, -> do nextD
				else if nodeD[direct]? then handler nodeD, ->
					getNode nodeD[direct], nextT
				else handler nodeD, null
		
	# Unsafe Search
	instance.unsafe.search = unsafeSearch = (source, target, handler) ->
		assert.cursor source
		assert.node target
		assert.function handler
		
		if source is null then handler null, null
		else
			if valid.address(source) then getNode source, (source) ->
				unsafeSearchAction source, target, handler
			else unsafeSearchAction source, target, handler
	
	unsafeSearchAction = (source, target, handler) ->
		unsafeTravel source, (nodeT, nextT) ->
			unsafeDouble nodeT, (nodeD, nextD) ->
				if nodeD[0] is target[0] then handler nodeD, null
				else if nextD? then handler nodeD, -> do nextD
				else if nodeD[1] > target[1]
					if nodeD[2]? then handler nodeD, -> getNode nodeD[2], nextT
					else handler nodeD, null
				else if nodeD[1] < target[1]
					if nodeD[3]? then handler nodeD, -> getNode nodeD[3], nextT
					else handler nodeD, null
				else handler nodeD, null
	
	# Unsafe Attach
	instance.unsafe.attach = unsafeAttach = (source, target, handler) ->
		assert.pointer source
		assert.node target
		assert.function handler
		
		if source is null
			handler source, -> setRoot target[0], (root) ->
				handler root, -> handler target, null
		else if source[1] is target[1]
			unsafeAttachDuplicates source, target, handler
		else if source[1] > target[1]
			handler source, -> setLeft source[0], target[0], (node) ->
				handler node, -> handler target, null
		else if source[1] < target[1]
			handler source, -> setRight source[0], target[0], (node) ->
				handler node, -> handler target, null
		else throw new Error "unexpected"
	
	unsafeAttachDuplicates =
		if duplicating is 0 then (source, target, handler) -> handler source, null
		else if duplicating is 1 then (source, target, handler) -> unsafeAttachDuplicatesOn source, target, handler, setLeft, setLeft, setRight
		else if duplicating is 2 then (source, target, handler) -> unsafeAttachDuplicatesOn source, target, handler, setRight, setRight, setLeft
	
	unsafeAttachDuplicatesOn = (source, target, handler, methods...) -> handler source, ->
		if not source[2]? and not source[3]?
			methods[0] source[0], target[0], (source) -> handler source, ->
				handler target, null
		else
			methods[1] source[0], target[0], -> methods[2] source[0], null, (newSource) ->
				handler newSource, -> handler target, ->
					setNode target[0], source[2], source[3], (target) ->
						handler target, null
	
	# Unsafe Merge
	instance.unsafe.merge = unsafeMerge = (left, right, handler) ->
		assert.node left
		assert.node right
		assert.function handler
		
		unsafeMergeAction left, right, handler
	
	unsafeMergeAction =
		if merging is 1 then (left, right, handler) ->
			unsafeCorner left, 2, (node, next) ->
				if next? then handler node, next
				else handler node, -> setRight node[0], right[0], (last) ->
					if last[0] is left[0] then handler last, null
					else handler last, -> handler left, null

		else if merging is 2 then (left, right, handler) ->
			unsafeCorner right, 1, (node, next) ->
				if next? then handler node, next
				else handler node, -> setLeft node[0], left[0], (last) ->
					if last[0] is right[0] then handler last, null
					else handler last, -> handler right, null
	
	# Unsafe Detach
	instance.unsafe.detach = unsafeDetach = (source, target, handler) ->
		assert.cursor source
		assert.node target
		assert.function handler
		
		if source is null then handler target, -> handler source, null
		
		else if valid.address(source) then handler target, ->
			unsafeDetachResult target, handler, (result) ->
				handler source, ->
					setRoot result, (root) ->
						handler root, null
		
		else if source[1] is target[1] then handler target, ->
			setLeft target[0], null, -> setRight target[0], null, (newTarget) ->
				handler newTarget, -> handler source, ->
					setLeft source[0], target[2], ->
						setRight source[0], target[3], (source) ->
							handler source, null
		
		else handler target, -> unsafeDetachResult target, handler, (result) ->
			handler source, ->
				if source[2] is target[0]
					unsafeDetachChange setLeft, source, target, result, handler
				else if source[3] is target[0]
					unsafeDetachChange setRight, source, target, result, handler
	
	unsafeDetachResult = (target, handler, callback) ->
		if not target[2]? and not target[3]? then callback null
		else if target[2]? and not target[3]?
			setLeft target[0], null, (newTarget) ->
				handler newTarget, -> callback target[2]
		else if not target[2]? and target[3]?
			setRight target[0], null, (newTarget) ->
					handler newTarget, -> callback target[3]
		else if target[2]? and target[3]?
			getNode target[2], (left) -> getNode target[3], (right) ->
				setNode target[0], null, null, (target) ->
					handler target, ->
						unsafeMerge left, right, (node, next) -> handler node, ->
							if next? then do next
							else callback node[0]
	
	unsafeDetachChange = (method, source, target, result, handler) ->
		method source[0], result, (source) ->
			handler source, null
	
	# Safe
	instance.safe = {}
	
	# Safe Search
	instance.safe.search = safeSearch = (target, handler) ->
		assert.node target
		assert.function handler
		
		getRoot (root) ->
			if root? then getNode root, (root) -> unsafeSearch root, target, handler
			else handler null, null
	
	# Safe Attach
	instance.safe.attach = safeAttach = (target, handler) ->
		assert.node target
		assert.function handler
		
		getRoot (root) ->
			if root? then getNode root, (root) ->
				unsafeSearch root, target, (node, next) ->
					if next? then handler node, next
					else unsafeAttach node, target, handler
			else unsafeAttach root, target, handler
	
	# Safe Detach
	instance.safe.detach = safeDetach = (target, handler) ->
		assert.node target
		assert.function handler
	
		getRoot (root) ->
			if not root? then handler null, null
			else if root is target[0] then unsafeDetach root, target, handler
			else getNode root, (root) ->
				last = null
				unsafeSearch root, target, (node, next) ->
					if next?
						last = node
						handler node, next
					else if node[0] is target[0]
						unsafeDetach last, node, handler
	
	# Search
	instance.search = search = (target, handler) ->
		assert.address target
		assert.function handler
		
		getNode target, (target) -> safeSearch target, handler
	
	# Attach
	instance.attach = attach = (target, handler) ->
		assert.address target
		assert.function handler
		
		getNode target, (target) -> safeAttach target, handler
	
	# Detach
	instance.detach = detach = (target, handler) ->
		assert.address target
		assert.function handler
		
		getNode target, (target) -> safeDetach target, handler
	
	return instance

# Require
if typeof(global) isnt 'undefined' then module.exports = constructor
else if typeof(window) isnt 'undefined' then define ['module'], (module) -> module.exports = constructor