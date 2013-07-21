'use strict';

module.exports = Translator;

function Translator(actions) {
	this._actions = actions;
}

Translator.prototype.visit = function(node) {
	if (Array.isArray(node)) return this._visitNodes(node);
	else return this._visitNode(node);
};

Translator.prototype._visitNodes = function (nodes) {
	var i = 0;
	while (i < nodes.length) {
		var ret = this._visitNode(nodes[i]);
		i = this._replaceNode(ret, i, nodes);
	}
	return nodes;
};

Translator.prototype._visitNode = function(node) {
	if (node !== Object(node)) return node;
	if (!node.type) return node;
	var action = this._actions[node.type] || this._actions.node;
	if (action) {
		var ret = action.call(this, node);
		return ret === undefined ? node : ret;
	}
};

Translator.prototype._replaceNode = function (node, i, nodes) {
	if (node === null) {
		nodes.splice(i, 1);
		return i;
	}
	if (Array.isArray(node)) {
		nodes.splice.apply(nodes, [i, 1].concat(node));
		return i + node.length;
	}
	if (node !== undefined) nodes[i] = node;
	return i + 1;
};