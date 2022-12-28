// confrim details of reciever account

import { UserDetails, atmUsers } from '../userData/users.js';
import { TransferInput } from '../userInputs/transferInput.js';

/******************************************/
// return reciver account details or undefined
async function confirmAccount(
  userSelec: TransferInput
): Promise<[string, UserDetails] | undefined> {
  for (let i of Object.entries(atmUsers)) {
    if (
      i[1].accountNumber === userSelec.account &&
      i[1].bankName === userSelec.bank
    ) {
      return i;
    } else {
      continue;
    }
  }
}

/******************************************/
export { confirmAccount };
