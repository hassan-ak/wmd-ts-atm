# Steps to code CLI Currency Converter

### 1. Project initiation

- Create and navigate to project directory using following commands

  ```cmd
  mkdir wmd-ts-atm
  cd wmd-ts-atm
  ```

- Intilize a node project in the newly created directory using following command, this will create a `package.json` file.

  ```cmd
  npm init -y
  ```

- Create a `tsconfig.json` file to define typescript configration using following command

  ```cmd
  tsc --init
  ```

- Create two more directories to be used as root and out directory using

  ```cmd
  mkdir src
  mkdir dist
  ```

- Update `tsconfig.json` to include above directories and also change module and moduleResolution

  ```json
  "target": "ES2022",
  "module": "NodeNext",
  "rootDir": "./src",
  "moduleResolution": "NodeNext",
  "outDir": "./dist",
  ```

- Update `package.json` and add following content to it

  ```json
  "main": "./dist/index.js",
  "type": "module",
  "scripts": {
      "start": "node ."
  },
  "bin": "./dist/index.js",
  ```

### 2. Install dependencies

- Multiple third-party packages to be used in this project so install different dependacies using following commands

  ```cmd
  npm install ora
  npm install chalk
  npm install nanoid
  npm install inquirer
  npm install cli-table
  npm install random-int
  npm install node-banner
  npm install unique-names-generator
  ```

- Install types for the installed dependancies for the development using following set of commands

  ```cmd
  npm install --save-dev @types/ora
  npm install --save-dev @types/chalk
  npm install --save-dev @types/nanoid
  npm install --save-dev @types/inquirer
  npm install --save-dev @types/cli-table
  npm install --save-dev @types/random-int
  ```

- After installation `package.json` file will be updated and `package-lock.json` file along with `node_modules` folder will be created. We don't need git to track newly created files and folders so create a `.gitignore` file with the following content

  ```gitignore
  node_modules
  package-lock.json
  ```

### 3. Create Hello World

- To check if everything is setup properly first create a hello world. All the typescript files should be created in `./src` directory. Create a `index.ts` file with the following content

  ```ts
  console.log('Hello World!');
  ```

- To transpile the code to javascript we can use any of the following command, one thing to rember we need to use first command every time we make a change and the second one automatically create js files on every change. So we are going to use the latter one. All the js files will be stored in the `./dist` folder as we declared in our `tsconfig.json` file earlier.

  ```cmd
  tsc
  tsc -w
  ```

- to run the js file we can use any of the following commands

  ```cmd
  node .\dist\index.js
  node .
  npm start
  ```

- If everything is right we will have a console output.

### 4. Create random users

- Create `./userData/user.ts` with the following code to add some test users and a function to create random users

  ```ts
  import { nanoid } from 'nanoid';
  import randomInteger from 'random-int';
  import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';
  interface UserDetails {
    fullName: string;
    bankName: string;
    gender: string;
    accountNumber: string;
    balance: number;
    pin: string;
  }
  interface AtmUser {
    [userName: string]: UserDetails;
  }
  let atmUsers: AtmUser = {
    admin: {
      fullName: '',
      bankName: '',
      gender: '',
      accountNumber: '',
      balance: 0,
      pin: 'admin',
    },
    test: {
      fullName: 'Test User',
      bankName: 'SCB',
      gender: 'Male',
      accountNumber: '298aa892',
      balance: 100000,
      pin: 'test',
    },
    temp: {
      fullName: 'Temp User',
      bankName: 'UBL',
      gender: 'Female',
      accountNumber: '12345678',
      balance: 1500,
      pin: 'temp',
    },
  };
  const genders: string[] = ['Male', 'Female'];
  const banks: string[] = ['HBL', 'NBP', 'UBL', 'MCB', 'SCB'];
  const namesConfig: Config = {
    dictionaries: [names, names],
    separator: ' ',
    length: 2,
  };
  const genderConfig: Config = {
    dictionaries: [genders],
  };
  const bankConfig: Config = {
    dictionaries: [banks],
  };
  async function createUsers(number: number = 1) {
    return new Promise<true>((resolve) => {
      for (let index = 0; index < number; index++) {
        const userName: string = nanoid(4).toLowerCase();
        const fullName: string = uniqueNamesGenerator(namesConfig);
        const bankName: string = uniqueNamesGenerator(bankConfig);
        const gender: string = uniqueNamesGenerator(genderConfig);
        const accountNumber: string = nanoid(8).toLowerCase();
        const balance: number = randomInteger(0, 1000000);
        const pin: string = (randomInteger(0, 9999) * 9999)
          .toString()
          .slice(0, 4);
        atmUsers[userName] = {
          fullName: fullName,
          bankName: bankName,
          gender: gender,
          accountNumber: accountNumber,
          balance: balance,
          pin: pin,
        };
      }
      if (number === 1) {
        console.log('\n\tNew User Generated');
      }
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }
  export { atmUsers, AtmUser, UserDetails, banks, createUsers };
  ```

### 5. Create messages and instructions

- Create `./messages/wellcome.ts` to display app title

  ```ts
  import showBanner from 'node-banner';
  async function wellcome(time: number): Promise<true> {
    console.clear();
    return await new Promise<true>((resolve) => {
      showBanner('A T M', '\t   CLI ATM', 'green', 'blue');
      setTimeout(() => {
        console.log('');
        resolve(true);
      }, time);
    });
  }
  export { wellcome };
  ```

- Create `./messages/instructions.ts` to display instructions regarding the app and genrate random users on start up

  ```ts
  import chalk from 'chalk';
  import { createUsers } from '../userData/users.js';
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
  export { instructions };
  ```

- Create `./messages/wellcomeUser.ts` to wellcome signed-in user

  ```ts
  import chalk from 'chalk';
  import { atmUsers } from '../userData/users.js';
  function welcomeUser(user: string) {
    if (user === 'admin') {
      console.log(`\nYou are logged-in as ${chalk.bgGray('Admin')}\n`);
    } else {
      console.log(
        `\nYou are logged-in as ${chalk.bgGray(atmUsers[user].fullName)}\n`
      );
    }
  }
  export { welcomeUser };
  ```

### 6. Create Animations

- Create `./animations/startAnimation.ts` to display animation on staring atm

  ```ts
  import chalk from 'chalk';
  import ora, { Ora } from 'ora';
  function startApp(): Promise<true> {
    return new Promise<true>((resolve) => {
      console.log('');
      const spinner: Ora = ora(chalk.green(' Staring ATM '));
      spinner.spinner = 'growHorizontal';
      spinner.color = 'green';
      spinner.start();
      setTimeout(() => {
        spinner.stop();
        console.clear();
        resolve(true);
      }, 2000);
    });
  }
  export { startApp };
  ```

- Create `./animations/logout.ts` to display animation on logout

  ```ts
  import chalk from 'chalk';
  import ora, { Ora } from 'ora';
  function logout(): Promise<false> {
    return new Promise<false>((resolve) => {
      console.log('');
      const spinner: Ora = ora(chalk.magenta(' Logging Out '));
      spinner.spinner = 'dots';
      spinner.color = 'magenta';
      spinner.start();
      setTimeout(() => {
        spinner.stop();
        console.clear();
        resolve(false);
      }, 2000);
    });
  }
  export { logout };
  ```

- Create `./animations/quitAnimation.ts` to display animation on shutDown

  ```ts
  import chalk from 'chalk';
  import ora, { Ora } from 'ora';
  function quitApp(): Promise<true> {
    return new Promise<true>((resolve) => {
      console.log('');
      const spinner: Ora = ora(chalk.red(' Shutting Down ATM '));
      spinner.spinner = 'triangle';
      spinner.color = 'red';
      spinner.start();
      setTimeout(() => {
        spinner.stop();
        console.clear();
        resolve(true);
      }, 2000);
    });
  }
  export { quitApp };
  ```

### 7. Create General Operations

- Create `./genOperation/login.ts` to add lgoin operation

  ```ts
  import inquirer from 'inquirer';
  import { UserDetails, atmUsers } from '../userData/users.js';
  async function login(): Promise<string> {
    let user: UserDetails;
    const loginCrede: { username: string; pin: string } = await inquirer.prompt(
      [
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
      ]
    );
    return loginCrede.username;
  }
  export { login };
  ```

- Create `./genOperation/continue.ts` to add call-able continue operation

  ```ts
  import inquirer from 'inquirer';
  async function cointinueF(): Promise<true> {
    const res: { response: boolean } = await inquirer.prompt([
      {
        name: 'response',
        type: 'confirm',
        message: 'Enter to continue : ',
        default: 'Yes',
      },
    ]);
    return true;
  }
  export { cointinueF };
  ```

### 8. Create Panels

- Create `./panels/adminPanel.ts` to define admin panel

  ```ts
  import inquirer from 'inquirer';
  async function adminPanel(): Promise<string> {
    const response: { response: string } = await inquirer.prompt([
      {
        message: 'What you want to do ?',
        name: 'response',
        type: 'list',
        choices: [
          'Create New User',
          'List all Users',
          'ShutDown ATM',
          'LogOut',
        ],
      },
    ]);
    return response.response;
  }
  export { adminPanel };
  ```

- Create `./panels/userPanel.ts` to define user panel

  ```ts
  import inquirer from 'inquirer';
  async function userPanel(): Promise<string> {
    const response: { response: string } = await inquirer.prompt([
      {
        message: 'What you want to do ?',
        name: 'response',
        type: 'list',
        choices: [
          'Fast Cash',
          'Cash Withdrawl',
          'Money Transfer',
          'Balance Inquiry',
          'Change Pin',
          'LogOut',
        ],
      },
    ]);
    return response.response;
  }
  export { userPanel };
  ```

### 9. Create Admin Operations

- Create `./adminOperation/displayUsers.ts` to display all users

  ```ts
  import Table from 'cli-table';
  import { atmUsers } from '../userData/users.js';
  import { cointinueF } from '../genOperation/continue.js';
  async function showUsers(): Promise<true> {
    console.log('');
    return new Promise((resolve) => {
      var usersTable: Table = new Table({
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
      let users: string[][] = [];
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
      usersTable.push(...users);
      console.log(usersTable.toString());
      setTimeout(async () => {
        console.log(' ');
        resolve(await cointinueF());
      }, 1000);
    });
  }
  export { showUsers };
  ```

- Create `./adminOperation/startShut.ts` to define shutdown options

  ```ts
  import inquirer from 'inquirer';
  async function startShut(): Promise<boolean> {
    const response: { response: string } = await inquirer.prompt([
      {
        message: 'What you want to do ?',
        name: 'response',
        type: 'list',
        choices: ['Start ATM', 'ShutDown ATM'],
      },
    ]);
    return response.response === 'Start ATM' ? true : false;
  }
  export { startShut };
  ```

### 10. Create User Inputs

- Create `./userInputs/fastCashInput.ts` to ask user for fastcash inputs

  ```ts
  import inquirer from 'inquirer';
  async function fastCashInput(): Promise<number> {
    console.log('');
    const response: { response: string } = await inquirer.prompt([
      {
        message: 'Select amount to withdraw',
        name: 'response',
        type: 'list',
        choices: ['500', '1000', '5000', '10000', '20000'],
      },
    ]);
    return Number(response.response);
  }
  export { fastCashInput };
  ```

- Create `./userInputs/withDrawInput.ts` to ask user for withdraw cash inputs

  ```ts
  import inquirer from 'inquirer';
  async function withDrawInput(): Promise<number> {
    console.log('');
    const response: { response: string } = await inquirer.prompt([
      {
        message: 'Select amount to withdraw',
        name: 'response',
        type: 'input',
        default: 500,
        validate(input) {
          if (input % 500 !== 0) {
            return 'Enter a value in multiple of 500';
          }
          return true;
        },
      },
    ]);
    return Number(response.response);
  }
  export { withDrawInput };
  ```

- Create `./userInputs/transferInput.ts` to ask user for transfer cash inputs

  ```ts
  import inquirer from 'inquirer';
  import { banks } from '../userData/users.js';
  interface TransferInput {
    bank: string;
    account: string;
    amount: number;
  }
  async function transferInput(): Promise<TransferInput> {
    console.log('');
    const response: TransferInput = await inquirer.prompt([
      {
        message: 'Select bank : ',
        name: 'bank',
        type: 'list',
        choices: banks,
      },
      {
        message: 'Enter bank account : ',
        name: 'account',
        type: 'input',
        default: '0',
      },
      {
        message: 'Enter amount to transfer : ',
        name: 'amount',
        type: 'number',
        default: 0,
      },
    ]);
    return response;
  }
  export { transferInput, TransferInput };
  ```

### 11. Create User Operations

- Create `./userOperation/balanceInquirt.ts` for balance inquiry operation

  ```ts
  import chalk from 'chalk';
  import Table from 'cli-table';
  import { atmUsers } from '../userData/users.js';
  import { cointinueF } from '../genOperation/continue.js';
  async function balanceInquiry(user: string): Promise<true> {
    console.log('');
    return new Promise((resolve) => {
      var balanceTable: Table = new Table({
        head: [chalk.green('Balance Inquiry')],
      });
      let balanceI: string[][] = [];
      balanceI.push([
        `
      Account holder    :   ${atmUsers[user].fullName}
      Bank              :   ${atmUsers[user].bankName}
      Account No.       :   ${atmUsers[user].accountNumber}\n\n
      Available Balance :   ${chalk.bold(atmUsers[user].balance)}\n
      `,
      ]);
      balanceTable.push(...balanceI);
      console.log(balanceTable.toString());
      setTimeout(async () => {
        console.log(' ');
        resolve(await cointinueF());
      }, 1000);
    });
  }
  export { balanceInquiry };
  ```

- Create `./userOperation/changePin.ts` for changing pen operation

  ```ts
  import inquirer from 'inquirer';
  import { atmUsers } from '../userData/users.js';
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
  export { changePin };
  ```

- Create `./userOperation/withdrawCash.ts` for withdrawing cash operation

  ```ts
  import chalk from 'chalk';
  import Table from 'cli-table';
  import { atmUsers } from '../userData/users.js';
  import { cointinueF } from '../genOperation/continue.js';
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
      withdrawTable.push(...withDrawI);
      console.log(withdrawTable.toString());
      setTimeout(async () => {
        console.log(' ');
        resolve(await cointinueF());
      }, 1000);
    });
  }
  export { withDrawCash };
  ```

- Create `./userOperation/transferDetails.ts`, `./userOperation/confirmAccount.ts` and `./userOperation/transfer.ts` for transfer amount operation

  ```ts
  // confirmAccount.ts
  import { UserDetails, atmUsers } from '../userData/users.js';
  import { TransferInput } from '../userInputs/transferInput.js';
  async function confirmAccount(
    userSelec: TransferInput
  ): Promise<[string, UserDetails] | undefined> {
    for (let i of Object.entries(atmUsers)) {
      if (
        i[1].accountNumber === userSelec.account &&
        i[1].bankName === userSelec.bank
      ) {
        return i;
      } else {
        continue;
      }
    }
  }
  export { confirmAccount };
  ```

  ```ts
  // transferDetails.ts
  import chalk from 'chalk';
  import { UserDetails } from '../userData/users.js';
  import { cointinueF } from '../genOperation/continue.js';
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
  export { transferDetails };
  ```

  ```ts
  // transfer.ts
  import chalk from 'chalk';
  import Table from 'cli-table';
  import { UserDetails, atmUsers } from '../userData/users.js';
  import { cointinueF } from '../genOperation/continue.js';
  async function transfer(
    user: string,
    amount: number,
    details: [string, UserDetails]
  ): Promise<true> {
    console.log('');
    return new Promise((resolve) => {
      var transferTable: Table = new Table({
        head: [chalk.green('Money Transfer')],
      });
      let transferI: string[][] = [];
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
      } else {
        transferI.push([
          `\n\n${chalk.red('You are running low on balance')}\n\n`,
        ]);
      }
      transferTable.push(...transferI);
      console.log(transferTable.toString());
      setTimeout(async () => {
        console.log(' ');
        resolve(await cointinueF());
      }, 1000);
    });
  }
  export { transfer };
  ```

### 12. Combine all functionality

- Update index.ts to combine all the above said functionality

  ```ts
  #!/usr/bin/env node
  import { logout } from './animations/logout.js';
  import { login } from './genOperation/login.js';
  import { createUsers } from './userData/users.js';
  import { wellcome } from './messages/wellcome.js';
  import { userPanel } from './panels/userPanel.js';
  import { adminPanel } from './panels/adminPanel.js';
  import { transfer } from './userOperation/transfer.js';
  import { quitApp } from './animations/quitAnimation.js';
  import { welcomeUser } from './messages/wellcomeUser.js';
  import { changePin } from './userOperation/changePin.js';
  import { startApp } from './animations/startAnimation.js';
  import { startShut } from './adminOperation/startShut.js';
  import { instructions } from './messages/instructions.js';
  import { showUsers } from './adminOperation/displayUsers.js';
  import { transferInput } from './userInputs/transferInput.js';
  import { fastCashInput } from './userInputs/fastCashInput.js';
  import { withDrawInput } from './userInputs/withDrawInput.js';
  import { withDrawCash } from './userOperation/withdrawCash.js';
  import { balanceInquiry } from './userOperation/balanceInquiry.js';
  import { confirmAccount } from './userOperation/confirmAccount.js';
  import { transferDetails } from './userOperation/transferDetails.js';
  async function atm() {
    await wellcome(500);
    await instructions(2);
    const startResponse = await startShut();
    if (startResponse) {
      await startApp();
      let atmRunning = true;
      while (atmRunning) {
        await wellcome(0);
        let user = await login();
        let loggedIn = true;
        while (loggedIn) {
          if (user === 'admin') {
            await wellcome(0);
            welcomeUser(user);
            const adminResponse = await adminPanel();
            switch (adminResponse) {
              case 'Create New User':
                await createUsers();
                break;
              case 'List all Users':
                await showUsers();
                break;
              case 'LogOut':
                loggedIn = false;
                await logout();
                break;
              case 'ShutDown ATM':
                loggedIn = false;
                atmRunning = false;
                await quitApp();
                break;
              default:
                break;
            }
          } else {
            await wellcome(0);
            welcomeUser(user);
            const userResponse = await userPanel();
            switch (userResponse) {
              case 'Fast Cash':
                let fastCashIn = await fastCashInput();
                await withDrawCash(user, fastCashIn);
                break;
              case 'Cash Withdrawl':
                let withDrawIn = await withDrawInput();
                await withDrawCash(user, withDrawIn);
                break;
              case 'Money Transfer':
                let transferIn = await transferInput();
                let confirmd = await confirmAccount(transferIn);
                let res = await transferDetails(confirmd);
                if (res && confirmd) {
                  await transfer(user, transferIn.amount, confirmd);
                }
                break;
              case 'Balance Inquiry':
                await balanceInquiry(user);
                break;
              case 'Change Pin':
                await changePin(user);
                break;
              case 'LogOut':
                loggedIn = false;
                await logout();
                break;
              default:
                break;
            }
          }
        }
      }
    } else {
      await quitApp();
    }
  }
  atm();
  ```
