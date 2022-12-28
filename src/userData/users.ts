// Users Data
// function to create user
import { nanoid } from 'nanoid';
import randomInteger from 'random-int';
import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';

/******************************************/
// User types defination
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

/******************************************/
// baseUser
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

/******************************************/
// generate random users
// List of banks and gender
// config setings for library
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

/******************************************/
// generate random data for the users
// Append in the original list
// argument for number of users
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
    // display when signle user is generated
    if (number === 1) {
      console.log('\n\tNew User Generated');
    }
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
}
/******************************************/

export { atmUsers, AtmUser, UserDetails, banks, createUsers };
