var Visitor = require('tree-visitor');

module.exports = Transformer;

function Transformer() {}
Transformer.prototype = new Visitor();

Transformer.replaceNode = replaceNode;

Transformer.prototype._visitNodes = function (nodes) {
	for (var i = 0; i < nodes.length; i = replaceNode(ret, i, nodes)) {
		var ret = this._visitNode(nodes[i]);
	}
	return nodes;
};

var _visitNode = Visitor.prototype._visitNode;
Transformer.prototype._visitNode = function (node) {
	var ret = _visitNode.call(this, node);
	return ret === undefined ? node : ret;
};

function replaceNode(ret, i, nodes) {
	if (ret === null) {
		if (nodes[i] === null) return i + 1
		nodes.splice(i, 1);
		return i;
	}
	if (Array.isArray(ret)) {
		nodes.splice.apply(nodes, [i, 1].concat(ret));
		return i + ret.length;
	}
	if (ret !== undefined) nodes[i] = ret;
	return i + 1;
}