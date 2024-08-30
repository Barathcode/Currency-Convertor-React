import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

const App = () => {

  const[amount,setAmount] = useState(1)
  const[fromCurrency,setFromCurrency] = useState("USD")
  const[toCurrency,setToCurrency] = useState("INR")
  const[convertedAmount,setConvertedAmount] = useState(null)
  const[currency,setCurrency] = useState(null)

  useEffect(() => {

    const getExchangeRate = async() => {
      try{
        let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`

        const response = await axios.get(url)
        setCurrency(response.data.rates[toCurrency])
      }catch(error){
        console.error("Error fetching exchange rate:", error);
      }
    }
    getExchangeRate();
  },[fromCurrency,toCurrency])

  useEffect(()=>{
    if(currency !==  null){
      setConvertedAmount((amount * currency).toFixed(2))
    }
  },[amount,currency])

  const handleInputChange = (e) => {
    const value = parseFloat(e.target.value)
    setAmount(isNaN(value) ? 0 : value)
  }

  const handleFromCurrency = (e) => {
    setFromCurrency(e.target.value)
  }

  const handleToCurrency = (e) => {
    setToCurrency(e.target.value)
  }

  return (
    <>
      <div className='currency-convertor'>
        <div className='box'></div>
        <div className='data'>
          <h1>CURRENCY CONVERTOR</h1>
          <div className="input-container">
            <label htmlFor='amt'>Amount:</label>
            <input type='number' id='amt' value={amount} onChange={handleInputChange} />
          </div>
          <div className="input-container">
          <label htmlFor='fromCurrency'>From Currency:</label>
            <select id='fromCurrency' value={fromCurrency} onChange={handleFromCurrency}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor='toCurrency'>To Currency:</label>
            <select id='toCurrency' value={toCurrency} onChange={handleToCurrency}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>
          <div className="result">
            <p>{amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
