// Validate transfer details
import chalk from 'chalk';
import { cointinueF } from '../genOperation/continue.js';
/**************************************************************************/
// Returns true when details fetched
// Else error message
async function transferDetails(param) {
    if (param) {
        return true;
    }
    else {
        console.log(chalk.red('\n\tNo such Account found\n'));
        await cointinueF();
        return false;
    }
}
/**************************************************************************/
export { transferDetails };
