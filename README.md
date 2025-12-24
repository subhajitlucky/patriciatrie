# Patricia Trie Visualizer

An interactive educational microsite that teaches Merkle Patricia Tries (MPT) and how they are used for blockchain state storage.

## Features

- **Interactive Playground**: Insert, update, and delete key-value pairs and watch the trie rebalance and compress paths in real-time.
- **Visual Learning Path**: Guided lessons on Nibble paths, Node types (Branch, Extension, Leaf), and Path Compression.
- **Merkle Proofs**: Visualize the path of nodes required to prove the existence of a specific value in the state.
- **State Root Tracking**: See how every state change ripples up to produce a new cryptographic root hash.

## Tech Stack

- **React** (TypeScript)
- **Vite**
- **TailwindCSS v4**
- **Framer Motion**
- **Lucide React Icons**

## How it Works

The application simulates a Merkle Patricia Trie similar to the one used in Ethereum. It converts string keys into "nibbles" (4-bit chunks) and organizes them into a tree structure that balances depth and space efficiency through path compression.

### Node Types
- **Leaf Nodes**: Store the remaining path and the actual value.
- **Extension Nodes**: Store shared prefixes to collapse deep, single-child paths.
- **Branch Nodes**: 16-way intersections for trie traversal.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```