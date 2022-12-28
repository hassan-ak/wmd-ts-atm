// confrim details of reciever account
import { atmUsers } from '../userData/users.js';
/******************************************/
// return reciver account details or undefined
async function confirmAccount(userSelec) {
    for (let i of Object.entries(atmUsers)) {
        if (i[1].accountNumber === userSelec.account &&
            i[1].bankName === userSelec.bank) {
            return i;
        }
        else {
            continue;
        }
    }
}
/******************************************/
export { confirmAccount };
