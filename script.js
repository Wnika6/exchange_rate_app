const currencyOne = document.querySelector('#currency-one')
const currencyTwo = document.querySelector('#currency-two')
const amountOne = document.querySelector('.input-amount')
const amountTwo = document.querySelector('.output-amount')
const exchangeBtn = document.querySelector('.exchange-btn')
const error = document.querySelector('.error')
const loader = document.querySelector('.loader')
const outputAmount = document.querySelector('.output-amount')
const outputPadding = document.querySelector('.output-box')

const toggleLoader = show => {
	if (show) {
		loader.style.display = 'block'
	} else {
		loader.style.display = 'none'
	}
}

const exchange = () => {
	toggleLoader(true)
	const code = currencyOne.value

	if (!(outputPadding.style.padding === '0')) {
		outputPadding.style.padding = '20px'
	}

	fetch(`https://api.nbp.pl/api/exchangerates/rates/A/${code}/today`)
		.then(res => res.json())
		.then(data => {
			const currency1 = currencyOne.value
			const currency2 = currencyTwo.value

			const rate = data.rates[0].mid
			amountTwo.value = (amountOne.value * rate).toFixed(2)

			outputAmount.textContent = `to ${amountTwo.value} PLN`
			toggleLoader(false)
		})
		.catch(error => {
			console.error('Fetch error:', error)
			error.textContent = 'Nieudana próba pobrania danych'
			toggleLoader(false)
		})
}

exchangeBtn.addEventListener('click', exchange)
