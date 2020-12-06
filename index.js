const express = require("express");
const server = express();

const postRoutes = require("./apiRoutes/posts");

// Middleware
server.use(express.json());

// Endpoints
server.use("/api/posts", postRoutes);

server.listen(8080, () => console.log(`Server is on http://localhost:8080/`));
