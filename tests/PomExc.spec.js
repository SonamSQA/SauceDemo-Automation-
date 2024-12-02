import {test, expect} from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { CartPage } from '../Pages/CartPage';
import { CheckoutPage } from '../Pages/CheckoutPage';
import { log } from 'console';

test ('test', async({page}) => {
 const login = new LoginPage(page);
 const cart = new CartPage(page);
 const checkout = new CheckoutPage(page);

//C82-	Verify that user should be able to login with valid username and valid password 
 await login.GoToLogin();
 await login.validLogin("standard_user","secret_sauce");
 
//C83-	Verify that user should not be able to login with valid user and invalid password 
 await login.GoToLogin();
 await login.InvalidLogin("standard_user","secret");

/*C84- Verify that the username and password fields should be mandatory,
 and an error message should be appeared if textbox left blank*/
await login.GoToLogin();
await login.EmptyLogin();

//C85-Verify that user should be able to add product in the cart
 await login.GoToLogin();
 await login.validLogin("standard_user","secret_sauce");
 await cart.addToCart();
 
//C86-Verify that the user should be able to Remove a Product from the Cart 
 await login.GoToLogin();
 await login.validLogin("standard_user","secret_sauce");
 await cart.RemoveFromCart();

//C87-Verify that user should be able to checkout the product with valid detail
await login.GoToLogin();
await login.validLogin("standard_user","secret_sauce");
await cart.addToCart();
await checkout.Checkout_click();
await checkout.Userinformation("Sonam","Khusheed","1234");
await checkout.Finish();

//C88-Verify that user should be able to add Multiple Products via Continue Shopping option
await login.GoToLogin();
await login.validLogin("standard_user","secret_sauce");
await cart.addToCart();
await cart.MultiProductSelection();

//C89-Verify that user should be able to Logout successfully
await login.Logout_();

})