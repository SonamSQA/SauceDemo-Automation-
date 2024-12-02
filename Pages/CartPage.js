const { expect } = require('@playwright/test'); // Import the expect function
exports.CartPage = 
class CartPage {
    constructor(page) {
        this.page = page;
        this.AddToCart = "//button[@id='add-to-cart-sauce-labs-backpack']";
        this.AddToCartScndProduct ="//button[@id='add-to-cart-sauce-labs-bike-light']"; 
        this.CartQty = ".shopping_cart_badge";
        this.Clickcart = "#shopping_cart_container"; 
        this.RemoveCart = "//button[@id='remove-sauce-labs-backpack']";
        this.ContinueShoppping = "#continue-shopping";
        this.Checkout ="#checkout";
    }

    // Add an item to the cart and verify the quantity
    async addToCart() {
        await this.page.locator(this.AddToCart).click(); 
        const cartQty = await this.page.locator(this.CartQty).textContent();
        await expect(cartQty.trim()).toBe('1');
        console.log(cartQty); 
}

// Remove the item from the cart
    async RemoveFromCart() {
    await this.page.locator(this.RemoveCart).click();
    await this.page.waitForTimeout(2000)
}
//Verify Adding Multiple Products via Continue Shopping
  async MultiProductSelection(){
    await this.page.locator(this.Clickcart).click();
    await this.page.waitForTimeout(1000)
    await this.page.locator(this.ContinueShoppping).click();
    await this.page.waitForTimeout(1000)
    await this.page.locator(this.AddToCartScndProduct).click();
    await this.page.waitForTimeout(2000)
    const cartQty = await this.page.locator(this.CartQty).textContent();
    await expect(cartQty.trim()).toBe('2');
    console.log(cartQty); 
}
}