// cash withdraw Input
import inquirer from 'inquirer';

/******************************************/
// ask user for an amount to withdraw
// returns a numeric value
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

/******************************************/
export { withDrawInput };
