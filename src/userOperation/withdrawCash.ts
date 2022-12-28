// Display cashwithdrawl
import chalk from 'chalk';
import Table from 'cli-table';
import { atmUsers } from '../userData/users.js';
import { cointinueF } from '../genOperation/continue.js';

/**************************************************************************/
// Function to withdraw amount
// after displaying prompt user to continue
async function withDrawCash(user: string, amount: number): Promise<true> {
  console.log('');
  return new Promise((resolve) => {
    var withdrawTable: Table = new Table({
      head: [chalk.green('Cash Withdraw')],
    });
    let withDrawI: string[][] = [];

    if (atmUsers[user].balance >= amount) {
      atmUsers[user].balance = atmUsers[user].balance - amount;
      withDrawI.push([
        `
      Account holder    :   ${atmUsers[user].fullName}
      Bank              :   ${atmUsers[user].bankName}
      Account No.       :   ${atmUsers[user].accountNumber}\n\n
      Amount Withdrawn  :   ${chalk.bold(amount)}\n\n
      Remaining Balance :   ${chalk.bold(atmUsers[user].balance)}\n
      `,
      ]);
    } else {
      withDrawI.push([
        `\n\n${chalk.red('You are running low on balance')}\n\n`,
      ]);
    }

    // add response to the table
    withdrawTable.push(...withDrawI);
    // console table
    console.log(withdrawTable.toString());
    setTimeout(async () => {
      console.log(' ');
      // coninue prompt
      resolve(await cointinueF());
    }, 1000);
  });
}

/**************************************************************************/
export { withDrawCash };
