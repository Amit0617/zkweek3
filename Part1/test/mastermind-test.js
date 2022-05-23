//[assignment] write your own unit test to show that your Mastermind variation circuit is working as expected

const chai = require("chai");
const path = require("path");

const wasm_tester = require("circom_tester").wasm;
const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

const assert = chai.assert;
describe("Mastermind Variation test", function () {
    this.timeout(100000000);

    it("Bagels", async () => {
        const circuit = await wasm_tester("contracts/circuits/MastermindVariation.circom");
        await circuit.loadConstraints();

        const INPUT = {
                "pubGuessA": "5",
                "pubGuessB": "4",
                "pubGuessC": "3",
                "pubNumHit": "3",
                "pubNumBlow": "0",
                "privSolnA": "5",
                "privSolnB": "4",
                "privSolnC": "3",
                "pubSolnHash": "11407988593755767647236903635309179434196271832737545331027067732305127210513",
                "privSalt": "12354"
        }
        const witness = await circuit.calculateWitness(INPUT, true);
        // console.log(witness);

        assert(Fr.eq(Fr.e(witness[0]),Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]),Fr.e(11407988593755767647236903635309179434196271832737545331027067732305127210513n)));
    });
});
