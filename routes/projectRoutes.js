import express from "express";
import {
    addPartToProject,
  decrementByOne,
  deleteProject,
  getMyAllProjects,
  getMyProjectInfo,
  incrementByOne,
  newProject,
  removePartFromProject,
  updatePartQuantityInProject,
} from "../controllers/projectControllers.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Create a new project
router.post("/new", isAuthenticated, newProject);

// Get all projects of the user
router.get("/all", isAuthenticated, getMyAllProjects);

// Get info about a specific project
router.get("/:projectId", isAuthenticated, getMyProjectInfo);

// Delete a project
router.delete("/:projectId", isAuthenticated, deleteProject);

// ✅ NEW: Update quantity of a specific part in a project
router.put("/:projectId/part/:partId/quantity", isAuthenticated, updatePartQuantityInProject);
router.post("/:projectId/part/:partId/new", isAuthenticated, addPartToProject);
router.put("/:projectId/part/:partId/plusone", isAuthenticated, incrementByOne);
router.put("/:projectId/part/:partId/minusone", isAuthenticated, decrementByOne);
router.delete("/:projectId/part/:partId", isAuthenticated, removePartFromProject)


export default router;
