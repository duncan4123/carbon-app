import { useModal } from 'modals';
import { useWeb3 } from 'providers/Web3Provider';
import { useContract } from 'hooks/useContract';
import {
  ConnectionType,
  getConnection,
  getConnectionName,
  SELECTABLE_CONNECTION_TYPES,
} from 'services/web3';
import { DebugImposter } from 'elements/debug/DebugImposter';
import { DebugTenderlyRPC } from 'elements/debug/DebugTenderlyRPC';
import { bntToken } from 'services/web3/config';

export const DebugPage = () => {
  const { isNetworkActive, user } = useWeb3();
  const { Token } = useContract();
  const { openModal } = useModal();

  const connect = (type: ConnectionType) => {
    const connection = getConnection(type);
    connection.connector.activate();
  };

  const readChain = async () => {
    try {
      const decimals = await Token(bntToken).read.decimals();
      console.log('decimals', decimals);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className={'px-content'}>
      <h1 className={'text-red-600'}>Hello</h1>
      <div>
        <button
          onClick={() => openModal('dataExample', { foo: 'asd', bar: 'asd' })}
        >
          open example modal with data
        </button>
      </div>

      <div>
        <button onClick={() => openModal('tokenLists', undefined)}>
          open token list modal
        </button>
      </div>
      <div>
        <button onClick={() => readChain()}>read chain</button>
        {isNetworkActive ? 'true' : 'false'}
      </div>
      <div>
        <div className={'flex flex-col space-y-1'}>
          {SELECTABLE_CONNECTION_TYPES.map((type) => (
            <button
              key={type}
              className={'bg-sky-500 px-2 text-white'}
              onClick={() => connect(type)}
            >
              {getConnectionName(type, true)} connect
            </button>
          ))}
          <div>{user ? user : 'not logged in'}</div>
        </div>
      </div>

      <DebugTenderlyRPC />
      <DebugImposter />
    </main>
  );
};
