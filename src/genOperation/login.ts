// Ask user to login
import inquirer from 'inquirer';
import { UserDetails, atmUsers } from '../userData/users.js';

/******************************************/
// function to ask user to login
// validate user details too
// returns user name
async function login(): Promise<string> {
  let user: UserDetails;
  const loginCrede: { username: string; pin: string } = await inquirer.prompt([
    // User name input and validation if it is in list or not
    {
      name: 'username',
      message: 'Enter UserName : ',
      type: 'input',
      validate: function (params: string) {
        if (params in atmUsers) {
          user = atmUsers[params];
          return true;
        } else {
          return 'Enter a valid user\n   You can login as admin to check usernames';
        }
      },
    },
    // User pin input and validation if it is correct pin or not
    {
      name: 'pin',
      message: 'Enter Pin : ',
      type: 'password',
      mask: true,
      validate: function (params) {
        if (params === user.pin) {
          return true;
        } else {
          return 'Enter a valid pin\n   You can login as admin to check pin';
        }
      },
    },
  ]);
  return loginCrede.username;
}

/******************************************/
export { login };
