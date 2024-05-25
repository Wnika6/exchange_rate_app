const currencySelect = document.getElementById('currency-one')
const amountInput = document.getElementById('input-amount')
const exchangeButton = document.getElementById('exchange-btn')
const errorDisplay = document.getElementById('error')
const loader = document.getElementById('loader')
const outputDisplay = document.getElementById('currency-two')
const outputContainer = document.querySelector('.output-box')

const toggleLoader = show => {
	if (show) {
		loader.style.display = 'block'
	} else {
		loader.style.display = 'none'
	}
}

const performExchange = async () => {
	toggleLoader(true)
	const currencyCode = currencySelect.value
	const amount = parseFloat(amountInput.value)

	if (isNaN(amount) || amount <= 0) {
		errorDisplay.textContent = 'Wpisz liczbę większą niż 0'
		toggleLoader(false)
		return
	}

	if (outputContainer.style.padding !== '0') {
		outputContainer.style.padding = '20px'
	}

	try {
		const response = await fetch(`https://api.nbp.pl/api/exchangerates/rates/A/${currencyCode}`)
		const data = await response.json()
		const exchangeRate = data?.rates?.[0]?.mid

		if (exchangeRate) {
			const convertedAmount = (amount * exchangeRate).toFixed(2)
			outputDisplay.textContent = `to ${convertedAmount} PLN`
		}
		if (!response.ok) {
			throw new Error('Błąd odpowiedzi sieci')
		}
	} catch (err) {
		console.error('Error:', err)
		errorDisplay.textContent = 'Nieudana próba pobrania danych'
	} finally {
		toggleLoader(false)
	}
}

document.getElementById('exchange-form').addEventListener('submit', e => {
	e.preventDefault()
	errorDisplay.textContent = ''
	performExchange()
})
