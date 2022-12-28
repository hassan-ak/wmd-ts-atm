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
