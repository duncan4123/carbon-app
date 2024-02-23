import { Link, useParams, useSearch } from '@tanstack/react-router';
import { buttonStyles } from 'components/common/button/buttonStyles';
import { SimInputChart } from 'components/simulator/input/SimInputChart';
import { SimInputOverlapping } from 'components/simulator/input/SimInputOverlapping';
import { SimInputRecurring } from 'components/simulator/input/SimInputRecurring';
import { SimInputStrategyType } from 'components/simulator/input/SimInputStrategyType';
import { SimInputTokenSelection } from 'components/simulator/input/SimInputTokenSelection';
import { useSimDisclaimer } from 'components/simulator/input/useSimDisclaimer';
import { useBreakpoints } from 'hooks/useBreakpoints';
import { useSimulatorInput } from 'hooks/useSimulatorInput';
import { useGetTokenPriceHistory } from 'libs/queries/extApi/tokenPrice';
import { useState } from 'react';
import { cn } from 'utils/helpers';
import { SimulatorMobilePlaceholder } from 'components/simulator/mobile-placeholder';

export const SimulatorPage = () => {
  useSimDisclaimer();
  const { aboveBreakpoint } = useBreakpoints();
  const { simulationType } = useParams({ from: '/simulator/$simulationType' });
  const searchState = useSearch({
    from: '/simulator/$simulationType',
  });
  const { dispatch, state, bounds } = useSimulatorInput({ searchState });
  const { data, isLoading, isError } = useGetTokenPriceHistory({
    baseToken: state.baseToken?.address,
    quoteToken: state.quoteToken?.address,
    start: state.start,
    end: state.end,
  });

  const [initBuyRange, setInitBuyRange] = useState(true);
  const [initSellRange, setInitSellRange] = useState(true);

  const inputError =
    Number(state.buy.budget) + Number(state.sell.budget) <= 0
      ? 'Please add Sell and/or Buy budgets'
      : null;

  if (!aboveBreakpoint('md')) return <SimulatorMobilePlaceholder />;

  return (
    <>
      <h1 className="mb-16 px-20 text-24 font-weight-500">Simulate Strategy</h1>

      <div className="flex gap-20 px-20">
        <div className="flex w-[440px] flex-col gap-20">
          <SimInputTokenSelection
            base={state.baseToken}
            quote={state.quoteToken}
            dispatch={dispatch}
            setInitBuyRange={setInitBuyRange}
            setInitSellRange={setInitSellRange}
          />
          <SimInputStrategyType strategyType={simulationType} />

          {simulationType === 'recurring' ? (
            <SimInputRecurring
              state={state}
              dispatch={dispatch}
              firstHistoricPricePoint={data?.[0]}
            />
          ) : (
            <SimInputOverlapping />
          )}

          {simulationType === 'recurring' && (
            <Link
              to={'/simulator/result'}
              disabled={!!inputError}
              search={{
                baseToken: state.baseToken?.address || '',
                quoteToken: state.quoteToken?.address || '',
                buyMin: state.buy.min,
                buyMax: state.buy.max,
                buyBudget: state.buy.budget,
                buyIsRange: state.buy.isRange,
                sellMin: state.sell.min,
                sellMax: state.sell.max,
                sellBudget: state.sell.budget,
                sellIsRange: state.sell.isRange,
                start: state.start!,
                end: state.end!,
              }}
              className={cn(
                buttonStyles({
                  fullWidth: true,
                  size: 'lg',
                }),
                { 'cursor-not-allowed opacity-40': !!inputError }
              )}
            >
              {inputError ?? 'Start Simulation'}
            </Link>
          )}
        </div>

        <SimInputChart
          data={data}
          isLoading={isLoading}
          isError={isError}
          state={state}
          dispatch={dispatch}
          initBuyRange={initBuyRange}
          initSellRange={initSellRange}
          setInitBuyRange={setInitBuyRange}
          setInitSellRange={setInitSellRange}
          bounds={bounds}
        />
      </div>
    </>
  );
};
