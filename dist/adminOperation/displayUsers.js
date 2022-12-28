// Display users in a table
import Table from 'cli-table';
import { atmUsers } from '../userData/users.js';
import { cointinueF } from '../genOperation/continue.js';
/**************************************************************************/
// Function to display a table of all users
// after displaying users prompt user to continue
async function showUsers() {
    console.log('');
    return new Promise((resolve) => {
        // define users table
        var usersTable = new Table({
            head: [
                'UserName',
                'Pin',
                'Full Name',
                'Bank',
                'Gender',
                'Account No.',
                'Balance',
            ],
        });
        // table rows
        let users = [];
        // add users detai in users list
        for (let user of Object.keys(atmUsers)) {
            users.push([
                user,
                atmUsers[user].pin,
                atmUsers[user].fullName,
                atmUsers[user].bankName,
                atmUsers[user].gender,
                atmUsers[user].accountNumber,
                atmUsers[user].balance.toString(),
            ]);
        }
        // add users to the table
        usersTable.push(...users);
        // cossole table
        console.log(usersTable.toString());
        // promise retrun
        setTimeout(async () => {
            console.log(' ');
            // coninue prompt
            resolve(await cointinueF());
        }, 1000);
    });
}
/**************************************************************************/
export { showUsers };
