const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const id = uuid();
  const likes = 0;
  const repo = { id, title, url, techs, likes };
  repositories.push(repo);
  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex( repo => repo.id === id);
  const { title, url, techs } = request.body;
  const likes = 0;

  if (repoIndex < 0) {
    return response.status(400).json({ error: "repo not found"})
  }

  const repo = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[repoIndex] = repo;
  return response.json(repo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex( repo => repo.id === id);
  if (repoIndex < 0) {
    return response.status(400).json({ error: "repo not found"})
  }
  repositories.splice(repoIndex,1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex( repo => repo.id === id);
  if (repoIndex < 0) {
    return response.status(400).json({ error: "repo not found"})
  }
  let likes = repositories[repoIndex].likes;
  likes++;
  repositories[repoIndex].likes = likes;

  return response.json({id, likes });
});

module.exports = app;
