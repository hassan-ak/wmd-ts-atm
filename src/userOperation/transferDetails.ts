// Validate transfer details
import chalk from 'chalk';
import { UserDetails } from '../userData/users.js';
import { cointinueF } from '../genOperation/continue.js';

/**************************************************************************/
// Returns true when details fetched
// Else error message
async function transferDetails(
  param: [string, UserDetails] | undefined
): Promise<boolean> {
  if (param) {
    return true;
  } else {
    console.log(chalk.red('\n\tNo such Account found\n'));
    await cointinueF();
    return false;
  }
}

/**************************************************************************/
export { transferDetails };
