import { DebugPage } from 'pages/debug';
import { StrategiesPage } from 'pages/strategies';
import { TradePage } from 'pages/trade';
import { CreateStrategyPage } from 'pages/strategies/create';
import { TermsPage } from 'pages/terms';
import { Route } from '@tanstack/react-location';
import { getLastVisitedPair } from 'libs/routing/utils';
import { EditStrategyPage } from 'pages/strategies/edit';
import { PrivacyPage } from 'pages/privacy';

export const externalLinks = {
  blog: 'http://blog.carbondefi.xyz',
  faq: 'https://faq.carbondefi.xyz/',
  analytics: 'http://analytics.carbondefi.xyz',
  twitter: 'https://twitter.com/carbondefixyz',
  youtube: 'https://www.youtube.com/c/BancorProtocol',
  discord: 'https://discord.gg/bancor',
  telegram: 'https://t.me/CarbonDeFixyz',
  techDocs: 'https://docs.carbondefi.xyz/',
  litePaper: 'https://carbondefi.xyz/litepaper',
  whitepaper: 'https://carbondefi.xyz/whitepaper',
  simulatorRepo: 'https://github.com/bancorprotocol/carbon-simulator',
  interactiveSim: 'https://simulator.carbondefi.xyz/',
};

export const PathNames = {
  strategies: '/',
  trade: '/trade',
  debug: '/debug',
  createStrategy: '/strategies/create',
  editStrategy: '/strategies/edit',
  terms: '/terms',
  privacy: '/privacy',
};

export const routes: Route[] = [
  {
    path: PathNames.strategies,
    element: <StrategiesPage />,
  },
  {
    id: 'trade',
    path: PathNames.trade,
    element: <TradePage />,
    searchFilters: [
      (search) => {
        if (search.base && search.quote) {
          return search;
        }
        return { ...search, ...getLastVisitedPair() };
      },
    ],
  },
  {
    path: PathNames.createStrategy,
    element: <CreateStrategyPage />,
    searchFilters: [
      (search) => {
        if (
          search.strategyType === 'recurring' ||
          search.strategyType === 'disposable' ||
          search.encodedStrategy
        ) {
          return search;
        }
        return { ...search, strategyType: 'recurring' };
      },
    ],
  },
  {
    path: PathNames.editStrategy,
    element: <EditStrategyPage />,
  },
  {
    path: PathNames.terms,
    element: <TermsPage />,
  },
  {
    path: PathNames.privacy,
    element: <PrivacyPage />,
  },
  {
    path: PathNames.debug,
    element: <DebugPage />,
  },
];
