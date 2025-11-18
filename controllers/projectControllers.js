import ErrorHandler from "../middlewares/error.js";
import { Project } from "../models/projectModel.js";
import { Parts } from "../models/partsModel.js";

export const newProject = async (req, res, next) => {
  try {
    const { name, description, submitDate } = req.body;

    // Get user ID from authenticated user (added by auth middleware)
    const userId = req.user._id;

    const project = await Project.create({
      name,
      description,
      submitDate,
      user: userId, // Associate project with the logged-in user
    });

    if (!project) return next(new ErrorHandler("Project Not Found", 404));

    res.status(201).json({
      success: true,
      message: "Project Added Successfully",
      project,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyProjectInfo = async (req, res, next) => {
  try {
    const userid = req.user._id;
    const projectId = req.params.projectId;

    //Research about it
    const project = await Project.findOne({ _id: projectId, user: userid }).populate("parts.part");

    if (!project) return next(new ErrorHandler("Project Not Found", 404));

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyAllProjects = async (req, res, next) => {
  try {
    const userid = req.user._id;
    const projects = await Project.find({ user: userid }).sort({ createdAt: -1 });

    if (!projects) return next(new ErrorHandler("Project Not Found", 404));

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      user: req.user._id,
    });

    if (!project) return next(new ErrorHandler("Project Not Found", 404));

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: "Project Deleted!",
    });
  } catch (error) {
    next(error);
  }
};

//Parts
export const updatePartQuantityInProject = async (req, res, next) => {
  try {
    const { projectId, partId } = req.params;
    const { quantity } = req.body;

    const project = await Project.findOne({
      _id: projectId,
      user: req.user._id,
    });

    if (!project) return next(new ErrorHandler("Project not found", 404));

    // Find the part in the project's parts array
    const partEntry = project.parts.find((p) => p.part.toString() === partId);

    if (!partEntry)
      return next(new ErrorHandler("Part not found in this project", 404));

    partEntry.quantity = quantity;

    await project.save();

    res.status(200).json({
      success: true,
      message: "Quantity updated successfully",
      part: partEntry,
    });
  } catch (error) {
    next(error);
  }
};

//Increment By One
export const incrementByOne = async (req, res, next) => {
  try {
    const { projectId, partId } = req.params;

    const project = await Project.findOne({
      _id: projectId,
      user: req.user._id,
    });

    if (!project) return next(new ErrorHandler("Project not found", 404));

    // Find the part in the project's parts array
    const partEntry = project.parts.find((p) => p.part.toString() === partId);

    if (!partEntry)
      return next(new ErrorHandler("Part not found in this project", 404));

    partEntry.quantity++;

    await project.save();

    res.status(200).json({
      success: true,
      message: "Quantity Increased By 1",
      part: partEntry,
    });
  } catch (error) {
    next(error);
  }
};

//Decrement By One
export const decrementByOne = async (req, res, next) => {
  try {
    const { projectId, partId } = req.params;

    const project = await Project.findOne({
      _id: projectId,
      user: req.user._id,
    });

    if (!project) return next(new ErrorHandler("Project not found", 404));

    // Find the part in the project's parts array
    const partEntry = project.parts.find((p) => p.part.toString() === partId);

    if (!partEntry)
      return next(new ErrorHandler("Part not found in this project", 404));

    if (partEntry.quantity === 1) {
      project.parts = project.parts.filter(
        (p) => p.part.toString() !== partId
      );
    } else {
      partEntry.quantity--;
    }

    await project.save();

    res.status(200).json({
      success: true,
      message: "Quantity Decreased By 1",
      part: partEntry,
    });
  } catch (error) {
    next(error);
  }
};

export const addPartToProject = async (req, res, next) => {
  try {
    const { projectId, partId } = req.params;
    // const { quantity } = req.body;

    // if (!quantity || quantity <= 0) {
    //   return next(new ErrorHandler("Quantity must be greater than 0", 400));
    // }

    const project = await Project.findOne({ _id: projectId, user: req.user._id });
    if (!project) return next(new ErrorHandler("Project not found or unauthorized", 404));

    const part = await Parts.findById(partId);
    if (!part) return next(new ErrorHandler("Part not found", 404));

    // Check if part already exists in the project
    const existing = project.parts.find(p => p.part.toString() === partId);
    if (existing) {
      existing.quantity += 1;
    } else {
      project.parts.push({ part: partId, quantity: 1 });
    }

    await project.save();

    res.status(200).json({
      success: true,
      message: "Part added to project",
      project,
    });
  } catch (error) {
    next(error);
  }
};


//Remove A Part from the project
export const removePartFromProject = async (req, res, next) => {
  try{
    const {projectId, partId} = req.params;

    //Find the project
    const project = await Project.findOne({
      _id: projectId,
      user: req.user._id
    });
    if(!project) return next (new ErrorHandler("Project not found", 404));

    //Check if the part exist in the project
    const part = project.parts.find(
      (p) => p.part.toString() === partId
    );

    if(!part) return next(new ErrorHandler("Part not Found in this project", 404));

    //Remove it
    project.parts = project.parts.filter(
      (p) => p.part.toString() !== partId
    );

    await project.save();

    res.status(200).json({
      success: true,
      message: "Part deleted from project!"
    });
  }catch(error){
    next(error);
  }
}

///Extra code by ChatGPT
// export const addPartToProject = async (req, res, next) => {
//   try {
//     const { projectId, partId } = req.params;
//     const { quantity } = req.body;

//     if (!quantity || quantity <= 0) {
//       return next(new ErrorHandler("Quantity must be greater than 0", 400));
//     }

//     const project = await Project.findOne({ _id: projectId, user: req.user._id });
//     if (!project) return next(new ErrorHandler("Project not found or unauthorized", 404));

//     const part = await Parts.findById(partId);
//     if (!part) return next(new ErrorHandler("Part not found", 404));

//     // Check if part already exists in the project
//     const existing = project.usedParts.find(p => p.part.toString() === partId);
//     if (existing) {
//       existing.quantity += quantity;
//     } else {
//       project.usedParts.push({ part: partId, quantity });
//     }

//     await project.save();

//     res.status(200).json({
//       success: true,
//       message: "Part added to project",
//       project,
//     });
//   } catch (error) {
//     next(error);
//   }
// };


// export const updatePartQuantityInProject = async (req, res, next) => {
//   try {
//     const { projectId, partId } = req.params;
//     const { quantity } = req.body;

//     const project = await Project.findOne({ _id: projectId, user: req.user._id });
//     if (!project) return next(new ErrorHandler("Project not found or unauthorized", 404));

//     const partEntry = project.usedParts.find(p => p.part.toString() === partId);
//     if (!partEntry) return next(new ErrorHandler("Part not found in project", 404));

//     partEntry.quantity = quantity;
//     await project.save();

//     res.status(200).json({
//       success: true,
//       message: "Part quantity updated",
//       project,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getProjectPartsWithBudget = async (req, res, next) => {
//   try {
//     const { projectId } = req.params;

//     const project = await Project.findOne({ _id: projectId, user: req.user._id }).populate("usedParts.part");
//     if (!project) return next(new ErrorHandler("Project not found", 404));

//     let totalBudget = 0;
//     const detailedParts = project.usedParts.map(p => {
//       const part = p.part;
//       const quantity = p.quantity;
//       const subtotal = quantity * part.price;
//       totalBudget += subtotal;
//       return {
//         _id: part._id,
//         title: part.title,
//         price: part.price,
//         quantity,
//         subtotal,
//       };
//     });

//     res.status(200).json({
//       success: true,
//       projectName: project.name,
//       parts: detailedParts,
//       totalBudget,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

