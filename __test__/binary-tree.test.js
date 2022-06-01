import BinaryTree from '../src/binary-tree';

it('BinaryTree Cases', () => {
  const tree = new BinaryTree();
  expect(tree.size).toEqual(0);

  tree.push(3);
  tree.push(28);
  tree.push(44);
  tree.push(2);
  tree.push(11);
  tree.push(8);
  tree.push(7);
  tree.push(4);
  tree.push(3);

  expect(tree.size).toEqual(9);
  expect(tree.inOrder()).toEqual([2, 3, 3, 4, 7, 8, 11, 28, 44])

  tree.remove(3);
  tree.remove(28);

  expect(tree.inOrder()).toEqual([2, 3, 4, 7, 8, 11, 44])
  expect(tree.size).toEqual(7);
});

