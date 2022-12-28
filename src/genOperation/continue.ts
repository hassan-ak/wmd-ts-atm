// continue prompt
import inquirer from 'inquirer';

/******************************************/
// Ask user to continue
// any response and returns true
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

/******************************************/
export { cointinueF };
