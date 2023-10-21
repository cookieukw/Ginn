# BinaryTree
0.2.0

`npm install binary-tree`
`git clone https://github.com/vancivelik/BinaryTree.git`

## Terms
`node = [address, key, left, right]`

`Address` is a `string` or a `number`

`address` is `Address`

`key` is a `number`

`left` and `right` is `Address` or `null`

if `left` or `right` is a `null` then right subtree is empty

`handler` is a `function`

`direction` indicates the direction, `1` indicates to the left, `2` indicates to the right

`duplicating` rule indicates duplicating of nodes, 0 disables duplication, 1 includes left, 2 includes right

`merging` rule indicates merging of nodes, works as direction

`debug` is a `boolean`, indicates throw any errors

### Handler variants
`(null, null) ->` not found

`(node, null) ->` last node

`(node, next) ->` not last node

the last returned node - the target node

## Construct

### Server
`BinaryTree = require 'binary-tree'`

### Client
`require ['binary-tree'], (BinaryTree) ->`

## Usage

it gives full modularity
```
getNode = (address, callback) -> callback node # return the node address - address
setLeft = (address, leftLink, callback) ->
	# set at the left sub-node with address - address
	callback node # return the set via the node as getNode
setRight = (address, rightLink, callback) ->
	# set at the right sub-node with address - address
	callback node # return the set via the node as getNode
setNode = (address, leftLink, rightLink, callback) ->
	# set both the left and right subtree of a node with address - address
	callback node # return the set via the node as getNode
getRoot = (callback) -> callback root
setRoot = (link, callback) ->
	# use the link on the root
	callback link
```
`new BinaryTree getNode, setLeft, setRight, setNode, getRoot, setRoot, duplicating, merging, debug`

an example can be seen in the test file Tests.coffee Tests.coffee or Tests.js

to run the tests, you can try `vows Tests.coffee --spec` in console

if you use `grunt` in console, the main file and the test file will be compiled automatically

## Instance
`instance.unsafe.travel node, (node, next) -> next node`
`instance.unsafe.corner node source, direction, (node, next) -> do next`
`instance.unsafe.merge node left, node right, (node, next) -> do next`
`instance.search key target, (node, next) -> do next`
`instance.safe.search node target, (node, next) -> do next handler`
`instance.unsafe.search node source, node target, (node, next) -> do next`
`instance.attach key target, (node, next) -> do next`
`instance.safe.attach node target, (node, next) -> do next`
`instance.unsafe.attach node source, node target, (node, next) -> do next`
`instance.detach address target, (node, next) -> do next`
`instance.safe.detach node target, (node, next) -> do next`
`instance.unsafe.detach node source, node target, (node, next) -> do next`

## Changes
### 0.2.0
Fork [Van Civelik](https://github.com/vancivelik).

Require.js support.

### 0.1.2
Improved documentation.

### 0.1.1
In the constructor method is added setNode, immediately setting the left and right subtree, for increased productivity.

### 0.1.0
Written including, possibly, all behaviors.

Written library performs tests.

The library can be used as a node.js module.

Custom methods passed to the constructor transferred to the sub-object instance.user.
