# Tree Transformer

Transform nodes in the tree.

Like [Tree Visitor](https://github.com/curvedmark/tree-visitor), but methods can return a value to replace the node being processed.

## API

```javascript
var Transformer = require('tree-transformer');
var nodes = [
	{ type: 'number', value: 1 },
	{ type: 'string', value: 'abc', quote: '"' }
];

function MyTransformer() {}
MyTransformer.prototype = new Transformer();

MyTransformer.prototype.visit_node = function (node) {
	 return node.value;
};

new MyTransformer().visit(nodes); // nodes now equals to [1, 'abc']
```

Replacing only happens when visit an array of nodes.

Some returned values have special meanings:

* `null` - remove the node
* `undefined` - do nothing to the node
* an array of nodes - replace the node with the array of nodes. The result array is flattened.

	```javascript
	var Transformer = require('tree-transformer');
	var nodes = [
		{ type: 'number', value: 1 }
		{ type: 'number', value: 3 }
	];

	function MyTransformer() {}
	MyTransformer.prototype = new Transformer();

	MyTransformer.prototype.visit_number = function (number) {
	   return [number.value, number.value + 1];
	};

	new MyTransformer().visit(nodes); // nodes now equals to [1, 2, 3, 4]
	```
* others - replace the node with the value

When visiting a single node, `visit(node)` returns the returning value of the corresponding method, unless it's `undefined`, in which case the original node will be returned.

When visiting an array of nodes, the result array will be returned.