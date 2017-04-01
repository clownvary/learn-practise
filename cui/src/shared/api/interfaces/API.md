## Active Net API Dashboard

### Data structure of Request and Response.
> **Request** :

```js
{
  "headers": {
    "page_info": {
      "sort_option": "asc", //asc or desc 
      "sort_by": '', // sort field
      "next_page": 2,
      "total_records_per_page": 10
    }
  },
  "body": //items list.. or items enum
}
```
> **Response** :

```js
{
  "headers": {
    "response_code": 1001401,
    "response_message": "Unauthorized access permissions",
    "page_info": {
      "total_page": 3,
      "current_page": 1,
      "total_records": 10
    },
    //other extra info...
  },
  "body": //items list.. or items enum
}
```
