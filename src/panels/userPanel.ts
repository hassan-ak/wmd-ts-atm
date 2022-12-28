// User Panel
import inquirer from 'inquirer';

/******************************************/
// User Panel
// list avaialble operations when loged in as User
// returns user selection
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

/******************************************/
export { userPanel };
