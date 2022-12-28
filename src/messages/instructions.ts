// Instructions regarding atm app
// create random users on startup
import chalk from 'chalk';
import { createUsers } from '../userData/users.js';

/**************************************************************************/
// console instruction
// Also create random users on startup
async function instructions(number: number): Promise<true> {
  createUsers(number);
  console.log(chalk.yellow('\nInstructions : '));
  console.log('\n\tLogin as admin');

  console.log('\t\tCreate new user');
  console.log(`\t\tList user's login credentials`);
  console.log('\t\tShutdown ATM');
  console.log('\t\tLogout');
  console.log('\n\tLogin as user');
  console.log('\t\tFast Cash');
  console.log('\t\tCash Withdrawl');
  console.log('\t\tMoney Transfer');
  console.log('\t\tBalance Inquiry');
  console.log(`\t\tChange Pin`);
  console.log('\t\tLogout');
  console.log('\n\tLogin Details');
  console.log('\t\tAdmin : ');
  console.log('\t\t\tUserName : admin');
  console.log('\t\t\tPin      : admin');
  console.log('\t\tUser : ');
  console.log('\t\t\tUserName : Login as admin to view UserNames');
  console.log('\t\t\tPin      : Login as admin to view Pins\n\n');
  return await new Promise<true>((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
}

/**************************************************************************/
export { instructions };
