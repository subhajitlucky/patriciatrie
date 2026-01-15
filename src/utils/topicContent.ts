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
    title: 'Node Archetypes: Branch, Extension, Leaf',
    definition: 'To achieve path compression and efficient RLP-encoding, the trie implements three specialized node architectures that optimize for both sparse and dense key distributions.',
    analogy: 'A high-speed rail network: Branch nodes are the switching stations, Extension nodes are the long-haul express tracks, and Leaf nodes are the final terminal platforms.',
    deepDive: 'The Branch node is a 17-element array: 16 slots for nibbles (0-F) and 1 for a value. Extension nodes act as "Path Shortcuts," storing a partial nibble sequence and a single child pointer. Leaf nodes terminate the path, containing the final key suffix and the RLP-encoded value (e.g., account balance, nonce, or code hash).',
    steps: [
      { title: 'Radix Divergence', description: 'Branch nodes facilitate multi-way branching, allowing the trie to handle up to 16 children per level.' },
      { title: 'Pointer Integrity', description: 'Every pointer in a Branch or Extension node is actually the 32-byte Keccak-256 hash of the child node it references.' },
      { title: 'Value Termination', description: 'Leaf nodes provide the ultimate mapping, where the cryptographic path finally resolves to concrete state data.' }
    ],
    visualType: 'archetypes'
  },
  'path-compression': {
    id: 'path-compression',
    title: 'Path Compression & Optimization',
    definition: 'Path compression transforms a standard Trie into a Radix Tree by collapsing non-branching node sequences into a single atomic "Extension" node.',
    analogy: 'Instead of having a separate zip code for every single house on a long private road, the entire road shares a single prefix, and you only distinguish the houses at the very end.',
    deepDive: 'In a sparse blockchain state (like Ethereum), most paths lead to only one child for many consecutive levels. Without compression, searching for an account would require 64 disk reads (one per nibble). Compression collapses these into 1-2 reads, drastically reducing I/O latency and gas costs for state lookups.',
    steps: [
      { title: 'Sequence Collapsing', description: 'Consecutive nodes with only one child are merged into a single Extension node containing the shared nibble path.' },
      { title: 'Dynamic Splitting', description: 'When a new key is inserted that partially matches an Extension path, the node is dynamically split into a new Branch and two children.' },
      { title: 'I/O Efficiency', description: 'Path compression is the primary reason why Merkle Patricia Tries can scale to handle billions of accounts with sub-millisecond lookup times.' }
    ],
    visualType: 'compression'
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
    title: 'The State Root: The Cryptographic Anchor',
    definition: 'The State Root is the 32-byte Keccak-256 digest of the root node, serving as a recursive cryptographic commitment to the entire global state of the blockchain.',
    analogy: 'A DNA sample from a single hair that identifies the entire organism. If one cell changes, the DNA signature becomes invalid.',
    deepDive: 'In a Merkle Patricia Trie, every node is identified by the hash of its contents. Because nodes contain the hashes of their children, the root node\'s hash is mathematically dependent on every single key-value pair in the database. This allows a light client to verify the entire 500GB+ state of Ethereum using just this single 32-byte string found in the Block Header.',
    steps: [
      { title: 'Recursive Hashing', description: 'The root hash is calculated bottom-up. Leaf hashes flow into Branches, which flow into Extensions, eventually culminating in the single Root Hash.' },
      { title: 'Deterministic Truth', description: 'Because the Patricia Trie is deterministic, two nodes processing the same transactions will always arrive at the exact same 32-byte Root.' },
      { title: 'Stateless Verification', description: 'The State Root acts as the "Verification Anchor" for all Merkle Proofs, enabling trustless interaction without storing the full state.' }
    ],
    visualType: 'root-anchor'
  }
};