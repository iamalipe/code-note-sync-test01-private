# SafalSubscriptions - SafalWarranty

## SafalWarranty Business Master Data UI + API

### Product Category (Dropdown)

- Name,SubCategory, Image, Status (Active/Inactive)
- Filter (Status)
- Sort (Name, Status)
- Download (CSV, Excel)
- Search (Name)

### Store/Retailer

- Name, Image, Website, Description (Max - 250), Status (Active/Inactive)
- Filter (Status)
- Download (CSV, Excel)
- Sort (Name, Status, Description)
- Search (Name)

### Warranty Type (Dropdown)

- Name (Standard, Extended, Manufacturer), Status (Active/Inactive)
- Filter (Status)
- Download (CSV, Excel)
- Sort (Name, Status)
- Search (Name)

### SafalWarranty User Side

- = Required
- STEP 1
    - Product Details
        - Product Name*
        - Product Category* (If Other then Enter Name) (MAX 100)
        - Product Sub-Category* (If Parent is Other then it is also Other and Edtible) (MAX 100)
        - Product Modal (MAX 100)
        - Serial No* (MAX 100)
    - Purchase Details
        - Purchase Date*
        - Store/retail* (If Other then Enter Name) (MAX 100)
        - Price*
        - Purchase Location
            - Country* (USA/INDIA) All Country
            - State is Dropdown if Country (USA/INDIA)
            - City (MAX 100)
            - Upload Invoice (S3 Private)
- STEP 2
    - Warranty Details
        - Start Date*
        - Duration* (Number)
        - Interval* (day, week, month, year)
        - Expire Date *(Auto Calculate From Start Dare) (User can Edit this)
        - Warranty Type* (if External, then Enter type)
        - Actual Warranty ID
        - Renewal Option (Checkbox)
        - Warranty Certificate (S3 Private)
    - Additional Service
        - Extended Warranty Available (Checkbox)
        - Upgrade Options (Checkbox)
        - Service Center Information
            - Phone Number
            - URL
            - Address Line 1 (MAX 500)
            - Address Line 2 (MAX 500)
            - Country (USA|INDIA)
            - State
- STEP 3
    - Claim procedure process
        - Information (MAX 500)
        - URL
        - NoteText
        - Array of files

FILTER - Expiration Date (Range), Purchase Date, Warranty Status, Product Price (Range), Extended Warranty  
SEARCH - Product Name,  
TABLE VIEW - Product Name, Purchase Date, Expiration Date, Warranty Status, Product Price, Extended Warranty  
SORT - Product Name, Purchase Date, Expiration Date, Warranty Status, Product Price, Extended Warranty  
DOWNLOAD - Product Name, Purchase Date, Expiration Date, Warranty Status, Product Price, Extended Warranty  
VIRTUAL CARD - Product Name, Purchase Date, Expiration Date, Warranty Status  
QR CODE - Product Name, Purchase Date, Expiration Date, Warranty Status  
Bluk Upload

Warranty Status (Active . Inactive)  
Warranty number need to show  
SafalWarrantyID  
NoteText  
Array of Files

TODO  
SafalWarrantyID  
Warranty Status (Active . Inactive)  
VIRTUAL CARD, Bluk Upload, notification cronjob, Array of Files  
add safalpoint to Warranty

VIRTUAL CARD, Bluk Upload,  
notification cronjob 7 days (reper every day), 15, 30, 45, 90 (Checkbox)  
add safalpoint to Warranty  
Create warranty every time crete a new,  
Share warranty every time,  
update warranty once a day.