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

var getQueryParam = function(param) {
	var str = location.search.match(new RegExp(param + '=(.*?)($|\&)', 'i'))
	return str ? str[1] : null
}

// Setup
addOption(locationSelect, 'random', 'Location (random)')
for (var i = 0; i < places.length; i++) {
	addOption(locationSelect, places[i])
}

// Prefill fields based on query params
var paramMap = {
	'endpoint': 'urlField',
	'account_id': 'accountField',
	'amount': 'amountField',
	'transaction_id': 'transactionField',
}

Object.keys(paramMap).forEach(function(param) {
	var urlPrefill = getQueryParam(param)

	if (urlPrefill) {
		document.getElementById(paramMap[param]).value = urlPrefill
	}
})


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

var generatePreview = function() {
	var data = generateTransaction()
	preview.innerHTML = JSON.stringify(data, null, '\t')
}

var previewShown = false
var togglePreview = function(evt) {
	evt.preventDefault()
	if (!previewShown) generatePreview()
	previewShown = !previewShown
	form.classList.toggle('hidden')
	closePreview.classList.toggle('hidden')
	preview.classList.toggle('hidden')
}

showPreview.addEventListener('click', togglePreview)
closePreview.addEventListener('click', togglePreview)


