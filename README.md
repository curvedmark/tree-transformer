# Tree Transformer

Translate nodes in the tree.

Like [Tree Visitor](https://github.com/curvedmark/tree-visitor), but actions can return a value to replace the node being processed.

## API

```javascript
var Transformer = require('tree-transformer');

var nodes = [
	{ type: 'number', value: 1 },
	{ type: 'string', value: 'abc', quote: '"' }
];
var transformer = new Transformer({
	node: function (transformer, node) {
	    return node.value;
	}
});
transformer.visit(nodes); // nodes now equals to [1, 'abc']
```

Replacing only happens when visit an array of nodes.

Some returned values have special meanings:

* `null` - remove the node (unless the node itself is 'null', in which case it's ignored)
* `undefined` - do nothing to the node
* an array of nodes - replace the node with the array of nodes, but the result array is flattened.

  ```javascript
  	var Transformer = require('tree-transformer');

  	var nodes = [
  		{ type: 'number', value: 1 }
  		{ type: 'number', value: 3 }
  	];
  	var transformer = new Transformer({
  		number: function (transformer, number) {
  		    return [number.value, number.value + 1];
  		}
  	});
  	transformer.visit(nodes); // nodes now equals to [1, 2, 3, 4]
  ```
* others - replace the node with the value

When visiting a single node, `visit(node)` returns the returned value of the corresponding action, unless the action returns `undefined`, in which case the original node is returned.

When visiting an array of nodes, the result array is returned.