// Start or Shutdown atm
import inquirer from 'inquirer';
/******************************************/
// Ask to start the atm or Shutdown
// return true or false based on choice
async function startShut() {
    const response = await inquirer.prompt([
        {
            message: 'What you want to do ?',
            name: 'response',
            type: 'list',
            choices: ['Start ATM', 'ShutDown ATM'],
        },
    ]);
    return response.response === 'Start ATM' ? true : false;
}
/******************************************/
export { startShut };
