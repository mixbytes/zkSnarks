const Verifier = artifacts.require("Verifier");

const truffleAssert = require('truffle-assertions');

contract('Verifier', function(accounts) {
	const acc = {anyone: accounts[0], owner: accounts[1], anyoneElse: accounts[2]};
	beforeEach(async function () {
		this.inst = await Verifier.new({from: acc.owner});
	});

	it('verifyTx with valid proof', async function() {
		let a = ["0x1c36dcffa432f1f0ae4ea4659dc182b4c0bde8078bcd9622fd7531278fcd7c3e", "0x24cf0aea3db1930a93da877bdb317912efd01f0c3fbd4f7e67b9d0726bf55238"];
		let b = [["0x0315d032f690c0b2065787c5597f86da603c825cfcb7f61d151b38df88f86bda", "0x0dfc4543aacca09ecc3f657924d7a291dd2c21dc5ca96feeb417e9a656ff9013"], ["0x01e42366a274eccee1058fee3ef05523da09d126ad4fda0659b655dcf9888b1c", "0x2f512d6088e9deffd04ed23e9f094e25feeadb41ad87e3998ce894c8cf2b04b8"]];
		let c = ["0x070f52468b17a27495d2a72a9e70fd8e0856588bafc113b230087672ab51ff89", "0x2e359e14b32f50fba4d69611777846bd3ac10206d94a414c2cff7be9c298ab8c"];
		let i = ["0x0000000000000000000000000000000000000000000000000000000000000079", "0x0000000000000000000000000000000000000000000000000000000000000001"];
		const trans = await this.inst.verifyTx(a, b, c, i, { from: acc.anyone })
		truffleAssert.eventEmitted(trans, 'Verified');
	});

	it('verifyTx with invalid proof', async function() {
		let a = ["0x1c36dcffa432f1f0ae4ea4659dc182b4c0bde8078bcd9622fd7531278fcd7c3e", "0x24cf0aea3db1930a93da877bdb317912efd01f0c3fbd4f7e67b9d0726bf55238"];
		let b = [["0x0315d032f690c0b2065787c5597f86da603c825cfcb7f61d151b38df88f86bda", "0x0dfc4543aacca09ecc3f657924d7a291dd2c21dc5ca96feeb417e9a656ff9013"], ["0x01e42366a274eccee1058fee3ef05523da09d126ad4fda0659b655dcf9888b1c", "0x2f512d6088e9deffd04ed23e9f094e25feeadb41ad87e3998ce894c8cf2b04b8"]];
		let c = ["0x070f52468b17a27495d2a72a9e70fd8e0856588bafc113b230087672ab51ff89", "0x2e359e14b32f50fba4d69611777846bd3ac10206d94a414c2cff7be9c298ab8c"];
		let i = ["0x100000000000000000000000000000000000000000000000000000000000079", "0x0000000000000000000000000000000000000000000000000000000000000001"];
		const trans = await this.inst.verifyTx(a, b, c, i, { from: acc.anyone })
		truffleAssert.eventNotEmitted(trans, 'Verified');
	});
})