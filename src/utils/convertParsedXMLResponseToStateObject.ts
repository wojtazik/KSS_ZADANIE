import { parseNumbers } from "xml2js/lib/processors";
import IExchangeRate from "../model/ExchangeRateInterface";

export default (xmlParsedResponse: any) => {
    const convertedArr: Array<IExchangeRate> = [];

    (xmlParsedResponse as any).tabela_kursow.pozycja.forEach((currency: any) => {
        convertedArr.push({
            name: currency.nazwa_waluty[0],
            value: parseFloat(currency.kurs_sredni[0].replace(",", "."))
        })
    });

    return convertedArr
}