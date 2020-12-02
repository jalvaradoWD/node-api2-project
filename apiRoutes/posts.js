const express = require("express");
const router = express.Router();

/**
 * @Method      POST
 * @Route       /api/posts
 * @Description Creates a post using the information sent inside the request body.
 */
router.post("", (req, res) => {
  const { title, contents } = req.body;
  try {
    if (!title || !contents) {
      const createdPost = {
        title,
        contents,
      };
      return res.status(201).json(createdPost);
    } else {
      return res.status(400).json({
        errorMessage: "Please provide title and contents for the post.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "There was an error while saving the post to the database",
    });
  }
});

/**
 * @Method      POST
 * @Route       /api/posts/:id/comments
 * @Description Creates a comment for the post with the specified id using information sent inside of the request body.
 */
router.post("/:id/comments", (req, res) => {});

/**
 * @Method      GET
 * @Route       /api/posts
 * @Description Returns an array of all the post objects contained in the database.
 */

router.get("", (req, res) => {});

/**
 * @Method      GET
 * @Route       /api/posts/:id
 * @Description Returns the post object with the specified id.
 */

router.get("/:id", (req, res) => {});

/**
 * @Method      GET
 * @Route       /api/posts/:id/comments
 * @Description Returns an array of all the comment objects associated with the post with the specified id.
 */

router.get("/:id/comments", (req, res) => {});

/**
 * @Method      DELETE
 * @Route       /api/posts/:id
 * @Description Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.
 */

router.delete("/:id", (req, res) => {});

/**
 * @Method      PUT
 * @Route       /api/posts/:id
 * @Description Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
 */

router.put("/:id", (req, res) => {});

module.exports = router;
