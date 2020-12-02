const express = require("express");
const router = express.Router();

/**
 * @Method      POST
 * @Route       /api/posts
 * @Description Creates a post using the information sent inside the request body.
 */
router.post("");

/**
 * @Method      POST
 * @Route       /api/posts/:id/comments
 * @Description Creates a comment for the post with the specified id using information sent inside of the request body.
 */
router.post("");

/**
 * @Method      GET
 * @Route       /api/posts
 * @Description Returns an array of all the post objects contained in the database.
 */

router.get("");

/**
 * @Method      GET
 * @Route       /api/posts/:id
 * @Description Returns the post object with the specified id.
 */

router.get("");

/**
 * @Method      GET
 * @Route       /api/posts/:id/comments
 * @Description Returns an array of all the comment objects associated with the post with the specified id.
 */

router.get("");

/**
 * @Method      DELETE
 * @Route       /api/posts/:id
 * @Description Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.
 */

router.delete("");

/**
 * @Method      PUT
 * @Route       /api/posts/:id
 * @Description Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
 */

module.exports = router;
