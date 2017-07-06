// import config from './config';

// module.exports = {
//   beforeEach: (browser) => {
//     browser
//     .url(`$(config.url)login`)
//     .waitForElementVisible('body', 1000)
//     .waitForElementVisible('#app', 1000);
//   },
//   'Invalid user': (browser) => {
//     browser
//     .setValue('input [type=email]', 'invalid@mail.com')
//     .setValue('input[type = password]', 'password')
//     .click('button[type=submit]')
//     .pause(1000)
//     .assert.visible('')
//     .assert.urlEquals(``)
//   }
// }