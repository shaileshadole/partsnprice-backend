import express from "express";

import { isAuthenticated } from "../middlewares/auth.js";
import { deletePart, getAllParts, newPart, updatePart } from "../controllers/partControllers.js";

const router = express.Router();

router.post("/new", isAuthenticated, newPart);
router.get("/all", isAuthenticated, getAllParts);
router.delete("/:partId", isAuthenticated, deletePart);
router.put("/:partId", isAuthenticated, updatePart);


export default router;

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// POST /api/v1/project/:projectId/parts
// router.post("/", isAuthenticated, newPart);

// // GET /api/v1/project/:projectId/parts
// router.get("/", isAuthenticated, getMyParts);

// // PUT /api/v1/project/:projectId/parts/:partId
// router.put("/:partId", isAuthenticated, updatePart);

// // DELETE /api/v1/project/:projectId/parts/:partId
// router.delete("/:partId", isAuthenticated, deletePart);


// export default router;

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// import express from "express";
// import {
//   newPart,
//   getMyParts,
//   deletePart,
//   updatePart
// } from "../controllers/partController.js";
// import { isAuthenticated } from "../middlewares/auth.js";

// const router = express.Router();

// // Create a new part - POST /api/parts
// router.post("/", isAuthenticated, newPart);

// // Get all parts for a specific project - GET /api/parts/:projectId
// router.get("/:projectId", isAuthenticated, getMyParts);

// // Update a part - PUT /api/parts/:id
// router.put("/:id", isAuthenticated, updatePart);

// // Delete a part - DELETE /api/parts/:id
// router.delete("/:id", isAuthenticated, deletePart);

// export default router;