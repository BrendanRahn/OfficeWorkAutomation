const {By, Builder, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const path = require('path');
const chromeDriverPath = path.resolve('./SeleniumDrivers');
const options = new chrome.Options();

const johnDoeJson = require("./johnDoeForm.json");




async function loadOfficeAlly() {
    try {
        const driver = new Builder() 
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build()
    
        await driver.get('https://www.officeally.com/slogin.aspx');
        await signIntoOfficeAlly(driver);
        await navigateToClaim(driver);
        await fillOutClaim(driver);
        
    
        } catch (error) {
            console.log(error);
        }

}

async function signIntoOfficeAlly(driver) {

    await driver.findElement(By.id('Login1_UserName'))
        .sendKeys('brendanrahn');

    await driver.findElement(By.id('Login1_Password'))
        .sendKeys('Potatopie39!');

    await driver.findElement(By.id('Login1_LoginButton'))
        .click();

}

async function navigateToClaim(driver) {

    //must wait until webpage loads or 'elementNotFound' error will be thrown
    //because driver cannot find the element because it hasnt loaded
    await driver.wait(until.elementLocated(By.id('ASwitchOnlineEntry'), 5000));

    //Claim button do not have ids, must find by linktext
    await driver.findElement(By.linkText('Online Claim Entry'))
        .click();

    
    await driver.wait(until.elementLocated(By.linkText('Create Professional (CMS-1500) Claim'), 5000));

    await driver.findElement(By.linkText('Create Professional (CMS-1500) Claim'))
        .click();
}

async function enterPayerInfo(driver) {
    //TODO -----------------------
    //write function to determine if user has address or id

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PAYER_INFO_1"))
        .sendKeys(johnDoeJson.payerInfo.payerName);
        
    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PAYER_INFO_2"))
        .sendKeys(johnDoeJson.payerInfo.payerAddress);
    
    //2nd address box

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PAYER_INFO_CITY"))
        .sendKeys(johnDoeJson.payerInfo.payerCity);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PAYER_INFO_STATE"))
        .sendKeys(johnDoeJson.payerInfo.payerState);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PAYER_INFO_ZIP"))
        .sendKeys(johnDoeJson.payerInfo.payerZIP);
}

async function selectInsuranceProvider(driver) {
    let insuranceProvider = johnDoeJson.box1.insuranceProvider;

    if (insuranceProvider == "MEDICARE")
        driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_INSURANCETYPE1")).click();
    else if (insuranceProvider == "MEDICAID")
        driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_INSURANCETYPE2")).click();
    else if (insuranceProvider == "TRICARE")
        driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_INSURANCETYPE3")).click();
    else if (insuranceProvider == "CHAMPVA")
        driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_INSURANCETYPE4")).click();
    else if (insuranceProvider == "GROUP_HEALTH_PLAN")
        driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_INSURANCETYPE5")).click()
    else if (insuranceProvider == "FECA_BLK_LUNG")
        driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_INSURANCETYPE6")).click();
    else if (insuranceProvider == "OTHER")
        await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_INSURANCETYPE7")).click();
    else 
        throw "Insurance provider not recognized"

}

async function enterBox1 (driver) {
    await selectInsuranceProvider(driver);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PRI_PATIENT_ID"))
        .sendKeys(johnDoeJson.box1.insuredsIdNumber);
}

async function enterBox2 (driver) {
    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_LAST_NAME"))
        .sendKeys(johnDoeJson.box2.paitentLastName);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_FIRST_NAME"))
        .sendKeys(johnDoeJson.box2.paitentFirstName);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_MIDDLE_INIT"))
        .sendKeys(johnDoeJson.box2.paitentMiddleInitial);
}

async function enterBox3 (driver) {
    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PATIENT_BIRTHDATE_Month"))
        .sendKeys(johnDoeJson.box3.paitentBirthMonth);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PATIENT_BIRTHDATE_Day"))
        .sendKeys(johnDoeJson.box3.paitentBirthDay);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PATIENT_BIRTHDATE_Year"))
        .sendKeys(johnDoeJson.box3.paitentBirthYear);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_GENDER"))
        .sendKeys(johnDoeJson.box3.paitentSex);
}

async function enterBox4(driver) {
    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PRI_INSRD_LST_NAME"))
        .sendKeys(johnDoeJson.box4.insuredsLastName)

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PRI_INSRD_FST_NAME"))
        .sendKeys(johnDoeJson.box4.insuredsFirstName);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PRI_INSRD_MID_INIT"))
        .sendKeys(johnDoeJson.box4.insuredsMiddleInitial);
}

async function enterBox5 (driver) {
    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_STREET_ADDR"))
        .sendKeys(johnDoeJson.box5.paitentAddress);
        
    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_CITY"))
        .sendKeys(johnDoeJson.box5.paitentCity);
    
    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_STATE"))
        .sendKeys(johnDoeJson.box5.paitentState);
    
    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_ZIP"))
        .sendKeys(johnDoeJson.box5.paitentZIP);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PHONE_AreaCode"))
        .sendKeys(johnDoeJson.box5.paitentTelephone);

}

async function enterBox6(driver) {
    let paitentRelationship = johnDoeJson.box6.paitentRelationshipToInsured

    if (paitentRelationship == "SELF")
        await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PNT_REL_TO_INSRD1")).click();
    else if (paitentRelationship == "SPOUSE")
        await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PNT_REL_TO_INSRD2")).click();
    else if (paitentRelationship == "CHILD")
        await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PNT_REL_TO_INSRD3")).click();
    else if (paitentRelationship == "OTHER")
        await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PNT_REL_TO_INSRD4")).click();
    else 
        throw "Paitent relationship not recognized"
}

async function enterBox7(driver) {
    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PRI_INSRD_ADDR"))
        .sendKeys(johnDoeJson.box7.insuredsAddress);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PRI_INSRD_CITY"))
        .sendKeys(johnDoeJson.box7.insuredsCity);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PRI_INSRD_STATE"))
        .sendKeys(johnDoeJson.box7.insuredsState);
    
    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PRI_INSRD_ZIP"))
        .sendKeys(johnDoeJson.box7.insuredsZIP);
    
    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PRI_INSRD_PHONE_AreaCode"))
        .sendKeys(johnDoeJson.box7.insuredsTelephone);
}

async function fillOutClaim(driver) {

    await driver.wait(until.elementLocated(By.id("Iframe9")), 5);

    //all claim fields are located in Iframe9, driver must be switched to Iframe 
    //reference to load the elements
    await driver.switchTo().frame("Iframe9");

    //individual boxes to not have to be async because their input is indepentent of each other
    enterPayerInfo(driver);

    enterBox1(driver);
    
    enterBox2(driver);

    enterBox3(driver);

    enterBox4(driver);

    enterBox5(driver);

    enterBox6(driver);

    enterBox7(driver);


}



loadOfficeAlly();