'use strict';
/**
 * Require our modules
 */
const router = require('express').Router();

router.use('/users/myprofile', require('./users/myprofile/myprofile'));
router.use('/jokes', require('./jokes/jokes'));

// Export the module
module.exports = router;