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
        .sendKeys(johnDoeJson.box3.paitentDOB);

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

async function enterBox8(driver) {
    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_txtRsv8a"))
        .sendKeys(johnDoeJson.box8.reservedForNUCCUseBox1);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_txtRsv8b"))
        .sendKeys(johnDoeJson.box8.reservedForNUCCUseBox2);
}

async function enterBox9(driver) {
    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_SEC_INSRD_LST_NAME"))
        .sendKeys(johnDoeJson.box9.otherInsuredsLastName);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_SEC_INSRD_FST_NAME"))
        .sendKeys(johnDoeJson.box9.otherInsuredsFirstName);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_SEC_INSRD_MID_INIT"))
        .sendKeys(johnDoeJson.box9.otherInsuredsMiddleInitial);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_SEC_FECA_GRP_NUM"))
        .sendKeys(johnDoeJson.box9.otherInsuredsPolicyOrGroupNumber);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_txtRsv9b"))
        .sendKeys(johnDoeJson.box9.reservedForNUCCUseBox1);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_txtRsv9c"))
        .sendKeys(johnDoeJson.box9.reservedForNUCCUseBox2);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_SEC_INSRNCE_NAME"))
        .sendKeys(johnDoeJson.box9.insurancePlanNameorProgramName);
}

async function enterBox10(driver) {
    if(johnDoeJson.box10.relatedToEmplayment == "YES") {
        await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PNT_COND_FRM_EMPL1")).click();
    }
        else {
            await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PNT_COND_FRM_EMPL2")).click();
        }

    if(johnDoeJson.box10.relatedToAutoAccident == "YES") {
        await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PNT_COND_FRM_AUTO1")).click();
        await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_AUTO_STATE"))
            .sendKeys(johnDoeJson.box10.autoAccidentState);

    }
        else  {  
            await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PNT_COND_FRM_AUTO2")).click();
        }

    if (johnDoeJson.box10.relatedToOtherAccident == "YES") {
        await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PNT_COND_FRM_OTR1")).click();
    }
        else {
            await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PNT_COND_FRM_OTR2")).click();
        }

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_txtClaimCodes10d"))
        .sendKeys(johnDoeJson.box10.claimCodes);
    
}

async function enterBox11(driver) {
    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PRI_FECA_GRP_NUM"))
        .sendKeys(johnDoeJson.box11.insuredsPolicyOrFECANumber);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PRI_INSRD_DOB_Month"))
        .sendKeys(johnDoeJson.box11.insuredDOB);
    
    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PRI_INSRD_GENDER"))
        .sendKeys(johnDoeJson.box11.insuredsSex);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_selOtherClaimQual"))
        .sendKeys(johnDoeJson.box11.otherClaimIdBox);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_txtOtherClaimID"))
        .sendKeys(johnDoeJson.box11.otherClaimIdNumber);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PRI_INSRNCE_NAME"))
        .sendKeys(johnDoeJson.box11.insurancePlanNameorProgramName);

    if(johnDoeJson.box11.otherHealthBenefitPlan == "YES") {
        await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PRI_INSRD_HAS_2ND1")).click();
    }
        else {
            await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PRI_INSRD_HAS_2ND2")).click();
        }

}   

async function enterBox12 (driver) {
    //Just leave probably because this box is alreay filled out 
    //when the page is loaded
}

async function enterBox13(driver) {
    if (johnDoeJson.box13.insuredsSignature == "YES") {
        await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_INSURED_SIG1")).click();
    }
        else {
            await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_INSURED_SIG2")).click();
        }
}

async function enterBox14(driver) {
    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_DATE_OF_CURRENT_Month"))
        .sendKeys(johnDoeJson.box14.dateofIllness);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_selDateOfCurrentQual"))
        .sendKeys(johnDoeJson.box14.qualCode);
}

async function enterBox15(driver) {
    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_selOtherDateQual"))
        .sendKeys(johnDoeJson.box15.qualCode);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_SIMILAR_FIRST_DATE_Month"))
        .sendKeys(johnDoeJson.box15.otherDate);
}

async function enterBox16(driver) {
    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_UNABLE_WRK_FM_DATE_Month"))
        .sendKeys(johnDoeJson.box16.unableToWorkFromDate);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_UNABLE_WRK_TO_DATE_Month"))
        .sendKeys(johnDoeJson.box16.unableToWorkToDate);
}

async function enterBox17(driver) {
    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_selReferringProviderQual"))
        .sendKeys(johnDoeJson.box17.referringProviderCode);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_OrderFirst0212"))
        .sendKeys(johnDoeJson.box17.referringProviderFirstName);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_OrderMI0212"))
        .sendKeys(johnDoeJson.box17.referringProviderMiddleInitial);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_OrderLast0212"))
        .sendKeys(johnDoeJson.box17.referringProviderLastName);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_REFER_PHYSICIAN_QUALIFIER"))
        .sendKeys(johnDoeJson.box17.qualifierId);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_REFER_PHYSICIAN_ID"))
        .sendKeys(johnDoeJson.box17.physicianNumber);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_REFER_PHYSICIAN_NPI"))
        .sendKeys(johnDoeJson.box17.NPINumber);
}

async function enterBox18(driver) {
    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_HOSPITAL_FM_DATE_Month"))
        .sendKeys(johnDoeJson.box18.hospitalizationFromDate);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_HOSPITAL_TO_DATE_Month"))
        .sendKeys(johnDoeJson.box18.hospitalizationToDate)

}

async function enterBox19(driver) {
    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_RESERVE_LOCAL_USE"))
        .sendKeys(johnDoeJson.box19.additionalClaimInformation);
}       

async function enterBox20(driver) {
    if (johnDoeJson.box20.outsideOfLab == "YES") {
        await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_OUTSIDE_LAB1")).click();
        await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_OUTSIDE_LAB_CHRGS"))
            .sendKeys(johnDoeJson.box20.charges);
        
    }
        else {
            await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_OUTSIDE_LAB2")).click();
        }
}

async function enterBox21(driver) {
    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_DIAGNOSIS_CODECMS0212_1"))
        .sendKeys(johnDoeJson.box21.A);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_DIAGNOSIS_CODECMS0212_5"))
        .sendKeys(johnDoeJson.box21.E);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_DIAGNOSIS_CODECMS0212_9"))
        .sendKeys(johnDoeJson.box21.I);
}

async function enterBox22(driver) {
    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_MCAID_RESUB_CODE"))
        .sendKeys(johnDoeJson.box22.resubmissionCode);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_MCAID_ORIG_REF_NO"))
        .sendKeys(johnDoeJson.box22.originalRefNo);    
}

async function enterBox23(driver) {
    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_PRIOR_AUTH_NUMBER"))
        .sendKeys(johnDoeJson.box23.priorAuthorizationNumber);
}

async function enterBox24_1(driver) {
    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_ucHCFALineItem_ucClaimLineItem_DOS_COMMENTS0"))
        .sendKeys(johnDoeJson.box24[1].note);

    await driver.findElement(By.id("#ctl00_phFolderContent_ucHCFA_ucHCFALineItem_ucClaimLineItem_START_TIME0"))
        .sendKeys(johnDoeJson.box24[1].anestStart);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_ucHCFALineItem_ucClaimLineItem_STOP_TIME0"))
        .sendKeys(johnDoeJson.box24[1].anestEnd);

    await driver.findElement(By.id("ctl00_phFolderContent_ucHCFA_ucHCFALineItem_ucClaimLineItem_DRUG_QUALIFIER0"))
        .sendKeys(johnDoeJson.box24[1].NDCQual);

    await driver.findElement(By.id(""))

    await driver.findElement(By.id(""))

    await driver.findElement(By.id(""))
}

async function fillOutClaim(driver) {

    await driver.wait(until.elementLocated(By.id("Iframe9")), 1000);

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

    enterBox8(driver);

    enterBox9(driver);

    enterBox10(driver);

    enterBox11(driver);

    //enterBox12(driver); --Not needed probably

    enterBox13(driver);

    enterBox14(driver);

    enterBox15(driver);

    enterBox16(driver);

    enterBox17(driver);

    enterBox18(driver);

}



loadOfficeAlly();