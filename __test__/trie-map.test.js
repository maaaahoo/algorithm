import TrieMap from '../src/trie-map';

it('TrieMap Cases', () => {
  let trie = new TrieMap();

  trie.insert('apple');
  trie.insert('appcd');
  trie.insert('banana');

  const contain = trie.search("apple");
  expect(contain).toEqual(true);
});

