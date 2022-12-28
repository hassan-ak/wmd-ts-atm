// Users Data
// function to create user
import { nanoid } from 'nanoid';
import randomInteger from 'random-int';
import { uniqueNamesGenerator, names } from 'unique-names-generator';
/******************************************/
// baseUser
let atmUsers = {
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
const genders = ['Male', 'Female'];
const banks = ['HBL', 'NBP', 'UBL', 'MCB', 'SCB'];
const namesConfig = {
    dictionaries: [names, names],
    separator: ' ',
    length: 2,
};
const genderConfig = {
    dictionaries: [genders],
};
const bankConfig = {
    dictionaries: [banks],
};
/******************************************/
// generate random data for the users
// Append in the original list
// argument for number of users
async function createUsers(number = 1) {
    return new Promise((resolve) => {
        for (let index = 0; index < number; index++) {
            const userName = nanoid(4).toLowerCase();
            const fullName = uniqueNamesGenerator(namesConfig);
            const bankName = uniqueNamesGenerator(bankConfig);
            const gender = uniqueNamesGenerator(genderConfig);
            const accountNumber = nanoid(8).toLowerCase();
            const balance = randomInteger(0, 1000000);
            const pin = (randomInteger(0, 9999) * 9999)
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
export { atmUsers, banks, createUsers };
