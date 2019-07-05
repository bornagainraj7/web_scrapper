# WEB SCRAPPER / CRAWLER

This project is capable of scrapping github search page with any keyword(in this case its `nodejs`) and it starts from page 1 to page 5 of search page. After fetching it stores it into database(mongoDB).

## API endpoints

### Find All
`http://localhost:3000/api/repo/all`

This endpoint will fetch all the repo details saved in the with limit of 10 repos per page. The above endpoint can also have a query `page` as for page number 2 (e.g. `http://localhost:3000/api/repo/all?page=2`) if you want to fetch another page and so on till page 5 as this database has only 50 entries because of 5 page scrapping from github search.

`http://localhost:3000/api/repo/user/:username`

This endpoint will fetch all the repos by a particular user without any limit as max limit will be 50 repos.

`http://localhost:3000/api/repo/:id`

This endpoint will fetch the repo with that particular repo id.

`http://localhost:3000/api/repo/language/:language`

This endpoint will fetch all the repos by a particular programming language without any limit as max limit will be 50 repos.
