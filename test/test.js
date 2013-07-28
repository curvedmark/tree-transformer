var assert = require('assert');
var Transformer = require('../Transformer');

describe('Transformer', function () {
	describe('transform a single node', function () {
		it('should return returned value', function () {
			var node = { type: 'number', value: 1 };
			var result  = new Transformer({
				number: function (transformer, number) {
					return 1;
				}
			}).visit(node);
			assert.equal(result, 1);
		});

		it('should return null', function () {
			var node = { type: 'number', value: 1 };
			var result  = new Transformer({
				number: function (transformer, number) {
					return null;
				}
			}).visit(node);
			assert.strictEqual(result, null);
		});

		it('should ignore undefined', function () {
			var node = { type: 'number', value: 1 };
			var result = new Transformer({
				node: function () {}
			}).visit(node);
			assert.equal(result, node);
		});
	});

	describe('transform an array of nodes', function () {
		it('should replace node', function () {
			var nodes = [
				{ type: 'number', value: 1 },
				{ type: 'string', value: 'abc' }
			];
			var result = new Transformer({
				node: function (transformer, node) {
					return node.value;
				}
			}).visit(nodes);
			assert.deepEqual(result, [1, 'abc']);
		});

		it('should flatten result array', function () {
			var nodes = [
				{ type: 'number', value: 1 },
				{ type: 'number', value: 3 }
			];
			var result = new Transformer({
				number: function (transformer, number) {
					return [number.value, number.value + 1];
				}
			}).visit(nodes);
			assert.deepEqual(result, [1, 2, 3, 4]);
		});

		it('should remove node for returned null', function () {
			it('should replace node', function () {
				var nodes = [
					{ type: 'number', value: 1 },
					{ type: 'string', value: 'abc' }
				];
				var result = new Transformer({
					number: function () {
						return null;
					}
				}).visit(nodes);
				assert.deepEqual(result, [{ type: 'string', value: 'abc' }]);
			});
		});

		it('should ignore node for returned undefined', function () {
			it('should replace node', function () {
				var nodes = [
					{ type: 'number', value: 1 },
					{ type: 'string', value: 'abc' }
				];
				var result = new Transformer({
					number: function () {}
				}).visit(nodes);
				assert.deepEqual(result, [
					{ type: 'number', value: 1 },
					{ type: 'string', value: 'abc' }
				]);
			});
		});

		it('should ignore node for having no match action', function () {
			it('should replace node', function () {
				var nodes = [
					{ type: 'number', value: 1 },
					{ type: 'string', value: 'abc' }
				];
				var result = new Transformer({}).visit(nodes);
				assert.deepEqual(result, [
					{ type: 'number', value: 1 },
					{ type: 'string', value: 'abc' }
				]);
			});
		});
	});
});