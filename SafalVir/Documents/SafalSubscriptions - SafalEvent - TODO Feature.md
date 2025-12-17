SafalSubscriptions - SafalEvent - TODO

Fields  
Image - Optional  
Name - Require  
Description - Optional  
Budget - Optional  
Created By - Default who created  
Status - Pending, Approved, Rejected, (Creation Time Event Owner Default - Approved) (Creation Time Event Buddy Default - Pending)  
Target Date - Optional  
Assignee - Required, (Only Event Owner can select) (For Buddy default - Event Owner)

Need to Have  
Pagination, Sort, Search by Name

Action Button Function => View, Edit, Delete, Change Status  
Only Event Owner can Edit, Delete, change Status

Notification  
If Owner Assign a Buddy then that get notification.  
If Buddy add an Todo then that Event Owner get notification.

Change Log  
For Owner log every changes.  
if buddy add as todo then that buddy and event owner both get the change log.

Scenario

User-A1 = already have SafalSafalSubscription Account  
User-A2 = already have SafalSafalSubscription Account

User-B1 = Don’t Have Account

Scenario 01  
=> User-A1 (Owner)  
=> SafalEvent  
=> Create a Private Event  
=> Invite User-A2 (At the time of invite Owner can create custom form)

=> User-A2 Get Notification + Email  
=> Accept/Reject (When Accept User-A2 must fill the form)  
=> then can do task based on the role

On the event Day => User-A1 (Owner) Open QR/Manual RSVP Check-in  
User-A2 Scan the QR code to complete the check-in

Scenario 02  
=> User-A1 (Owner)  
=> SafalEvent  
=> Create a Private Event  
=> Invite User-B1 (At the time of invite Owner can create custom form)

=> User-B1 Get Email  
=> Create a account on SafalSubscription  
=> Accept/Reject (When Accept User-B1 must fill the form)  
=> then can do task based on the role

On the event Day => User-A1 (Owner) Open QR/Manual RSVP Check-in  
User-B1 Scan the QR code to complete the check-in

Scenario 03  
=> User-A1 (Owner)  
=> SafalEvent  
=> Create a Public Event  
=> Create a invite link (At the time of invite Owner can create custom form)  
Owner can Limit that how many user can join via this link

=> User-B1 Get Invite link via WhatsApp  
=> Create a account on SafalSubscription  
=> Accept/Reject (When Accept User-B1 must fill the form)  
=> then can do task based on the role

On the event Day => User-A1 (Owner) Open QR/Manual RSVP Check-in  
User-B1 Scan the QR code to complete the check-in