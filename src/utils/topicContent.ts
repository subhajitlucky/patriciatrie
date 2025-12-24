export interface TopicContent {
  id: string;
  title: string;
  definition: string;
  analogy: string;
  deepDive: string;
  steps: {
    title: string;
    description: string;
  }[];
  visualType: string;
}

export const topicData: Record<string, TopicContent> = {
  'why-trie': {
    id: 'why-trie',
    title: 'Why Blockchain State?',
    definition: 'Distributed ledgers require a state transition function that is both efficient and cryptographically verifiable. The "State Explosion" problem necessitated a data structure that could map a large address space to a fixed-size Merkle Root.',
    analogy: 'A library where every book contributes to a single DNA sequence. Change one letter in one book, and the DNA is completely different.',
    deepDive: 'Standard Merkle Trees are optimal for static datasets. However, blockchain state is dynamic and sparse. A Patricia Trie (Practical Algorithm to Retrieve Information Coded in Alphanumeric) provides a deterministic, authenticated key-value store that supports O(log N) updates and efficient inclusion proofs.',
    steps: [
      { title: 'Global Consensus', description: "Nodes reach agreement on the State Root. If your local trie's root matches the network, your state is mathematically guaranteed to be identical." },
      { title: 'Merkle Integrity', description: 'Every node in the trie is identified by the hash of its content, making the structure self-verifying.' },
      { title: 'Incremental Hashing', description: 'When a value changes, only the hashes along the path to the root require re-computation, minimizing I/O and CPU overhead.' }
    ],
    visualType: 'state'
  },
  'trie-vs-map': {
    id: 'trie-vs-map',
    title: 'Trie vs Tree vs Map',
    definition: 'Patricia Tries combine the prefix-based search efficiency of Tries with the cryptographic properties of Merkle Trees, offering O(k) lookup complexity where k is the key length.',
    analogy: 'A regular Tree is like a search where you check every possible path, while a Trie is like a GPS that tells you exactly which turns to take based on the address.',
    deepDive: 'Unlike Binary Search Trees which are O(log N) and depend on entry count, Tries are O(k) and depend on key length. For 256-bit hashes, this ensures a maximum depth of 64 nibbles, regardless of whether the state contains 1 million or 1 billion accounts.',
    steps: [
      { title: 'BST Comparison', description: 'Binary Search Trees require rebalancing (like AVL) and are not natively deterministic for Merkle hashing.' },
      { title: 'Radix-16 Trie', description: 'The Trie structure follows the key nibbles directly. The "prefix" property ensures that keys with shared beginnings share the same physical path.' },
      { title: 'Deterministic Storage', description: 'The structural constraints of the Patricia Trie ensure that the same dataset always produces the exact same tree shape and hash.' }
    ],
    visualType: 'nodes'
  },
  'nibble-paths': {
    id: 'nibble-paths',
    title: 'Key Encoding (Nibbles)',
    definition: 'To balance branching factor and tree depth, the trie segments 256-bit keys into 4-bit "nibbles," creating a Radix-16 search space.',
    analogy: 'Imagine an apartment building with 16 floors, each floor has 16 hallways, and each hallway has 16 doors.',
    deepDive: 'Each Branch node contains 16 pointers (0-F). By using nibbles, we trade memory for speed: a 16-way branch reduces the total tree depth compared to a binary trie, significantly reducing the number of disk reads required for state lookups.',
    steps: [
      { title: 'Binary Segmentation', description: 'Bytes are decomposed into high and low nibbles. 0xA7 becomes [10, 7].' },
      { title: 'Path Traversal', description: 'The current nibble serves as an index into the Branch node\'s array of child hashes.' },
      { title: 'Hex-Prefix Optimization', description: 'Special flags are prepended to paths to distinguish between Leaf and Extension nodes and to handle odd-length paths.' }
    ],
    visualType: 'encoding'
  },
  'node-types': {
    id: 'node-types',
    title: 'Branch, Extension, Leaf',
    definition: 'The architecture employs three distinct node types to implement path compression and handle sparse key distributions efficiently.',
    analogy: 'A subway system: Branch nodes are transfer stations, Extension nodes are long express tunnels, and Leaf nodes are the final exits.',
    deepDive: 'In a sparse trie, many branches may lead to only a single child. Extension nodes collapse these single-child chains into a "shared path" string, preventing the creation of deep, empty branch chains and drastically reducing storage footprint.',
    steps: [
      { title: 'Branch Node', description: 'A 17-element array (16 child pointers + 1 value). It represents a divergence in the key paths.' },
      { title: 'Extension Node', description: 'An optimization that stores a partial path and a single pointer to a child Branch node.' },
      { title: 'Leaf Node', description: 'The terminal node containing the final path suffix and the actual RLP-encoded state value.' }
    ],
    visualType: 'nodes'
  },
  'path-compression': {
    id: 'path-compression',
    title: 'Path Compression',
    definition: 'Path compression is a space-optimization technique where non-branching paths are collapsed into a single node, ensuring the trie depth is proportional to the number of common prefixes.',
    analogy: 'Instead of having a separate door for every meter of a long hallway, you just have one door at the start and the highway takes you straight to the end.',
    deepDive: 'Formally, this transforms the Trie into a Radix Tree. In the context of Ethereum, it prevents an attacker from creating "shallow" accounts that force the network to process 64 levels of branching for a single lookup.',
    steps: [
      { title: 'Path Merging', description: 'Consecutive single-child nodes are concatenated into a single Extension node path.' },
      { title: 'Node Rebalancing', description: 'When a new key diverges from an existing Extension, the node is "split" into an Extension, a Branch, and a new Leaf.' },
      { title: 'Storage Efficiency', description: 'Reduces the total number of hashes stored in the database by multiple orders of magnitude.' }
    ],
    visualType: 'nodes'
  },
  'merkle-proofs': {
    id: 'merkle-proofs',
    title: 'Merkle Proofs',
    definition: 'A Merkle Proof (Inclusion Proof) is a logarithmic-sized dataset that proves the existence and value of a specific key relative to a known State Root.',
    analogy: 'Providing a receipt and a trail of signatures to prove you bought an item, without showing the entire store ledger.',
    deepDive: 'A proof consists of the sequence of nodes along the path from root to leaf. For a verifier with only the 32-byte Root Hash, the proof provides the necessary "neighbor" data to re-calculate the hashes upward. If the calculated root matches the trusted root, the data is verified.',
    steps: [
      { title: 'Proof Construction', description: 'A full node collects all trie nodes involved in the key lookup.' },
      { title: 'Path Verification', description: 'The verifier hashes the leaf and recursively hashes it with the sibling data in the proof.' },
      { title: 'Light Client Security', description: 'Enables mobile wallets to verify account balances without downloading the 500GB+ full blockchain state.' }
    ],
    visualType: 'proof'
  },
  'state-updates': {
    id: 'state-updates',
    title: 'State Updates & Deltas',
    definition: 'State updates in a Merkle Patricia Trie are persistent and copy-on-write, ensuring that historical state can be preserved through "Path Shadowing".',
    analogy: 'Imagine a giant LEGO castle. If you change one brick on a tower, you don\'t rebuild the whole castle—you only swap the affected section and its support structure.',
    deepDive: 'When a leaf is updated, its hash changes. This invalidates the parent Branch node, which must also be re-hashed with the new child hash. This "ripple" continues up to the root, effectively creating a new version of the tree that shares unchanged nodes with the previous version.',
    steps: [
      { title: 'Immutability', description: 'Nodes are never updated in-place. Instead, new nodes are added to the database with new hashes.' },
      { title: 'State Persistence', description: 'Old versions of the trie remain accessible, which is vital for handling chain reorganizations (forks).' },
      { title: 'Hash Recalculation', description: 'Only the O(log N) nodes along the modified path are updated, making state transitions highly efficient.' }
    ],
    visualType: 'state'
  },
  'state-root': {
    id: 'state-root',
    title: 'The State Root',
    definition: 'The State Root is the 256-bit cryptographic digest of the root node, serving as a recursive commitment to the entire key-value state of the blockchain.',
    analogy: 'The "Root" is like the DNA of the entire network. If one person has a different DNA, they are on a different (forked) network.',
    deepDive: 'The State Root is the ultimate source of truth in Ethereum. It is stored in the Block Header. Because the trie is deterministic, any node that processes the same transactions will arrive at the exact same State Root, enabling trustless global consensus.',
    steps: [
      { title: 'RLP Encoding', description: 'Nodes are serialized using Recursive Length Prefix (RLP) before being hashed with Keccak-256.' },
      { title: 'Global Consensus', description: 'The State Root allows nodes to agree on the outcome of millions of transactions with just 32 bytes of data.' },
      { title: 'Verification Anchor', description: 'All Merkle Proofs and state queries are validated against this single trusted anchor point.' }
    ],
    visualType: 'state'
  }
};