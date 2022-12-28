// Wellcome Message
import showBanner from 'node-banner';
/******************************************/
// returns a promise which resolves
// Displays title by using node-banner
// takes delay-time as argument
async function wellcome(time) {
    console.clear();
    return await new Promise((resolve) => {
        showBanner('A T M', '\t   CLI ATM', 'green', 'blue');
        setTimeout(() => {
            console.log('');
            resolve(true);
        }, time);
    });
}
/******************************************/
export { wellcome };
