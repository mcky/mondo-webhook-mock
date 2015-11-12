var generateTransaction = function() {
	return {
		type: 'transaction.created',
		data: {
			account_id: 'acc_00008gju41AHyfLUzBUk8A',
			amount: -350,
			created: '2015-09-04T14:28:40Z',
			currency: 'GBP',
			description: 'Ozone Coffee Roasters',
			id: 'tx_00008zjky19HyFLAzlUk7t'
		}
	}
}

var data = generateTransaction()
console.log(data)
