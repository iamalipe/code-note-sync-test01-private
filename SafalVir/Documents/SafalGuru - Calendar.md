### Normal User Side

1. Can create a calendar event based on type (1 to 1, 1 to many)
2. Create a public link to view the event
3. Other user can interact that event
4. Calendar have a contact manager
5. Normal user can view free time slot

  

### Developer Side

1. Developer need an API key, which then can get from Admin panel.
2. they can use the APIs to create, update, delete meeting.

  

  

### What we need TODO

1. Backend
    1. User Auth and user management
    2. contact manager CRUD
    3. meeting manager CRUD
    4. Dashboard and KPI
    5. API key system
2. Frontend
    1. Admin Dashboard setup
    2. Login/register
    3. Forgot password/username.
    4. Dashboard and KPI
    5. Table like design for meeting and contact.
    6. public page
3. Landing Page (NEED DESIGN)
    1. Hero section
    2. feature section
    3. client testimony
    4. Pricing section
    5. footer section
    6. section for explore for other product

  

  

# 25/04/2025

  

### Create New Meeting

- Name: Meeting Name
- Type: One to One, Group (One to Many)
- Duration: In Hours/Minutes/Days/Weeks
    - Default: 30min
- Location (Optional):
    - Zoom
    - Google Meet
    - Microsoft Teams
    - In Person
        - Address needed
    - Phone Call
- Your Availability
    - Global time table or custom
- Invitee Limit
    - Only applies if type is Group
- Host: Default you, but you can choose another member
- Description: Optional
- Invite People: Can choose between your team or share the link to other people
    - Other people need to enter their email and name to acknowledge the meeting
    - If team member was added to list then they need to acknowledge the meeting

### Update Meeting or Change Request

- When acknowledged, at that time user can request to postpone the meeting date-time
    - Only applies to one-to-one meetings

### Functions

- Send notification (email) to invitee and owner
    - 30min before
    - 2h before
    - 1 day before
    - User can change the reminder notification date-time
- When meeting created
    - Meeting owner gets email
    - Invitee users get email
- When other people acknowledge via link
    - Owner gets email
    - You get email
- If location selected
    - Zoom meeting also created
    - Google Meet meeting also created
    - MS Teams meeting also created

  

### View Page

- Card or table like view to
    
    ![[image 2.png|image 2.png]]
    
- Calendar like page to View you current meeting and free slot
    
    ![[image 1.png]]
    
- a small calender in top to show current meeting

![[image 2 2.png|image 2 2.png]]