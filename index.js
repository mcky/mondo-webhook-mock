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
var urlField = document.getElementById('urlField')
var sendButton = document.getElementById('sendButton')
var accountField = document.getElementById('accountField')
var transactionField = document.getElementById('transactionField')

// Util
var random = function(num) {
	return Math.floor(Math.random()*num)
}

var randomString = function(length) {
	var rand = function() { return Math.random().toString(36)+'00000000000000000' }
	return Array(length+1).join(rand().slice(2, 18)).slice(0, length)
}

var addOption = function(select, value, text) {
	var el = document.createElement("option")
	el.textContent = text || value
	el.value = value
	select.appendChild(el)
}

// Setup
addOption(locationSelect, 'random', 'Location (random)')
for (var i = 0; i < places.length; i++) {
	addOption(locationSelect, places[i])
}

// For transactions
var getAmount = function() {
	var value = amountField.value
	return value === '' ? -random(25) : value
}

var getISODate = function() {
	return (new Date).toISOString()
}

var getRandomPlace = function() {
	return places[random(places.length)]
}

var getPlace = function() {
	var value = locationSelect.value
	return value === 'random' ? getRandomPlace() : value
}

var getId = function(prefix) {
	return prefix + '_' + randomString(22)
}

var getAccountId = function() {
	var value = accountField.value
	return value === '' ? getId('acc') : value
}

var getTransactionId = function() {
	var value = transactionField.value
	return value === '' ? getId('tx') : value
}

var generateTransaction = function() {
	return {
		type: 'transaction.created',
		data: {
			account_id: getAccountId(),
			amount: getAmount(),
			created: getISODate(),
			currency: 'GBP',
			description: getPlace(),
			id: getTransactionId(),
		}
	}
}

var getUrl = function() {
	var url = urlField.value

	if (url !== '' && !/^(f|ht)tps?:\/\//i.test(url)) {
		url = "http://" + url;
	}

	return url
}

var postRequest = function(url, data, callback) {
	var request = new XMLHttpRequest()

	request.onreadystatechange = function () {
		if (request.readyState === 4) {
			if (request.status === 200) {
				callback(null, JSON.parse(request.response))
			} else {
				callback('error', null)
			}
		}
	}

	request.open('POST', url, true)
	request.setRequestHeader('Content-Type', 'application/json')
	request.send(JSON.stringify(data))
}

var submit = function() {
	var data = generateTransaction()
	var url = getUrl()

	var cb = function(err, response) {
		console.log(response)
	}

	postRequest(url, data, cb)
}

sendButton.addEventListener('click', submit)
