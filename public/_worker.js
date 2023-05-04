/* eslint-disable import/no-anonymous-default-export */

const isIpBlocked = (request, env) => {
  const RESTRICTED_DOMAIN = '.pages.dev';
  const { hostname } = new URL(request.url);
  const ALLOWED_IPS = env.ALLOWED_IPS;
  if (hostname.includes(RESTRICTED_DOMAIN) && ALLOWED_IPS) {
    const allowedIps = ALLOWED_IPS.split(',').filter((ip) => ip !== '');
    const clientIP = request.headers.get('CF-Connecting-IP');
    if (!allowedIps.includes(clientIP)) {
      return new Response(`IP ${clientIP} isn't allowed to access this page`, {
        status: 403,
      });
    }
  }
};

const cmcBaseUrl = 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/';

const getCMCHeaders = (env) => ({
  headers: {
    'X-CMC_PRO_API_KEY': env.CMC_API_KEY,
  },
});

const fetchCMCIdByAddress = async (env, address) => {
  const res = await fetch(
    `${cmcBaseUrl}info?address=${address}`,
    getCMCHeaders(env)
  );

  const json = await res.json();
  if (json.status.error_code !== 0) {
    throw new Error(
      json.status.error_message + ' fetchCMCIdByAddress ' + address
    );
  }

  return Object.keys(json.data)[0];
};

const fetchCMCPriceById = async (env, id, convert = 'USD') => {
  const res = await fetch(
    `${cmcBaseUrl}quotes/latest?id=${id}&convert=${convert}`,
    getCMCHeaders(env)
  );

  const json = await res.json();
  if (json.status.error_code !== 0) {
    throw new Error(json.status.error_message + ' fetchCMCPriceById ' + id);
  }

  return json.data[id].quote;
};

const fetchCMCPriceByAddress = async (env, address, convert) => {
  try {
    const id = await fetchCMCIdByAddress(env, address);

    const res = await fetchCMCPriceById(env, id, convert);

    const prices = {};
    Object.keys(res).forEach((c) => {
      prices[c] = res[c].price;
    });

    return prices;
  } catch (ex) {
    throw new Error(`fetchCMCPriceByAddress error: ${ex.message}`);
  }
};

const getPriceByAddress = async (env, request) => {
  const { pathname, searchParams } = new URL(request.url);
  const address = pathname.split('/')[3];
  const convertString = searchParams.get('convert') || 'USD';

  try {
    const res = await fetchCMCPriceByAddress(env, address, convertString);

    return new Response(JSON.stringify(res), {
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (ex) {
    return new Response(ex.message, { status: 500 });
  }
};

export default {
  async fetch(request, env) {
    const isIpBlockedResponse = isIpBlocked(request, env);
    if (isIpBlockedResponse) {
      return isIpBlockedResponse;
    }

    const { pathname } = new URL(request.url);
    if (pathname.startsWith('/api/')) {
      if (pathname.startsWith('/api/price/0x')) {
        return getPriceByAddress(env, request);
      }

      return new Response('api endpoint not found', { status: 404 });
    }

    return env.ASSETS.fetch(request);
  },
};
