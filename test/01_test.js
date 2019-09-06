const truffleAssert = require('truffle-assertions');

const zkSnark = require("snarkjs");
const {stringifyBigInts, unstringifyBigInts} = require("../node_modules/snarkjs/src/stringifybigint.js");
const fs = require("fs")

const witnessName = "witness.json"
const provingKeyName = "proving_key.json"
const proofName = "a-proof.json"
const publicName = "public.json"
const inputName = "input.json"
const circuitName = "circuit.json"

function p256(n) {
    let nstr = n.toString(16);
    while (nstr.length < 64) nstr = "0"+nstr;
    nstr = `0x${nstr}`;
    return nstr;
}


const Verifier = artifacts.require("Verifier");

contract('Verifier', function(accounts) {
    const acc = {anyone: accounts[0], owner: accounts[1], anyoneElse: accounts[2]};
    beforeEach(async function () {
        this.inst = await Verifier.new({from: acc.owner});
    });

    it('verifyTx with valid proof', async function() {
        const cirDef = JSON.parse(fs.readFileSync(circuitName, "utf8"));
        const cir = new zkSnark.Circuit(cirDef);
        const input = {
            "a": "524287",
            "b": "6700417"
        }
        const witness = cir.calculateWitness(input);
        console.log(witness)
        const provingKey = unstringifyBigInts(JSON.parse(fs.readFileSync(provingKeyName, "utf8")));
        const {proof, publicSignals} = zkSnark.original.genProof(provingKey, witness)
        
        let inputs = "";
        for (let i=0; i<publicSignals.length; i++) {
            if (inputs != "") inputs = inputs + ",";
            inputs = inputs + p256(publicSignals[i]);
        }

        trans = await this.inst.verifyProof(
            [p256(proof.pi_a[0]), p256(proof.pi_a[1])],
            [p256(proof.pi_ap[0]), p256(proof.pi_ap[1])],
            [[p256(proof.pi_b[0][1]), p256(proof.pi_b[0][0])],[p256(proof.pi_b[1][1]), p256(proof.pi_b[1][0])]],
            [p256(proof.pi_bp[0]), p256(proof.pi_bp[1])],
            [p256(proof.pi_c[0]), p256(proof.pi_c[1])],
            [p256(proof.pi_cp[0]), p256(proof.pi_cp[1])],
            [p256(proof.pi_h[0]), p256(proof.pi_h[1])],
            [p256(proof.pi_kp[0]), p256(proof.pi_kp[1])],
            [inputs],
            { from: acc.anyone }
        )
        assert.equal(trans, true)
    });
})
