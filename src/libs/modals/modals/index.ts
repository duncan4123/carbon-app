import { ModalWallet } from 'libs/modals/modals/ModalWallet';
import {
  ModalTokenList,
  ModalTokenListData,
} from 'libs/modals/modals/ModalTokenList';
import { TModals } from 'libs/modals/modals.types';
import {
  ModalCreateConfirm,
  ModalCreateConfirmData,
} from 'libs/modals/modals/ModalCreateConfirm';
import {
  ModalImportToken,
  ModalImportTokenData,
} from 'libs/modals/modals/ModalImportToken';
import { ModalNotifications } from 'libs/modals/modals/ModalNotifications';

// Step 1: Add modal key and data type to schema
export interface ModalSchema {
  wallet: undefined;
  tokenLists: ModalTokenListData;
  txConfirm: ModalCreateConfirmData;
  importToken: ModalImportTokenData;
  notifications: undefined;
}

// Step 2: Create component in modals/modals folder

// Step 3: Add modal component here
export const MODAL_COMPONENTS: TModals = {
  wallet: (props) => ModalWallet(props),
  tokenLists: (props) => ModalTokenList(props),
  txConfirm: (props) => ModalCreateConfirm(props),
  importToken: (props) => ModalImportToken(props),
  notifications: (props) => ModalNotifications(props),
};
