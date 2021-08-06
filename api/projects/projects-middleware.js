const express = require("express");
const Projects = require("./projects-model.js");

function projectsLogger(req, res, next) {
  const method = req.method;
  const timestamp = new Date().toLocaleString();
  const url = req.originalUrl;
  console.log(`[${timestamp}] ${method} to ${url}`);
  next();
}

async function validateProjectjId(req, res, next) {
  try {
    const { id } = req.params; // deconstructing requested id
    const project = await Projects.get(id);
    if (!project) {
      res.status(404).json({ message: `user with id  ${id} not found` });
    } else {
      req.project = project;
      next();
    }
  } catch (err) {
    next(err);
  }
}

// function validateProject(req,res, next){
//   const {project} = req.body;
//   if(!project){
//     res.status(400).json({ message: "required field missing "})
//   }
//   else{
//     req.project = project
//     next()
//   }
// }

function validateProject(req, res, next) {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400).json({
      message: "required field missing ",
    });
  } else {
    next();
  }
}

module.exports = {
  validateProjectjId,
  projectsLogger,
  validateProject,
};
