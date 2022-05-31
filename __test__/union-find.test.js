import UnionFind from '../src/union-find';

it('Union-Find Cases', () => {
  const uf = new UnionFind(5);
  expect(uf.count).toEqual(5);

  uf.union(0,1);
  expect(uf.count).toEqual(4);
  expect(uf.connected(0,1)).toEqual(true);
  expect(uf.connected(1,0)).toEqual(true);
  expect(uf.connected(1,2)).toEqual(false);

  uf.union(1,2);
  expect(uf.count).toEqual(3);
  expect(uf.connected(0,1)).toEqual(true);
  expect(uf.connected(1,2)).toEqual(true);
});