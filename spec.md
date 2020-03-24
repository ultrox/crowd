```
{"status_code": 200, "data": {"link_save": {"long_url": "http://ma.vu/", 
"aggregate_link": "http://bit.ly/3bjXmOG", "link": "https://bit.ly/3bg8NH4", 
"new_link": 1, "user_hash": "3bg8NH4"}}, "status_txt": "OK"}
```



Short code is after the URL
myshort.com/SHORT_URL



## Short work flow

1. Retrieve that short from db (make sure its safe)
2. if TRUE find short, increment count & save to db, redirect with 301 to 
   retrieved url from DB
3. if FALSE (can't retrieve URL) provide feedback of 404


## Create Short Flow
1. type string to input field
2. send fetch request to API to shorten it
3. IF NEW_LINK show short URL with copy button
   IF EXISTING show short URL with analytics & copy button


## Redirect server only
cons: 

## Redirect Fronted


Scheme: 

```
{
  id: ID,
  long_url: "http://www.yovo.com",
  short_url: "1",
  date: "DATE",
  visited: 1,
}
```
