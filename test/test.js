require('chromedriver');
const {Builder, By, until} = require('selenium-webdriver');

const usernameInputPath = By.name('UserName'),
    passwordInputPath = By.xpath('/html/body/os-commerce/entry-layout-wrapper/entry-layout/div[2]/pe-info-box/div/mat-card/mat-card-content/div/div/login-layout/entry-login/div/form/pe-form-login-fieldset/div/div/div[2]/pe-input-password/mat-form-field/div/div[1]/div/div/input'),
    submitPath = By.xpath('/html/body/os-commerce/entry-layout-wrapper/entry-layout/div[2]/pe-info-box/div/mat-card/mat-card-content/div/div/login-layout/entry-login/div/form/button'),
    businessLoginButtonPath = By.xpath('//*[@id="os-app-main"]/switcher-profile-list/pe-profile-switcher/div/div/div/div/pe-profile-switcher-card/div/mat-card/mat-card-content/div[2]/div/div'),
    appsMenuLinkPath = By.xpath('/html/body/os-commerce/os-commerce-root/platform-header-component/pe-platform-header/pe-navbar/mat-toolbar/div[1]/button[2]/span/span'),
    appsBoxWrapperPath = By.className('apps-box-wrapper'),
    appsShopIconPath = By.xpath('/html/body/os-commerce/os-commerce-root/div[2]/span/business-layout/apps-layout/div/div/app-card/div/mat-card/div[1]/business-applications/div[7]/div[1]/div'),
    shopThemesPath = By.xpath('/html/body/os-commerce/os-commerce-root/platform-header-component/pe-platform-header/pe-navbar[1]/mat-toolbar/div[1]/button[3]/span/span'),
    shopAddThemePath = By.xpath('/html/body/os-commerce/os-commerce-root/div[2]/div/app-builder/pe-builder-themes-list/div[2]/pe-builder-themes-list-user/div/pe-builder-theme-plus/mat-card/mat-card-content'),
    navBarAddTextButtonPath = By.xpath('/html/body/os-commerce/os-commerce-root/div[2]/div/app-builder/pe-builder-theme/pe-editor/div[1]/pe-builder-navbar-top/mat-toolbar/mat-toolbar-row/pe-builder-navbar-top-button[4]/button'),
    closeTopLeftPath = By.xpath('/html/body/os-commerce/os-commerce-root/platform-header-component/pe-platform-header/pe-navbar[1]/mat-toolbar/div[3]/button/span/span');

describe('Payever Selenium Mocha Task', function () {
    this.timeout(20000);
    let driver;
    before(async ()=> {
        driver = await new Builder().forBrowser('chrome').build();

    });
    afterEach(async ()=>{
        await driver.actions({bridge: true}).pause(1000);
    });

    it('Login with credentials', async () => {
        // Load the page
        await driver.get('https://commerceos.staging.devpayever.com/');
        await driver.wait(until.elementLocated(usernameInputPath), 10000);

        await driver.findElement(usernameInputPath).sendKeys('aqa@payever.org');
        await driver.findElement(passwordInputPath).sendKeys('Aqacool123!');
    });

    it('Submit the Login form', async () => {
        await driver.findElement(submitPath).click();
    });

    it('Open Business Accoount Dashboard', async () => {
        await driver.wait(until.elementLocated(businessLoginButtonPath), 20000)
            .then(()=>{
                driver.findElement(businessLoginButtonPath).click();
            });
    });

    it('Click Apps link in Menu', async () => {
        await driver.wait(until.elementLocated(appsMenuLinkPath), 10000)
            .then(()=>{
                driver.findElement(appsMenuLinkPath).click();
            })
    });

    it('Click Shop Item', async () => {
        await driver.wait(until.elementLocated(appsBoxWrapperPath), 10000)
            .then(()=>{
                driver.findElement(appsShopIconPath).click();
            });

    });

    it('Click to show themes', async () => {
        await driver.wait(until.elementLocated(shopThemesPath), 10000)
            .then(()=>{
                driver.findElement(shopThemesPath).click();
            });
    });

    it('Click to add new theme', async () => {
        await driver.wait(until.elementLocated(shopAddThemePath), 15000)
            .then(()=>{
                driver.findElement(shopAddThemePath).click();
            });
    });

    it('Add text box', async () => {
        await driver.wait(until.elementLocated(navBarAddTextButtonPath), 10000)
            .then(()=>{
                driver.findElement(navBarAddTextButtonPath).click();
            });
    });

    it('Find ShadowRoot and send text to Textbox', async () => {
        const getExtShadowRoot = async () => {
            let shadowHost;
            await (shadowHost = driver.findElement(By.css('.pe-editor-canvas')));
            return driver.executeScript("return arguments[0].shadowRoot", shadowHost);
        };

        let elem;
        const findShadowDomElement = async (shadowDomElement) => {
            let shadowRoot;
            await (shadowRoot = getExtShadowRoot());
            await shadowRoot.then(async (result) => {
                await (elem = result.findElement(By.css(shadowDomElement)));
            });

            await driver.actions({bridge: true}).click(elem).pause(2000).sendKeys('This test is completed!').perform();
        };
        await findShadowDomElement('div > pe-editor-element-anchors > svg');
    });

    it('Close the shop', async () => {
        await driver.findElement(closeTopLeftPath).click();
    });

    // close when finished
    after(() => driver && driver.quit());
});