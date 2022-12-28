// Fast cash Input
import inquirer from 'inquirer';
/******************************************/
// ask user for fast cash option
// returns a value
async function fastCashInput() {
    console.log('');
    const response = await inquirer.prompt([
        {
            message: 'Select amount to withdraw',
            name: 'response',
            type: 'list',
            choices: ['500', '1000', '5000', '10000', '20000'],
        },
    ]);
    return Number(response.response);
}
/******************************************/
export { fastCashInput };
