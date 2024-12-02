const { expect } = require('@playwright/test'); // Import the expect function
exports.LoginPage = 
class LoginPage{
    constructor(page) {
        this.page =  page;
        this.UserNameInput = "#user-name";
        this.PasswordInput = "#password";
        this.LoginBtn = "#login-button";
        this.pageTitle_Home = ".title"; // Selector for the page title
        this.ErrorMsg= "//div[@class='error-message-container error']/h3";
        this.Navbar ="#react-burger-menu-btn";
        this.Logout="#logout_sidebar_link";
        this.Logout_verify = ".login_logo";
        this.Emptylogin_ErrorMsg= "//h3[normalize-space()='Epic sadface: Username is required']";
    }
    async GoToLogin() {
        await this.page.goto("https://www.saucedemo.com/");
    }
//Login with Valid Credentials and assert title
    async validLogin(username, password){
        await this.page.locator(this.UserNameInput).fill(username);
        await this.page.locator(this.PasswordInput).fill(password);
        await this.page.locator(this.LoginBtn).click();
        const pageTitle = await this.page.locator(this.pageTitle_Home).textContent();
       await expect(pageTitle.trim()).toBe("Products");
       console.log(pageTitle); 
    }
    //Login inValid Credentials and Assert Title
    async InvalidLogin(username, password){
        await this.page.locator(this.UserNameInput).fill(username);
        await this.page.locator(this.PasswordInput).fill(password);
        await this.page.waitForTimeout(2000)
        await this.page.locator(this.LoginBtn).click();
        const login_ErrorMsg = await this.page.locator(this.ErrorMsg).textContent();
        await expect(login_ErrorMsg.trim()).toBe("Epic sadface: Username and password do not match any user in this service")    ;
        await this.page.waitForTimeout(2000)
        console.log(login_ErrorMsg);
    }
    //Empty login without data
    async EmptyLogin(){
        await this.page.locator(this.LoginBtn).click();
        const emptylogin_ErrorMsg = await this.page.locator(this.Emptylogin_ErrorMsg).textContent();
        await this.page.waitForTimeout(2000)
        await expect(emptylogin_ErrorMsg.trim()).toBe("Epic sadface: Username is required");
        console.log(emptylogin_ErrorMsg);
    }
    //Verify Logout Functionality
    async Logout_(){
        await this.page.locator(this.Navbar).click()
        await this.page.locator(this.Logout).click();
        const logout_verify = await this.page.locator(this.Logout_verify).textContent();
        await expect(logout_verify.trim()).toBe("Swag Labs");
        console.log(logout_verify);
    }
} 
