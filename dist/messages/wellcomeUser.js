// Welcome Msg for particular user
import chalk from 'chalk';
import { atmUsers } from '../userData/users.js';
/******************************************/
// For Admin display admin otherwise userName
function welcomeUser(user) {
    if (user === 'admin') {
        console.log(`\nYou are logged-in as ${chalk.bgGray('Admin')}\n`);
    }
    else {
        console.log(`\nYou are logged-in as ${chalk.bgGray(atmUsers[user].fullName)}\n`);
    }
}
/******************************************/
export { welcomeUser };
