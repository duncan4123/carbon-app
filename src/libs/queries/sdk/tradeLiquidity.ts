import { useQuery } from '@tanstack/react-query';
import { carbonSDK } from 'libs/sdk';
import { QueryKey } from 'libs/queries';
import { TWO_SECONDS_IN_MS } from 'utils/time';
import { useCarbonSDK } from 'hooks/useCarbonSDK';

export const useGetTradeLiquidity = (token0?: string, token1?: string) => {
  const { isInitialized } = useCarbonSDK();

  return useQuery({
    queryKey: QueryKey.tradeLiquidity(token0!, token1!),
    queryFn: async () => carbonSDK.getLiquidityByPair(token0!, token1!),
    enabled: !!token0 && !!token1 && isInitialized,
    cacheTime: 0,
    refetchInterval: TWO_SECONDS_IN_MS,
  });
};

export const useHasLiquidityByPair = (token0?: string, token1?: string) => {
  const { isInitialized } = useCarbonSDK();

  return useQuery({
    queryKey: QueryKey.tradeHasLiquidity(token0!, token1!),
    queryFn: async () => carbonSDK.hasLiquidityByPair(token0!, token1!),
    enabled: !!token0 && !!token1 && isInitialized,
    cacheTime: 0,
    refetchInterval: TWO_SECONDS_IN_MS,
  });
};
