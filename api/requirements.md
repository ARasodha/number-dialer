# Num Dialer
## General
- the list of phone numbers is static, some numbers repeat (users may call the same number more than once)
- API listens on localhost:4830 to a POST /call
  - request needs a JSON body with the following:
    - phone (string)
    - webhookURL (string) -- API server will make POST request to this URL, informing the status of the call
  - response is JSON with the following:
    - id (number) -- unique identifier of the call
### Request to Your Webhook
- call progress through three stages (ringing, answered, completed) -- the API server will make POST requests
to this URL informing the status for the cal
- POST requests will contain a JSON body with the following:
  - id (integer) -- call identifier
  - status (string) -- one of three status states
    ex: `{ "id": 2345, "status": "answered" }`

## Front-end
- two components to the front end:
  - you must display every phone number and the status of the call made to it
    - if the call hasn't begun yet, show status idle
    - status should update live, without refreshing the page
      - lag between webhook and status update on page is okay
  - single button labelled Call, which starts dialling 
    - page should not refresh/redirect when button is clicked
    - disable or remove the button after dialing is started; doesn't need too be re-rendered
  
## Back-end
  - must provide HTTP routes to display the front-end
  - make calls using the API
  - handle webhooks
  - key requirements:
    - once dialing has started, you must dial 3 numbers at the same time (at all times unless theres less than 3 left)
    - if a call finishes you should dial the next
    - numbers must be dialed in order
    - don't put this logic in the frontend
  - don't use a database, maintain state in memory 
    - can assume theres only one user, and the user only dials down the lsit of numbers once

  ### Backend Pedac
   1. Button gets clicked on the front end sending POST request to our backend /call
   2. Within our backend /call route the following must happen:
    - we dequeue three numbers from the phoneNumbers array
    - push each number in global activeCalls array
    - make a /post request to the API for each with the phone number and webhook url body
    - take axios response body and update callId in activeCalls array
  3. Our webhook handler recieves a post request for each call with callId and status update. We need to the following:
    - update the call in activeCalls with the new status -- match the callIds
    - Sent event to frontend with the udpated call object
    