VERSION ✅ Must be 2.0.  
PRODID ✅ Identifies the app/product generating the file.  
UID ✅ Unique event ID across calendars. Best to use a unique string.  
DTSTAMP ✅ The time the event was created. Must be in UTC format.  
DTSTART ✅ Event start time.  
BEGIN:VEVENT / END:VEVENT ✅ Must wrap each event block.  
BEGIN:VCALENDAR / END:VCALENDAR ✅ Must wrap the calendar.

  

Field Why Use It?  
DESCRIPTION Provides more context to users.  
DTEND Not required if using DURATION, but at least one of them should be present.  
URL Lets users see images, join links, etc. Some calendar apps show this as a link.  
CALSCALE Usually GREGORIAN. Optional unless using another calendar system.