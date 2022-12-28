// Transfer ammount and display results
import chalk from 'chalk';
import Table from 'cli-table';
import { atmUsers } from '../userData/users.js';
import { cointinueF } from '../genOperation/continue.js';
/**************************************************************************/
// Function to transfer ammount
// display transaction details
// after displaying prompt user to continue
async function transfer(user, amount, details) {
    console.log('');
    return new Promise((resolve) => {
        // Money transfer results
        var transferTable = new Table({
            head: [chalk.green('Money Transfer')],
        });
        // table rows
        let transferI = [];
        // When balance is valid
        // update recievers and send account balance
        // update table row
        if (atmUsers[user].balance >= amount) {
            atmUsers[user].balance = atmUsers[user].balance - amount;
            atmUsers[details[0]].balance = atmUsers[details[0]].balance + amount;
            transferI.push([
                `
      Sender Account holder    :   ${atmUsers[user].fullName}
      Bank                     :   ${atmUsers[user].bankName}
      Account No.              :   ${atmUsers[user].accountNumber}\n\n
      Reciever Account holder  :   ${atmUsers[details[0]].fullName}
      Bank                     :   ${atmUsers[details[0]].bankName}
      Account No.              :   ${atmUsers[details[0]].accountNumber}\n\n
      Amount Transfered        :   ${chalk.bold(amount)}\n\n
      Remaining Balance        :   ${chalk.bold(atmUsers[user].balance)}\n
      `,
            ]);
        }
        else {
            transferI.push([
                `\n\n${chalk.red('You are running low on balance')}\n\n`,
            ]);
        }
        // add response to the table
        transferTable.push(...transferI);
        // console table
        console.log(transferTable.toString());
        setTimeout(async () => {
            console.log(' ');
            // coninue prompt
            resolve(await cointinueF());
        }, 1000);
    });
}
/**************************************************************************/
export { transfer };
