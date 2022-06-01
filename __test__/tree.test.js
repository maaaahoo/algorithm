import Tree from '../src/tree';

it('Tree Cases', () => {
  const tree = new Tree();
  expect(tree.size).toEqual(0);

  tree.push('node1');
  tree.push('node2');
  tree.push('node3');
  expect(tree.size).toEqual(3);

  expect(tree.search('node1')).toEqual(true);
  expect(tree.search('node5')).toEqual(false);

  tree.push('node4');
  tree.push('node5');
  tree.push('node6');
  tree.push('node7');
  expect(tree.size).toEqual(7);

  tree.removeBFS('node7');
  expect(tree.size).toEqual(6);

  tree.removeBFS('node2');
  expect(tree.size).toEqual(5);
});

