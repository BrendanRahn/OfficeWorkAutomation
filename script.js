const {By, Builder, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const path = require('path');
const chromeDriverPath = path.resolve('./SeleniumDrivers');
const options = new chrome.Options();




async function loadOfficeAlly() {
    try {
        const driver = new Builder() 
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build()
    
        await driver.get('https://www.officeally.com/slogin.aspx');
        signIntoOfficeAlly(driver);
        navigateToClaim(driver);
        
    
        } catch (error) {
            console.log(error);
        }

}

async function signIntoOfficeAlly(driver) {

    let usernameField = await driver.findElement(By.id('Login1_UserName'));
    let passwordField = await driver.findElement(By.id('Login1_Password'));
    let loginButton = await driver.findElement(By.id('Login1_LoginButton'));

    await usernameField.sendKeys('brendanrahn');
    await passwordField.sendKeys('Potatopie39!');

    await loginButton.click();

    
}

async function navigateToClaim(driver) {

    //must wait until webpage loads or 'elementNotFound' error will be thrown
    await driver.wait(until.elementLocated(By.id('ASwitchOnlineEntry'), 5000));
    let onlineClaimLink1 = await driver.findElement(By.linkText('Online Claim Entry'));
    await onlineClaimLink1.click();

    //''
    await driver.wait(until.elementLocated(By.LinkText('Create Professional (CMS-1500) Claim'), 5000));
    let onlineClaimLink2 = await driver.findElement(By.linkText('Create Professional (CMS-1500) Claim'));
    await onlineClaimLink2.click();
}





loadOfficeAlly();