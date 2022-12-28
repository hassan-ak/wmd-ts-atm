#!/usr/bin/env node

// ATM App
import { logout } from './animations/logout.js';
import { login } from './genOperation/login.js';
import { createUsers } from './userData/users.js';
import { wellcome } from './messages/wellcome.js';
import { userPanel } from './panels/userPanel.js';
import { adminPanel } from './panels/adminPanel.js';
import { transfer } from './userOperation/transfer.js';
import { quitApp } from './animations/quitAnimation.js';
import { welcomeUser } from './messages/wellcomeUser.js';
import { changePin } from './userOperation/changePin.js';
import { startApp } from './animations/startAnimation.js';
import { startShut } from './adminOperation/startShut.js';
import { instructions } from './messages/instructions.js';
import { showUsers } from './adminOperation/displayUsers.js';
import { transferInput } from './userInputs/transferInput.js';
import { fastCashInput } from './userInputs/fastCashInput.js';
import { withDrawInput } from './userInputs/withDrawInput.js';
import { withDrawCash } from './userOperation/withdrawCash.js';
import { balanceInquiry } from './userOperation/balanceInquiry.js';
import { confirmAccount } from './userOperation/confirmAccount.js';
import { transferDetails } from './userOperation/transferDetails.js';

/**************************************************************************/
// ATM App
// Call Functions in a sequence
async function atm() {
  // App welocme Message
  await wellcome(500);
  // Instructions
  await instructions(2);
  // Ask user to start or shutdown
  const startResponse = await startShut();
  // When user select to start atm
  if (startResponse) {
    // start app animation
    await startApp();
    // run atm on loop
    let atmRunning = true;
    while (atmRunning) {
      // welcome message and ask to login
      await wellcome(0);
      let user = await login();
      // when loged in loop over
      let loggedIn = true;
      while (loggedIn) {
        // When signed user is admin
        if (user === 'admin') {
          // app and user welcome
          await wellcome(0);
          welcomeUser(user);
          // admin panel options
          const adminResponse = await adminPanel();
          // based on user response perform operations
          switch (adminResponse) {
            case 'Create New User':
              await createUsers();
              break;
            case 'List all Users':
              await showUsers();
              break;
            case 'LogOut':
              loggedIn = false;
              await logout();
              break;
            case 'ShutDown ATM':
              loggedIn = false;
              atmRunning = false;
              await quitApp();
              break;
            default:
              break;
          }
        }
        // When signed user is a consumer
        else {
          // app and user welcome
          await wellcome(0);
          welcomeUser(user);
          // user panel options
          const userResponse = await userPanel();
          // based on user response perform operations
          switch (userResponse) {
            case 'Fast Cash':
              let fastCashIn = await fastCashInput();
              await withDrawCash(user, fastCashIn);
              break;
            case 'Cash Withdrawl':
              let withDrawIn = await withDrawInput();
              await withDrawCash(user, withDrawIn);
              break;
            case 'Money Transfer':
              let transferIn = await transferInput();
              let confirmd = await confirmAccount(transferIn);
              let res = await transferDetails(confirmd);
              if (res && confirmd) {
                await transfer(user, transferIn.amount, confirmd);
              }
              break;
            case 'Balance Inquiry':
              await balanceInquiry(user);
              break;
            case 'Change Pin':
              await changePin(user);
              break;
            case 'LogOut':
              loggedIn = false;
              await logout();
              break;
            default:
              break;
          }
        }
      }
    }
  }
  // When user select to shutdown
  else {
    await quitApp();
  }
}

/**************************************************************************/
atm();
