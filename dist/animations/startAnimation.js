// Show start animation
import chalk from 'chalk';
import ora from 'ora';
/**********************************************************************/
// Animation to start atm
function startApp() {
    return new Promise((resolve) => {
        console.log('');
        // use ora to display an animation with a text
        const spinner = ora(chalk.green(' Staring ATM '));
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
