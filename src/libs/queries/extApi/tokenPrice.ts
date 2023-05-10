import { useQuery } from '@tanstack/react-query';
import { QueryKey } from 'libs/queries/queryKey';
import { FIVE_MIN_IN_MS } from 'utils/time';
import { FiatPriceDict } from 'store/useFiatCurrencyStore';
import { useStore } from 'store';
import { carbonApiAxios } from 'utils/carbonApi';

export const useGetTokenPrice = (address?: string) => {
  const {
    fiatCurrency: { availableCurrencies },
  } = useStore();

  return useQuery(
    QueryKey.tokenPrice(address!),
    async () => {
      const result = await carbonApiAxios.get<{ data: FiatPriceDict }>(
        `marketrate/${address}`,
        {
          params: { convert: availableCurrencies.join(',') },
        }
      );

      return result.data.data;
    },
    {
      enabled: !!address && availableCurrencies.length > 0,
      refetchInterval: FIVE_MIN_IN_MS,
      staleTime: FIVE_MIN_IN_MS,
    }
  );
};
