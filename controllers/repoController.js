const RepoModel = require('./../models/repoModel');
const logger = require('./../libs/loggerLib');
const response = require('./../libs/responseLib');

const ITEMS_PER_PAGE = 10;


exports.getAllRepo = (req, res) => {
    const page = +req.query.page || 1;    
    let maxPage;
    
    RepoModel.find().countDocuments()
    .then(count => {
        // console.log(count);
        maxPage = Math.ceil(count / ITEMS_PER_PAGE);
        if(page > maxPage) {
            throw new Error(`Page number cannot be greater than available repo pages (i.e.5), try smaller`);   
        } else {
            return RepoModel.find().skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
        }
    })
    .then(repos => {
        const apiResponse = response.generate(false, "Repos found successfully", 200, repos);
        res.status(apiResponse.status).send(apiResponse);
    })
    .catch(err => {
        logger.error(`${err}`, "RepoController: getAllRepo()", "high");
        let apiResponse = response.generate(true, "couldn' fetch repo", 500, null);
        res.status(apiResponse.status).send(apiResponse);
    });
    
}


exports.getRepoById = (req, res) => {
    const repoId = req.params.id;
    RepoModel.findById(repoId)
    .then(repo => {
        if(!repo) {
            let apiResponse = response.generate(true, "No repo found", 404, null);
            res.status(apiResponse.status).send(apiResponse);
        }
        let apiResponse = response.generate(false, "Repo found successfully", 200, repo);
        res.status(apiResponse.status).send(apiResponse);
        
    })
    .catch(err => {
        logger.error(`${err}`, "RepoController: getRepoById()", "high");
        let apiResponse = response.generate(true, "couldn' fetch repo", 500, null);
        res.status(apiResponse.status).send(apiResponse);
    });
}


exports.getRepoByUsername = (req, res) => {
    const username = req.params.username;
    
    RepoModel.find({username: username})
    .then(repos => {
        if (!repos) {
            let apiResponse = response.generate(true, "No repo found", 404, null);
            res.status(apiResponse.status).send(apiResponse);
        }
        let apiResponse = response.generate(false, "Repo found successfully", 200, repos);
        res.status(apiResponse.status).send(apiResponse);
    })
    .catch(err => {
        logger.error(`${err}`, "RepoController: getRepoByUsername()", "high");
        let apiResponse = response.generate(true, "couldn' fetch repo", 500, null);
        res.status(apiResponse.status).send(apiResponse);
    });
}


exports.getRepoByProgLang = (req, res) => {
    const progLang = req.params.language;
    console.log(progLang);
    RepoModel.find({ programmingLanguage: progLang })
    .then(repos => {
        if (!repos) {
            let apiResponse = response.generate(true, "No repo found", 404, null);
            res.status(apiResponse.status).send(apiResponse);
        }
        let apiResponse = response.generate(false, "Repo found successfully", 200, repos);
        res.status(apiResponse.status).send(apiResponse);
    })
    .catch(err => {
        logger.error(`${err}`, "RepoController: getRepoByProgLang()", "high");
        let apiResponse = response.generate(true, "couldn' fetch repo", 500, null);
        res.status(apiResponse.status).send(apiResponse);
    });
}


exports.getRepoBySearch = (req, res) => {
    const progLang = req.query.language;
    const username = req.query.username;
    
    let findByUsername = (username) => {
        return new Promise((resolve, reject) => {
            RepoModel.find({ username: username })
                .then(repos => {
                    if(repos) {
                        resolve(repos)
                    } else {
                        reject('No repo found');
                    }
                    
                })
                .catch(err => {
                    logger.error(`${err}`, "RepoController: getRepoBySearch(): findByUsername()", "high");
                    reject(err);
                });
        }); 
    }
    
    let findByLang = (progLang) => {
        return new Promise((resolve, reject) => {
            RepoModel.find({ programmingLanguage: progLang })
                .then(repos => {
                    if (repos) {
                        resolve(repos)
                    } else {
                        reject('No repo found');
                    }

                })
                .catch(err => {
                    logger.error(`${err}`, "RepoController: getRepoBySearch(): findByLang()", "high");
                    reject(err);
                });
        });
    }
    
    let findByBoth = (username, progLang) => {
        return new Promise((resolve, reject) => {
            RepoModel.find({ username: username, programmingLanguage: progLang })
                .then(repos => {
                    if (repos) {
                        resolve(repos)
                    } else {
                        reject('No repo found');
                    }

                })
                .catch(err => {
                    logger.error(`${err}`, "RepoController: getRepoBySearch(): findByBoth()", "high");
                    reject(err);
                });
        });
    }
    
    
    async function execute() {
        let data;
        try {
            if (username && progLang) {
                data = await findByBoth(username, progLang); 
            } else if (progLang) {
                data = await findByLang(progLang);
            } else if (username) {
                data = await findByUsername(username);
            } else {
                throw new Error('Please enter any serach parameter');
            }
            
            const apiResponse = response.generate(false, "Repos found successfully", 200, data);
            res.status(apiResponse.status).send(apiResponse);
        } catch (error) {
            const apiResponse = response.generate(true, error, 500, null);
            res.status(apiResponse.status).send(apiResponse);
        }
    }
    
    execute();
}

