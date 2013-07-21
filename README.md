# AST Translator

Translate nodes in the abstract syntax tree.

Like [AST Visitor](https://github.com/curvedmark/ast-visitor), but actions can return a value to replace the node being processed.

## API

```javascript
var Translator = require('ast-translator');

var nodes = [
	{ type: 'number', value: 1 },
	{ type: 'string', value: 'abc', quote: '"' }
];
var translator = new Translator({
	node: function (node) {
	    return node.value;
	}
});
translator.visit(nodes); // nodes now equals to [1, 'abc']
```

Replacing only happens when visit an array of nodes.

Some returned values have special meanings:

* `null` - remove the node
* `undefined` - do nothing to the node
* an array of nodes - replace the node with the array of nodes, but the result array is flattened.

  ```javascript
  	var Translator = require('ast-translator');

  	var nodes = [
  		{ type: 'number', value: 1 }
  		{ type: 'number', value: 3 }
  	];
  	var translator = new Translator({
  		number: function (number) {
  		    return [number.value, number.value + 1];
  		}
  	});
  	translator.visit(nodes); // nodes now equals to [1, 2, 3, 4]
  ```
* others - replace the node with the value

When visiting a single node, `visit(node)` returns the returned value of the corresponding action, unless the action returns `undefined`, in which case the original node is returned.

When visiting an array of nodes, the result array is returned.