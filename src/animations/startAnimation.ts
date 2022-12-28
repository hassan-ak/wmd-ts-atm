// Show start animation
import chalk from 'chalk';
import ora, { Ora } from 'ora';

/**********************************************************************/
// Animation to start atm
function startApp(): Promise<true> {
  return new Promise<true>((resolve) => {
    console.log('');
    // use ora to display an animation with a text
    const spinner: Ora = ora(chalk.green(' Staring ATM '));
    spinner.spinner = 'growHorizontal';
    spinner.color = 'green';
    spinner.start();
    // stop anmation and clear console
    setTimeout(() => {
      spinner.stop();
      console.clear();
      resolve(true);
    }, 2000);
  });
}

/**********************************************************************/
export { startApp };