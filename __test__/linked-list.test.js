import LinkedList from '../src/linked-list';


it('LinkedList Cases', () => {
  const lk = new LinkedList();
  expect(lk.length).toEqual(0);

  lk.add('first');
  expect(lk.length).toEqual(1);

  const node = lk.find('first');
  expect(node.val).toEqual('first');

  lk.add('three');
  lk.add('four');
  expect(lk.length).toEqual(3);

  lk.insert('second', 'first');
  expect(lk.length).toEqual(4);
  expect(lk.head.next.next.val).toEqual('second');

  lk.remove('four');
  const node2 = lk.find('four');
  expect(node2.val).toEqual('three');
});

