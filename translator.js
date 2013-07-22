'use strict';

var Visitor = require('ast-visitor');
var inherits = require('util').inherits;

module.exports = Translator;

function Translator(actions) {
	Visitor.apply(this, arguments);
}
inherits(Translator, Visitor);

Translator.prototype._visitNodes = function (nodes) {
	var i = 0;
	while (i < nodes.length) {
		var ret = this._visitNode(nodes[i]);
		i = this._replaceNode(ret, i, nodes);
	}
	return nodes;
};

Translator.prototype._visitNode = function(node) {
	var ret = Visitor.prototype._visitNode.apply(this, arguments);
	return ret === undefined ? node : ret;
};

Translator.prototype._replaceNode = function (ret, i, nodes) {
	if (ret === null) {
		nodes.splice(i, 1);
		return i;
	}
	if (Array.isArray(ret)) {
		nodes.splice.apply(nodes, [i, 1].concat(ret));
		return i + ret.length;
	}
	if (ret !== undefined) nodes[i] = ret;
	return i + 1;
};