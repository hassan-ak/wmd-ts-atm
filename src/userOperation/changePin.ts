// change Pin
import inquirer from 'inquirer';
import { atmUsers } from '../userData/users.js';

/******************************************/
// ask user for new pin and change pin
// chnage pin in dtabase
// displays a msg and returns a promise
async function changePin(user: string): Promise<true> {
  console.log('');
  const response: { response: string; responseN: string } =
    await inquirer.prompt([
      {
        message: 'Enter your current Pin : ',
        name: 'response',
        type: 'password',
        mask: true,
        validate(input) {
          if (input === atmUsers[user].pin) {
            return true;
          }
          return 'You entered an in-valid Pin';
        },
      },
      {
        message: 'Enter your new Pin : ',
        name: 'responseN',
        type: 'password',
        mask: true,
        validate(input) {
          if (input.length === 4) {
            // update pin
            atmUsers[user].pin = input;
            return true;
          }
          return 'Pin should be 4 digits long';
        },
      },
    ]);
  return new Promise<true>((resolve) => {
    console.log('\n\tPin Changed');
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
}

/******************************************/
export { changePin };
