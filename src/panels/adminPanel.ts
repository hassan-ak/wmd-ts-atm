// Admin Panel
import inquirer from 'inquirer';

/******************************************/
// Admin Panel
// list avaialble operations when loged in as admin
// returns admin selection
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

/******************************************/
export { adminPanel };
