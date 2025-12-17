1. Set Auth with Oauth 2/signin with (Google for Gmail), (Microsoft for  
    Outlook/hotmail)
2. Which system we going to use Python or NodeJS.
3. which protocol IMAP/POP/API we going to use (but this high risk)
4. Read Email
    1. Which Provider Gmail, Outlook ?
        1. Use API which provided by email provider.
        2. R&D needed
    2. How to get read Mail ?
        1. we don’t know email format (Text, HTML or any others) (Need R&D)
        2. set static email id (support@hulu.com/ invoice@hulu.com)
5. Create Template (Netflix, Hulu, HBO …)
    1. at least 2-5 mail invoice each company
6. Subscription Name, Company Name, Create Date, Subscription Amount, Next  
    Renew Date, End Date

Gmail Problem

By Default IMAP not enable.  
To Enable IMAP in Gmail  
Gmail Web => Setting => See All Setting => Forwarding and POP/IMAP => Enable  
IMAP => Save

If Gmail have 2FA or MFA then Gmail password not work.  
User need to go https://myaccount.google.com/apppasswords  
[https://myaccount.google.com/apppasswords] URL and Create a App passwords  
By Provide App Name and Click Create, Then Google will Generated app password.  
User Need to Use Gmail Address and This Generated Password.

Outlook Problem

By Default IMAP not enable.  
https://support.microsoft.com/en-us/office/pop-imap-and-smtp-settings-for-outlook-com-d088b986-291d-42b8-9564-9c414e2aa040  
[https://support.microsoft.com/en-us/office/pop-imap-and-smtp-settings-for-outlook-com-d088b986-291d-42b8-9564-9c414e2aa040]  
When i’m Testing This with Email and Password it not working. (Testing Account  
2FA)  
After Disable 2FA it still not working.

Yahoo Problem  
When Fetching Mail With Email and Password, it not working.  
Yahoo required Special Password for IMAP.  
when try to generate new app password getting error from Yahoo.  
https://help.yahoo.com/kb/generate-password-sln15241.html  
[https://help.yahoo.com/kb/generate-password-sln15241.html]