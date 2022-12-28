// Logout animation
import chalk from 'chalk';
import ora from 'ora';
/**********************************************************************/
// Animation to logout
function logout() {
    return new Promise((resolve) => {
        console.log('');
        // use ora to display an animation with a text
        const spinner = ora(chalk.magenta(' Logging Out '));
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
