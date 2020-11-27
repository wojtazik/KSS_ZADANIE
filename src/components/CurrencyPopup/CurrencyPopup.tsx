import React, { useCallback, useEffect, useState } from 'react'
import { parseString } from 'xml2js';
import IExchangeRate from '../../model/ExchangeRateInterface';
import convertParsedXMLResponseToStateObject from '../../utils/convertParsedXMLResponseToStateObject';
import './CurrencyPopup.scss'

interface IProps {
    url: string
}

const CurrencyPopup = ({url}: IProps) => {
    const [currencies, setCurrencies] = useState<IExchangeRate[]>([])
    const [errorOccured, setErrorOccured] = useState(false)
    const [selectedCurrency, setSelectedCurrency] = useState<IExchangeRate|null>(null)

    const fetchCurrencies = useCallback(() => {
        fetch(url)
            .then(resp => resp.text())
            .then((parsedXMLResp: string) => {
                parseString(parsedXMLResp, (err, result) => {
                    if(err) {
                        setErrorOccured(true)
                        return
                    }
                    const currenciesArr = convertParsedXMLResponseToStateObject(result)
                    setCurrencies(currenciesArr)
                })
            })
    },[])

    const onCurrencySelect = (event: any) => {
        setSelectedCurrency(event.target.value)
    }

    useEffect(fetchCurrencies, [])

    return (
        <div className='currency-popup__wrapper'>
            {currencies && (
                <select name="currency" onChange={onCurrencySelect}>
                    {currencies.map((currency: IExchangeRate) => (
                        <option key={currency.name} value={currency.value}>{currency.name}</option>
                    ))}
                </select>
            )
            }
            { selectedCurrency ? <div>{selectedCurrency} PLN</div> : <div>Wybierz walutę...</div> }
        </div>
    )
}

export default CurrencyPopup