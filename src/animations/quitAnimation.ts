// Show quit animation
import chalk from 'chalk';
import ora, { Ora } from 'ora';

/**********************************************************************/
// Animation to quit atm
function quitApp(): Promise<true> {
  return new Promise<true>((resolve) => {
    console.log('');
    // use ora to display an animation with a text
    const spinner: Ora = ora(chalk.red(' Shutting Down ATM '));
    spinner.spinner = 'triangle';
    spinner.color = 'red';
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
export { quitApp };