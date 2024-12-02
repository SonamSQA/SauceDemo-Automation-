const { expect } = require('@playwright/test'); // Import the expect function
exports.CheckoutPage =
class CheckoutPage{
constructor(page){
    this.page = page;
    this.Clickcart ="#shopping_cart_container";
    this.Checkout ="#checkout";
    this.CheckoutValidation ="//*[@id='header_container']/div[2]/span";
    this.Firstname ="#first-name";
    this.Lastname="#last-name";
    this.Postalcode="#postal-code";
    this.Continue="#continue";
    this.Finsh="#finish";
    this.FinshValidation = "//*[@id='checkout_complete_container']/h2";
}
//checkout and assert the title
async Checkout_click(){
    await this.page.locator(this.Clickcart).click();
    await this.page.locator(this.Checkout).click();
    await this.page.waitForTimeout(1000)
    const checkoutValidation = await this.page.locator(this.CheckoutValidation).textContent();
    await expect(checkoutValidation.trim()).toBe("Checkout: Your Information");
    await this.page.waitForTimeout(2000)
    console.log(checkoutValidation); 
}
//Add userinformation 
async Userinformation(firstname,lastname,postalcode)
{
    await this.page.locator(this.Firstname).fill(firstname);
    await this.page.locator(this.Lastname).fill(lastname);
    await this.page.locator(this.Postalcode).fill(postalcode);
    await this.page.locator(this.Continue).click();
    await this.page.waitForTimeout(2000)
}
//Finish 
async Finish(){
    await this.page.locator(this.Finsh).click();
    const finshvalidation =  this.page.locator(this.FinshValidation).textContent();
    await this.page.waitForTimeout(2000)
}}