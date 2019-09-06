Suppose you want to prove that you know  `p, q` such that
`p*q=x` without revealing them. Here we demonstrate how to do that with zk-snarks.

## 1. Install  circom  and  snarkjs
```
npm install -g circom
npm install -g snarkjs
```

## 2.  Compile a circuit
`circom circuit.circom -o circuit.json`

## 3. Perform ZK-snarks trusted setup
`snarkjs setup`

## 4. Run local devnet

`truffle development`

## 5. Run tests
`npm test`