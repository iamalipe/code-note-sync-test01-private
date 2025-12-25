02/09/2024  
We will move the country flag on the menu bar next to the user avatar and place the SafalBuddy icon there for accessing the buddy list. I’ll share the updated UI and user experience soon.  
In the buddy activity dynamic tile, we’ll add a “Blocked Buddy” tile along with the count. - DONE  
When a user clicks on the dynamic tile in the buddy report, it will navigate them to the buddy list page with the appropriate filter applied.  
For buddy activities such as adding a subscription, the specific subscription created by the buddy should be mentioned.  
In your buddy tile name, include “active” in brackets. - DONE  
Update the buddy activity report filter to:  
Change “Created Date” to “Activity Date.” - DONE  
Add filters for “Subscription Name” and “Buddy Name.”  
When our profile appears in the report, use “You” instead of the profile name. - DONE  
Make the Safal Gift option accessible from the user avatar dropdown. - DONE  
For the subscription dynamic tile, adjust the green color to match the notification count green. - DONE  
For both subscriptions and assets, allow users to view which buddies have similar subscriptions or assets.  
65e2d104f65e3930e7009234 netflix  
SafalRoom Private All API - DONE  
For the subscription dynamic tile, adjust the green color to match the notification count green. - DONE  
When our profile appears in the report, use “You” instead of the profile name. - DONE  
Make the Safal Gift option accessible from the user avatar dropdown. - DONE  
Change “Created Date” to “Activity Date.” - DONE  
In your buddy tile name, include “active” in brackets. - DONE  
In the buddy activity dynamic tile, we’ll add a “Blocked Buddy” tile along with the count. - DONE

03/08/2024  
Private Room Create UI + API intregration - DONE  
Private Room Feed UI + API intregration - DONE  
Private Room Polls UI + API intregration - DONE  
Private Room Update UI - DONE  
Private Room Update API intregration - DONE  
Private Room Forum UI + API intregration - DONE  
Private Room Polls UI + API intregration for Create Polls - DONE  
Private Room Forum Accept Reject - DONE  
Private Room Polls Accept/Reject by Admin - DONE

06/09/2024  
Fix the issue with the default company button in SafalRoom, which is not functioning properly. - DONE  
This redirect not available for custom company. SafalRoom Button not display when a Subscription use custom company. - DONE  
we can change private room company through a dropdown. I think we can make this field as editable - DONE  
If the same user is posting, we can replace their name with “You” to avoid displaying their actual name. - DONE  
we have a blank space here.. when i was checking screen on laptop - DONE  
we have to put an expiry date , till that expiry user can change their vote - DONE  
Allow selected sentiments to be deselected if required by the customer. - DONE  
Add a count showing the number of replies near the “Add” or “View Replies” buttons. - DONE  
Increase the character limit for topics to 200. - DONE  
Display activity counts (e.g., comments) for each topic in the forum. - DONE  
Allow users to accept or reject forum requests while viewing the info page. - DONE  
Ensure requests from business users are sorted in ascending order and also add search. - DONE

09/09/2024  
Update the business user change log when a business user accepts or rejects a request (log all activities). - DONE  
Enable calling and chatting with users directly from the forum list page. - Private and Public - DONE  
Add a filter in the feed for users and date ranges.  Private and Public - DONE  
Implement a search icon on the forum list page.  Private and Public - DONE  
Provide the option to assign admin roles to other businesses. - DONE  
Implement a soft delete for private rooms (when a user attempts to delete a room, show a popup message). The business user will decide whether to delete or keep the room, but users will no longer be able to interact with it, and it will not be visible to others. - DONE  
After deleting a room, users should be able to create a new one. - DONE

10/09/2024  
buddy activity on safalroom private must record on report - DONE  
buddy activity -  if a buddy parcipated in polls, forum, feed. - DONE  
buddy activity -  if a buddy join in room BuddyJoinPrivateSafalRoom - DONE  
SafalLeaderBoard scenarios for SafalRoom  
Creating a new private room will earn points. - DONE  
Adding new buddies to the room will grant points. - DONE  
Posting the first comment of the day on the feed will increase points. (Private - Public) - DONE  
Approving a forum will add points. - DONE  
Casting the first vote on a poll will earn points. (Private - Public) - DONE  
Replying to a comment for the first time in a day will raise points. (Private - Public) - DONE  
(Private Room - Business) Accept change Delete Permently - DONE  
(Private Room - Business) Reject change Soft Delete - DONE  
Update buddy count in create/update private room - DONE  
feed count need to add in private/public room - DONE  
Allow users to share invitation links to SafalRoom via other social media platforms. (API - DONE, UI - 50% Done)  
https://dev.safalsubscriptions.com/safalroom-private-invite?code=4311b5c3-7a54-4ce3-875c-b97995241bb6 (This is Share Link)

12/09/2024  
Enable users to mention others by typing “@” followed by the person’s name and $ for mention public room -  DONE  
Allow users to upload images up to 1 MB (business users can control this), which will reduce their upload credits. - API - DONE, UI - TODO  
I’ve implemented a global multi-image file upload function that excludes images exceeding the user’s upload limit or the per-attachment size limit.

13/09/2024  
——SafakRoom Image Upload———  
Image Upload + View => Create Feed Public - DONE - QA  
Image Display => Feed Public - DONE - QA  
Image Upload + View => Create Feed Reply Public - DONE - QA  
Image Display => Feed Reply Public - DONE - QA  
Image Upload + View => Create Forum Feed Public - DONE - QA  
Image Display =>Forum Feed Public - DONE - QA  
Image Upload + View => Create Forum Feed Reply Public - DONE - QA  
Image Display => Forum Feed Reply Public - DONE - QA  
Image Upload + View => Create Feed Private - DONE - QA  
Image Display => Feed Private - DONE - QA  
Image Upload + View => Create Feed Reply Private - DONE - QA  
Image Display => Feed Reply Private - DONE - QA  
Image Upload + View => Create Forum Feed Private - DONE - QA  
Image Display =>Forum Feed Private - DONE - QA  
Image Upload + View => Create Forum Feed Reply Private - DONE - QA  
Image Display => Forum Feed Reply Private - DONE - QA  
Sentiments also linked to - company room to room - DONE  
————- Change Log Add ————-  
Public Feed Create, Safal/Unsafal - DONE - QA  
Public Feed Reply Create, Safal/Unsafal - DONE - QA  
Public Forum Create - DONE - QA  
Public Forum Feed Create, Safal/Unsafal - DONE - QA  
Public Forum Feed Reply Create, Safal/Unsafal - DONE - QA  
Public Polls Vote - DONE - QA  
Private Create, Update Private Room - DONE - QA  
Private Feed Create, Safal/Unsafal - DONE - QA  
Private Feed Reply Create, Safal/Unsafal - DONE - QA  
Private Forum Create, Accept/Reject - DONE - QA  
Private Forum Feed Create, Safal/Unsafal - DONE - QA  
Private Forum Feed Reply Create, Safal/Unsafal - DONE - QA  
Private Polls Create, Accept/Reject - DONE - QA  
Private Polls Vote - DONE - QA

17/09/2024  
Click on comapny room tag goto there room - DONE  
Global Share Link API, UI, Business - Done  
Fix Menction Dublication Issue - Done  
Click on user tag will show there info (image, name, chat, call, metual buddy, how old, how many feed post) - API Done - UI - TODO  
Reference Menction Parent Room Name in Child  
can u make the ” No forum found, No feed found and no polls found” in middle center of the screen. Make simialr in all tab  
reply and safal/unsafal banner only notification need to add  
Impliment FAQ icons for Safal leaderboard and Safalroom

18/09/2024  
Click on user tag will show there info (image, name, chat, call, metual buddy, how old, how many feed post) - DONE  
Reference Menction Parent Room Name in Child - DONE  
Impliment FAQ icons for Safal leaderboard and Safalroom - DONE  
Asset values are not updating correctly on the dynamic tile. - DONE  
Public Feed Search Added - DONE  
Reply must be link - company room to room - WORKING ON IT  
———– Parent to Child link - Done  
———– Child to Parent link - TODO  
can u make the ” No forum found, No feed found and no polls found” in middle center of the screen. Make simialr in all tab  
reply and safal/unsafal banner only notification need to add  
Default caption while sharing”Yay !… I justed added a subscription to track on safalsubscriptions application ”  
“A ‘Page not found’ error appears while loading.”  
“Ensure all replies are added to both tagged companies.”  
“Unable to upload multiple images.”  
“Close the popup when the user clicks outside of it.”  
“Allow users to update their date of birth, but ensure it cannot be set below 13 years, and make sure this is recorded in the change log.”  
add search on feed  
Reply must be link - company room to room  
Reference Menction Parent Room Name in Child  
Public Feed - Room/Company Name  
Public Forum Feed - Forum Name and Company  
Private Feed - Private Room Name and Company  
Private Forum Feed - Forum Name , Room Name, Company Name