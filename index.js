// Places from FourSquare API
var places = [
	'The Nightjar',
	'Ozone Coffee Roasters',
	'MEAT Mission',
	'Shoreditch Grind',
	'The Princess of Shoreditch',
	'Casita',
	'Cay Tre',
	'On The Bab',
	'Kêu Banh Mi Deli',
	'Happiness Forgets',
	'Ruby',
	'Bel-Air Food',
	'The Breakfast Club',
	'Hoxton Grill',
	'Busaba Eathai',
	'The Book Club',
	'Origin Coffee',
	'The Old Fountain',
	'Taylor St Baristas',
	'Lantana Shoreditch',
	'Ceviche',
	'Merchants Tavern',
	'Friends of Ours',
	'The Attendant',
	'Callooh Callay',
	'NOLA',
	'The Clove Club',
	'Pitfield London',
	'Slate Coffee',
	'Fix 126',
]

var amountField = document.getElementById('amountField')
var locationSelect = document.getElementById('locationSelect')
var sendButton = document.getElementById('sendButton')

// Util
var random = function(num) {
	return Math.floor(Math.random()*num)
}

var addOption = function(value, select) {
	var el = document.createElement("option")
	el.textContent = value
	el.value = value
	select.appendChild(el)
}

// Setup
addOption('random', locationSelect)
for (var i = 0; i < places.length; i++) {
	addOption(places[i], locationSelect)
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
