require('chromedriver');
const {Builder, By, until} = require('selenium-webdriver');

const
    pURL = 'https://commerceos.staging.devpayever.com/',
    usernameInputPath = By.name('UserName'),
    passwordInputPath = By.xpath('/html/body/os-commerce/entry-layout-wrapper/entry-layout/div[2]/pe-info-box/div/mat-card/mat-card-content/div/div/login-layout/entry-login/div/form/pe-form-login-fieldset/div/div/div[2]/pe-input-password/mat-form-field/div/div[1]/div/div/input'),
    submitPath = By.xpath('/html/body/os-commerce/entry-layout-wrapper/entry-layout/div[2]/pe-info-box/div/mat-card/mat-card-content/div/div/login-layout/entry-login/div/form/button'),
    businessLoginButtonPath = By.xpath('//*[@id="os-app-main"]/switcher-profile-list/pe-profile-switcher/div/div/div/div/pe-profile-switcher-card/div/mat-card/mat-card-content/div[2]/div/div'),
    appsBoxWrapperPath = By.className('business-dashboard'),
    appsShopIconPath = By.xpath('/html/body/os-commerce/os-commerce-root/div[2]/span/business-dashboard-layout/base-dashboard/div/div/div/widgets-layout/div/apps-widget/widget-card/div/mat-card/div/div[2]/div/div/business-applications/div[7]/div[1]'),
    shopThemesPath = By.xpath('/html/body/os-commerce/os-commerce-root/platform-header-component/pe-platform-header/pe-navbar[1]/mat-toolbar/div[1]/button[3]/span/span'),
    shopAddThemePath = By.xpath('/html/body/os-commerce/os-commerce-root/div[2]/span/micro-container-component/div[1]/app-builder/pe-builder-themes-list/div[2]/pe-builder-themes-list-user/div/pe-builder-theme-plus/mat-card'),
    navBarAddTextButtonPath = By.xpath('/html/body/os-commerce/os-commerce-root/div[2]/span/micro-container-component/div[1]/app-builder/pe-builder-theme/pe-editor/div[1]/pe-builder-navbar-top/mat-toolbar/mat-toolbar-row/pe-builder-navbar-top-button[4]/button'),
    closeTopLeftPath = By.xpath('/html/body/os-commerce/os-commerce-root/platform-header-component/pe-platform-header/pe-navbar[1]/mat-toolbar/div[3]/button/span/span');

describe('Payever Selenium Mocha Task', function () {
    this.timeout(20000);
    let driver;
    before(async ()=> {
        driver = await new Builder().forBrowser('chrome').build();

    });
    afterEach(async ()=>{
        await driver.actions().pause(1000);
    });

    it('Login with credentials', async () => {
        // Load the page
        await driver.get(pURL);
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

        const actions = driver.actions({bridge: true});

        let elem;
        const findShadowDomElement = async (shadowDomElement) => {
            let shadowRoot;
            await (shadowRoot = getExtShadowRoot());
            await shadowRoot.then(async (result) => {
                await (elem = result.findElement(By.css(shadowDomElement)));
            });

            await actions.doubleClick(elem).pause(1000).sendKeys('This test is completed!').perform();

        };
        await findShadowDomElement('#text-editor');
    });

    it('Close the shop', async () => {
        await driver.findElement(closeTopLeftPath).click();
    });

    // close when finished
    after(() => driver && driver.quit());
});