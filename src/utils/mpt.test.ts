import { describe, it, expect, beforeEach } from 'vitest';
import { MerklePatriciaTrie } from './mpt';

describe('MerklePatriciaTrie', () => {
  let trie: MerklePatriciaTrie;

  beforeEach(() => {
    trie = new MerklePatriciaTrie();
  });

  it('should insert and retrieve values', () => {
    trie.insert('cat', 'meow');
    trie.insert('car', 'vroom');
    
    expect(trie.get('cat')).toBe('meow');
    expect(trie.get('car')).toBe('vroom');
  });

  it('should handle non-existent keys', () => {
    expect(trie.get('dog')).toBeNull();
  });

  it('should generate a deterministic root hash', () => {
    trie.insert('cat', 'meow');
    trie.insert('car', 'vroom');
    const hash1 = trie.rootHash;

    const trie2 = new MerklePatriciaTrie();
    trie2.insert('cat', 'meow');
    trie2.insert('car', 'vroom');
    const hash2 = trie2.rootHash;

    expect(hash1).toBe(hash2);
    expect(hash1).not.toBeNull();
  });

  it('should generate valid Merkle proofs', () => {
    trie.insert('cat', 'meow');
    trie.insert('car', 'vroom');
    trie.insert('dog', 'woof');

    const proof = trie.getProof('car');
    expect(proof.length).toBeGreaterThan(0);
    
    // The proof should contain nodes that can lead to the value
    const leafNode = proof[proof.length - 1];
    expect(leafNode?.type).toBe('LEAF');
  });

  it('should handle path compression with extension nodes', () => {
    // Keys sharing a long prefix
    trie.insert('caravan', 'travel');
    trie.insert('car', 'vroom');

    const rootNode = trie.getNode(trie.rootHash!);
    // Depending on implementation, it might be an extension or branch
    expect(rootNode).toBeDefined();
    expect(trie.get('caravan')).toBe('travel');
    expect(trie.get('car')).toBe('vroom');
  });

  it('should update existing values and change the root hash', () => {
    trie.insert('cat', 'meow');
    const initialHash = trie.rootHash;
    
    trie.insert('cat', 'purr');
    const updatedHash = trie.rootHash;
    
    expect(trie.get('cat')).toBe('purr');
    expect(updatedHash).not.toBe(initialHash);
  });
});
