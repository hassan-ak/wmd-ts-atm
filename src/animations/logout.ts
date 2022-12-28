// Logout animation
import chalk from 'chalk';
import ora, { Ora } from 'ora';

/**********************************************************************/
// Animation to logout
function logout(): Promise<false> {
  return new Promise<false>((resolve) => {
    console.log('');
    // use ora to display an animation with a text
    const spinner: Ora = ora(chalk.magenta(' Logging Out '));
    spinner.spinner = 'dots';
    spinner.color = 'magenta';
    spinner.start();
    // stop anmation and clear console
    setTimeout(() => {
      spinner.stop();
      console.clear();
      resolve(false);
    }, 2000);
  });
}

/**********************************************************************/
export { logout };
