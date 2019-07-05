const express = require('express');
const router = express.Router();
const repoController = require('./../controllers/repoController');

router.get('/all', repoController.getAllRepo);

router.get('/search', repoController.getRepoBySearch);

router.get('/:id', repoController.getRepoById);

router.get('/user/:username', repoController.getRepoByUsername);

router.get('/language/:language', repoController.getRepoByProgLang);



module.exports = router;
