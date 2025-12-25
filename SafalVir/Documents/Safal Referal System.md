Referral Reward System (Managed via SafalUtil)  
How It Works  
• A user (User-A) can refer another user (User-B) via a referral link or email invitation.  
• If User-B joins using the referral, User-A earns reward points based on the type of plan User-B selects during sign-up.  
• These points come with an expiry period and can be used to redeem gift cards or rewards.  
📌 Example:  
• User-A1 refers User-B1.  
• User-B1 signs up for a Free Plan → User-A1 earns 10 points (valid for 30 days)  
• If User-B1 had signed up for a Premium Plan, User-A1 would earn 20 points instead.  
________________________________________  
Admin Controls via SafalUtil  
Admins have full control over the referral system and can configure:  
• Point Value by Plan  
o Free Plan: 10 points  
o Premium Plan: 20 points  
(Admin can adjust these values as needed)  
• Referral Limits  
o Max total referrals per user (e.g., 100 users total)  
o Max referrals per user per month (e.g., 100/month)  
• Point Expiry Duration  
o Set how long points remain valid after a referral (e.g., 30 days)  
• Application Access Control  
o Admins can enable or disable the referral system for specific internal applications  
o These apps can use SafalUtil APIs to:  
 Add new referrals  
 View and display referral points to users  
________________________________________  
Point Redemption Process  
• Users can redeem their earned points by visiting the SafalUtil Shop Page.  
• From there, they can browse available rewards and complete the redemption process.  
________________________________________  
Gift Card Management  
Admins can manage reward inventory including:  
• Adding and updating gift card vendors and stock:  
o Example: $10 Amazon Gift Card – Qty: 100  
o Example: $5 XTZ Shop Gift Card – Qty: 500

  

  

# API For SafalUtilities

  
Point value get API - When User try to view there current point - 2h  
Point Record add API - When Other user add via a refer link, internally this api call to add point - 2h  
Refer Link generate API - Frontend call this api to generate refer link - 2h

Gift card manage Admin API - Create, View, Update, Delete - 4h  
P1 - Point Config Admin API - Create, View, Update, Delete - 5h  
get Gift Store API - 2h  
get user cart API - 2h  
update user cart API - 2h  
checkout user cart API - 2h

**UI For SafalUtilities**  
Gift card manage Admin  
Point Config Admin

**API For SafalMyBuy**  
Call SafalUtilities API

**UI For SafalMyBuy**  
Display user points  
Display user points history  
Redemption screen  
Generate refer code/link and share