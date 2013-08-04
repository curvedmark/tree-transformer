var assert = require('assert');
var Transformer = require('..');

describe('Transformer', function () {
	describe('transform a single node', function () {
		it('should return returned value', function () {
			var node = { type: 'number', value: 1 };

			function MyTransformer() {}
			MyTransformer.prototype = new Transformer();

			MyTransformer.prototype.visit_number = function () {
				 return 1;
			};

			var ret = new MyTransformer().visit(node);
			assert.equal(ret, 1);
		});

		it('should return null', function () {
			var node = { type: 'number', value: 1 };

			function MyTransformer() {}
			MyTransformer.prototype = new Transformer();

			MyTransformer.prototype.visit_number = function () {
				 return null;
			};

			var ret = new MyTransformer().visit(node);
			assert.strictEqual(ret, null);
		});

		it('should ignore undefined', function () {
			var node = { type: 'number', value: 1 };

			function MyTransformer() {}
			MyTransformer.prototype = new Transformer();

			MyTransformer.prototype.visit_number = function () {};

			var ret = new MyTransformer().visit(node);
			assert.equal(ret, node);
		});
	});

	describe('transform an array of nodes', function () {
		it('should replace node', function () {
			var nodes = [
				{ type: 'number', value: 1 },
				{ type: 'string', value: 'abc' }
			];

			function MyTransformer() {}
			MyTransformer.prototype = new Transformer();

			MyTransformer.prototype.visit_node = function (node) {
				 return node.value;
			};

			var ret = new MyTransformer().visit(nodes);
			assert.deepEqual(ret, [1, 'abc']);
		});

		it('should flatten result array', function () {
			var nodes = [
				{ type: 'number', value: 1 },
				{ type: 'number', value: 3 }
			];

			function MyTransformer() {}
			MyTransformer.prototype = new Transformer();

			MyTransformer.prototype.visit_number = function (number) {
				 return [number.value, number.value + 1];
			};

			var ret = new MyTransformer().visit(nodes);
			assert.deepEqual(ret, [1, 2, 3, 4]);
		});

		it('should remove node when null is returned', function () {
			var nodes = [
				{ type: 'number', value: 1 },
				{ type: 'string', value: 'abc' }
			];

			function MyTransformer() {}
			MyTransformer.prototype = new Transformer();

			MyTransformer.prototype.visit_number = function () {
				 return null;
			};

			var ret = new MyTransformer().visit(nodes);
			assert.deepEqual(ret, [{ type: 'string', value: 'abc' }]);
		});

		it('should not remove node if it is null', function () {
			var nodes = [
				null,
				{ type: 'number', value: 1 }
			];

			function MyTransformer() {}
			MyTransformer.prototype = new Transformer();

			MyTransformer.prototype.visit_number = function () {
				 return null;
			};

			var ret = new MyTransformer().visit(nodes);
			assert.deepEqual(ret, [null]);
		});

		it('should return node if undefined is returned', function () {
			var nodes = [
				{ type: 'number', value: 1 },
				{ type: 'string', value: 'abc' }
			];

			function MyTransformer() {}
			MyTransformer.prototype = new Transformer();

			MyTransformer.prototype.visit_number = function () {};

			var ret = new MyTransformer().visit(nodes);
			assert.deepEqual(ret, [
				{ type: 'number', value: 1 },
				{ type: 'string', value: 'abc' }
			]);
		});

		it('should return node if no corresponding method found', function () {
			var nodes = [
				{ type: 'number', value: 1 },
				{ type: 'string', value: 'abc' }
			];

			var ret = new Transformer().visit(nodes);
			assert.equal(ret, nodes);
		});
	});
});