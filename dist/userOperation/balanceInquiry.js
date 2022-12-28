// Display user balance
import chalk from 'chalk';
import Table from 'cli-table';
import { atmUsers } from '../userData/users.js';
import { cointinueF } from '../genOperation/continue.js';
/**************************************************************************/
// Function to display user balance
// after displaying prompt user to continue
async function balanceInquiry(user) {
    console.log('');
    return new Promise((resolve) => {
        var balanceTable = new Table({
            head: [chalk.green('Balance Inquiry')],
        });
        let balanceI = [];
        // add users detai in users list
        balanceI.push([
            `
    Account holder    :   ${atmUsers[user].fullName}
    Bank              :   ${atmUsers[user].bankName}
    Account No.       :   ${atmUsers[user].accountNumber}\n\n
    Available Balance :   ${chalk.bold(atmUsers[user].balance)}\n
    `,
        ]);
        // add response to the table
        balanceTable.push(...balanceI);
        // console table
        console.log(balanceTable.toString());
        setTimeout(async () => {
            console.log(' ');
            // coninue prompt
            resolve(await cointinueF());
        }, 1000);
    });
}
/**************************************************************************/
export { balanceInquiry };
