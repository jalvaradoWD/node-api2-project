const express = require("express");
const router = express.Router();
const db = require("../data/db");

/**
 * @Method      POST
 * @Route       /api/posts
 * @Description Creates a post using the information sent inside the request body.
 */
router.post("", async (req, res) => {
  const { title, contents } = req.body;

  try {
    if (title && contents) {
      const createdPost = {
        title,
        contents,
      };
      // TODO: Make the code to create a post for this route.
      db.insert(createdPost);
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
router.post("/:id/comments", (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  try {
    console.log(id);
    if (id) {
      if (!comment) {
        return res.status(400).json({
          errorMessage: "Please provide text for the comment.",
        });
      }

      const createdComment = {
        post_id: id,
        text: comment,
      };

      db.insertComment(createdComment);
      return res.status(201).json(createdComment);
    } else {
      return res.status(404).json({
        message: "The post with the specified ID does not exist.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "There was an error while saving the comment to the database",
    });
  }
});

/**
 * @Method      GET
 * @Route       /api/posts
 * @Description Returns an array of all the post objects contained in the database.
 */

router.get("", async (req, res) => {
  try {
    return res.json(await db.find("posts"));
  } catch (error) {
    return res.status(500).json({
      errorMessage: "The posts information could not be retrieved.",
    });
  }
});

/**
 * @Method      GET
 * @Route       /api/posts/:id
 * @Description Returns the post object with the specified id.
 */

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const foundPost = await db.findById(id);
    if (!foundPost.length) {
      return res.status(404).json({
        message: "The post with the specified ID does not exist.",
      });
    }

    return res.status(200).json(foundPost);
  } catch (error) {
    return res.status(500).json({
      error: "The post information could not be retreived.",
    });
  }
});

/**
 * @Method      GET
 * @Route       /api/posts/:id/comments
 * @Description Returns an array of all the comment objects associated with the post with the specified id.
 */

router.get("/:id/comments", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
    const foundPostComments = await db.findPostComments(id);

    return res.status(200).json(foundPostComments);
  } catch (error) {
    return res.status(500).json({
      error: "The comments information could not be retrieved.",
    });
  }
});

/**
 * @Method      DELETE
 * @Route       /api/posts/:id
 * @Description Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.
 */

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const foundPost = await db.findById(id);

    if (!foundPost.length) {
      return res.status(404).json({
        message: "The post with the specified ID does not exist.",
      });
    }

    await db.remove(id);

    return res
      .status(200)
      .json({ message: `Post with the ID of ${id} has been deleted.` });
  } catch (error) {
    return res.status(500).json({
      error: "The post could not be removed",
    });
  }
});

/**
 * @Method      PUT
 * @Route       /api/posts/:id
 * @Description Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
 */

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;

  try {
    const foundPost = await db.findById(id);
    if (!foundPost.length) {
      return res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }

    if (title && contents) {
      const updatedPost = { title, contents };
      await db.update(id, updatedPost);
      return res.status(200).json(updatedPost);
    } else {
      return res.status(400).json({
        message: {
          errorMessage: "Please provide title and contents for the post.",
        },
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "The post information could not be modified." });
  }
});

module.exports = router;
