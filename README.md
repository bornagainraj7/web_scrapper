# WEB SCRAPPER / CRAWLER

This project is capable of scrapping github search page with any keyword(in this case its `nodejs`) and it starts from page 1 to page 5 of search page. After fetching it stores it into database(mongoDB).

## API endpoints

### Find All
`http://localhost:3000/api/repo/all`

This endpoint will fetch all the repo details saved in the with limit of 10 repos per page. The above endpoint can also have a query `page` as for page number 2 (e.g. `http://localhost:3000/api/repo/all?page=2`) if you want to fetch another page and so on till page 5 as this database has only 50 entries because of 5 page scrapping from github search.

result format(if successful): 
{
    "error": false,
    "message": "Repos found successfully",
    "status": 200,
    "data": [
        {
            "tags": [
                ""
            ],
            "_id": "5d1ee2ed3caa0c0b782d1cab",
            "title": "rnfsoft/dockerizing-nodejs-mongo",
            "programmingLanguage": "HTML",
            "url": "https://github.com/rnfsoft/dockerizing-nodejs-mongo",
            "username": "rnfsoft",
            "__v": 0
        },
        {
            "tags": [
                "nodejs",
                "  mongodb",
                "  mongoose",
                "  expressjs"
            ],
            "_id": "5d1ee2ed3caa0c0b782d1cad",
            "title": "amran08/mtp-profileApp",
            "programmingLanguage": "HTML",
            "url": "https://github.com/amran08/mtp-profileApp",
            "username": "amran08",
            "__v": 0
        }
    ]
}

result format(if error): 

{
    "error": true,
    "message": "Error message",
    "status": "500/404",
    "data": null
}


### Find by username

`http://localhost:3000/api/repo/user/:username`

This endpoint will fetch all the repos by a particular user without any limit as max limit will be 50 repos.

result format(if successful): 

{
    "error": false,
    "message": "Repo found successfully",
    "status": 200,
    "data": [
        {
            "tags": [
                "javascript",
                "nodejs"
            ],
            "_id": "5d1ee2ed3caa0c0b782d1cae",
            "title": "ManjitRabha/NodeJS-passport-authentication",
            "programmingLanguage": "JavaScript",
            "url": "https://github.com/ManjitRabha/NodeJS-passport-authentication",
            "username": "ManjitRabha",
            "__v": 0
        },
        {
            "tags": [
                ""
            ],
            "_id": "5d1ee2ed3caa0c0b782d1cb8",
            "title": "ManjitRabha/NodeJS-passport-authentication",
            "programmingLanguage": "JavaScript",
            "url": "https://github.com/ManjitRabha/NodeJS-passport-authentication",
            "username": "ManjitRabha",
            "__v": 0
        }
    ]
}

result format(if error): 

{
    "error": true,
    "message": "Error message",
    "status": "500/404",
    "data": null
}


### Find by repo id

`http://localhost:3000/api/repo/:id`

This endpoint will fetch the repo with that particular repo id.

result format(if successful): 

{
    "error": false,
    "message": "Repo found successfully",
    "status": 200,
    "data": {
        "tags": [
            ""
        ],
        "_id": "5d1ee2ed3caa0c0b782d1cab",
        "title": "rnfsoft/dockerizing-nodejs-mongo",
        "programmingLanguage": "HTML",
        "url": "https://github.com/rnfsoft/dockerizing-nodejs-mongo",
        "username": "rnfsoft",
        "__v": 0
    }
}

result format(if error): 

{
    "error": true,
    "message": "Error message",
    "status": "500/404",
    "data": null
}


### Find by programming language

`http://localhost:3000/api/repo/language/:language`

This endpoint will fetch all the repos by a particular programming language without any limit as max limit will be 50 repos.

result format(if successful):
{
    "error": false,
    "message": "Repo found successfully",
    "status": 200,
    "data": {
        "tags": [
            ""
        ],
        "_id": "5d1ee2ed3caa0c0b782d1cab",
        "title": "rnfsoft/dockerizing-nodejs-mongo",
        "programmingLanguage": "HTML",
        "url": "https://github.com/rnfsoft/dockerizing-nodejs-mongo",
        "username": "rnfsoft",
        "__v": 0
    }
}

result format(if error): 

{
    "error": true,
    "message": "Error message",
    "status": "500/404",
    "data": null
}


### Search

`http://localhost:3000/api/repo/search`

This endpoint return result of the search query which can be username or programming language or both, this endpoint requires atleast 1 query and max 2 queries and it will return repos according to it (e.g. `http://localhost:3000/api/repo/search?language=javascript&username=andyfly`). The position of the query doesn't matter.


result format(if successful): 

{
    "error": false,
    "message": "Repos found successfully",
    "status": 200,
    "data": [
        {
            "tags": [
                ""
            ],
            "_id": "5d1ee2ed3caa0c0b782d1cae",
            "title": "ManjitRabha/NodeJS-passport-authentication",
            "programmingLanguage": "JavaScript",
            "url": "https://github.com/ManjitRabha/NodeJS-passport-authentication",
            "username": "ManjitRabha",
            "__v": 0
        },
        {
            "tags": [
                ""
            ],
            "_id": "5d1ee2ed3caa0c0b782d1cb8",
            "title": "ManjitRabha/NodeJS-passport-authentication",
            "programmingLanguage": "JavaScript",
            "url": "https://github.com/ManjitRabha/NodeJS-passport-authentication",
            "username": "ManjitRabha",
            "__v": 0
        }
    ]
}

result format(if error): 

{
    "error": true,
    "message": "Error message",
    "status": "500/404",
    "data": null
}
