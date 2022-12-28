// transer amount Input
import inquirer from 'inquirer';
import { banks } from '../userData/users.js';

/******************************************/
interface TransferInput {
  bank: string;
  account: string;
  amount: number;
}
// ask user for inputs to transfer cash
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

/******************************************/
export { transferInput, TransferInput };
