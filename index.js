var amountField = document.getElementById('amountField')
var sendButton = document.getElementById('sendButton')

// Util
var random = function(num) {
	return Math.floor(Math.random()*num)
}

// For transactions
var getAmount = function() {
	var value = amountField.value
	return value === '' ? random(25) : value
}

var getISODate = function() {
	return (new Date).toISOString()
}

var generateTransaction = function() {
	return {
		type: 'transaction.created',
		data: {
			account_id: 'acc_00008gju41AHyfLUzBUk8A',
			amount: -getAmount(),
			created: getISODate(),
			currency: 'GBP',
			description: 'Ozone Coffee Roasters',
			id: 'tx_00008zjky19HyFLAzlUk7t'
		}
	}
}

var submit = function() {
	var data = generateTransaction()
	console.log(data)
}

sendButton.addEventListener('click', submit)
