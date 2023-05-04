import { CFWorkerEnv } from '../../../cfFunctions/types';
import { getPriceByAddress } from '../../../cfFunctions/api/price';

export const onRequest: PagesFunction<CFWorkerEnv> = async ({
  request: { url },
  env,
  params: { address },
}) => {
  if (
    typeof address !== 'string' ||
    !address.startsWith('0x') ||
    address.length !== 42
  ) {
    return new Response('address is not valid', { status: 400 });
  }

  return getPriceByAddress(env, url, address);
};
