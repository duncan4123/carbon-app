import { useState } from 'react';
import { lsService } from 'services/localeStorage';

const AVAILABLE_CURRENCIES = [
  'USD',
  'EUR',
  'JPY',
  'GBP',
  'AUD',
  'CAD',
  'CHF',
  'CNH',
  'ETH',
] as const;

export type FiatSymbol = (typeof AVAILABLE_CURRENCIES)[number];

export type FiatPriceDict = {
  [k in FiatSymbol]: number;
};

export interface FiatCurrencyStore {
  availableCurrencies: readonly FiatSymbol[];
  selectedFiatCurrency: FiatSymbol;
  setSelectedFiatCurrency: (currency: FiatSymbol) => void;
}

export const useFiatCurrencyStore = (): FiatCurrencyStore => {
  const [selectedFiatCurrency, _setSelectedFiatCurrency] = useState<FiatSymbol>(
    lsService.getItem('currentCurrency') || 'USD'
  );

  const setSelectedFiatCurrency = (currency: FiatSymbol) => {
    _setSelectedFiatCurrency(currency);
    lsService.setItem('currentCurrency', currency);
  };

  return {
    selectedFiatCurrency,
    setSelectedFiatCurrency,
    availableCurrencies: AVAILABLE_CURRENCIES,
  };
};

export const defaultFiatCurrencyStore: FiatCurrencyStore = {
  selectedFiatCurrency: 'USD',
  setSelectedFiatCurrency: () => {},
  availableCurrencies: AVAILABLE_CURRENCIES,
};
