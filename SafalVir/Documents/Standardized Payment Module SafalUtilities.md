  

Payment module can be attach to any SafalUtilities Application via API  
Payment can be have multiple payment vendor (Stripe, Paypal)

  

1. Product table for manage products which sync with payment vendor (Stripe, Paypal)  
    name, descriptions, status, stripeId, mongoId

  

1. Product price table for manage prices which sync with payment vendor (Stripe, Paypal)  
    name, descriptions, status, stripeId, mongoId, price in decimal, currency, interval, fequency, start date, end date.

  

1. Transactions history table  
    list of all Transactions can be sort and filter by user or plan

  

1. Feature Link table  
      
    

Question 1 : Can other company use this payment module ?  
if yes then how it work.  
  
Question 2: what are the Metrix we are need ?  
Question 3: Who link feature/functionality to a Plan? (SafalUtilities or that particular application backend)  
Question 4 : who handle free plan or zero price plan ? (SafalUtilities / Payment Vendor / that particular application Backend)  
  
Need  
1 . Stripe account with Project added.  
2. All the scenario where payment can be failed.  
3. All the scenario where plan can be change or update.

  

This Are my initial list of api  
  
1. Create, update, delete, get single, get all Plans (Admin Side)  
2. Create, update, delete, get single, get all Plan prices (Admin Side)  
3. Stripe webhook for handling CURD plan and CURD prices.  
4. Checkout api  
5. Checkout Success api  
6. Checkout failed api  
7. Get All Latest Active Plan and Prices API (User Side)  
8. Get User Current Plan info (User Side)

  

Need to Build an Standardized user management module then it easy to add payment module top of that. other wise fetching user info from separate database it complicated and difficult

  

# Standardized User Module SafalUtilities

user management table

field need  
first name, last name, email, username (optional), dob, country, state (optional), password. phone number (optional), profile image (optional)  
  
this module provide these apis

login api

register api

verify phone and email via code

forgot password api

forgot username api

update user api

soft delete user api

get current user info

  

each company can view all users in a table.  
can block, or force logout any user any time

request password change

When Block or Do any actions admin need to add a comments

  

  

  

## SafalCalendar Payment Plan Scenario

  

dose SCAL have any free plan ?

what happened when free plan are inactive by SUTI admin ?

What is the default plan of user at the time of register ?  
Do we need to show the plan selection screen after register done ?  
what happened when user have “PLAN-01” and SUTI admin inactive that plan “PLAN-01” ?

what happened when user already have “PLAN-01”, and try to upgrade to “PLAN-02” ? what happend to the prev plan benefit ?  
  
if there is no free plan and user want to cancel the current plan when what happened ?