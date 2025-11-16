import ErrorHandler from "../middlewares/error.js";
import { Parts } from "../models/partsModel.js";
import { Project } from "../models/projectModel.js";

export const newPart = async (req, res, next) => {
  try {
    const { title, link, rate } = req.body;

    // const { projectId } = req.params;

    // // Verify the project exists and belongs to the user
    // const project = await Project.findOne({
    //   _id: projectId,
    //   user: req.user._id,
    // });

    // if (!project) {
    //   return next(new ErrorHandler("Project not found or unauthorized", 404));
    // }

    const part = await Parts.create({
      title,
      link,
      rate,
    });

    res.status(201).json({
      success: true,
      message: "Part Added Successfully",
      part,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllParts = async (req, res, next) => {
  try {
    const parts = await Parts.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      parts,
    });
  } catch (error) {
    next(error);
  }
};

// export const getMyParts = async (req, res, next) => {
//   try {
//     const { projectId } = req.params;

//     // Verify the project belongs to the logged-in user
//     const project = await Project.findOne({
//       _id: projectId,
//       user: req.user._id,
//     });

//     if (!project) {
//       return next(new ErrorHandler("Project not found or unauthorized", 404));
//     }

//     // Step 2: Fetch parts for that project
//     const parts = await Parts.find({ project: projectId });

//     res.status(200).json({
//       success: true,
//       parts,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const deletePart = async (req, res, next) => {
  try {
    const { partId } = req.params;

    // Step 1: Find the part and check if it belongs to the specified project
    const part = await Parts.findOne({
      _id: partId,
    });

    if (!part) return next(new ErrorHandler("Part not Found", 404));

    // // Step 1: Find the part and check if it belongs to the specified project
    // const part = await Parts.findOne({
    //   _id: partId,
    //   project: projectId,
    // });

    // if (!part) return next(new ErrorHandler("Part not Found", 404));

    // // Verify the part belongs to a project owned by the user
    // const project = await Project.findOne({
    //   _id: part.project,
    //   user: req.user._id,
    // });

    // if (!project) {
    //   return next(new ErrorHandler("Unauthorized to delete this part", 403));
    // }

    await part.deleteOne();

    res.status(200).json({
      success: true,
      message: "Part Deleted Successfully!",
    });
  } catch (error) {
    next(error);
  }
};




export const updatePart = async (req, res, next) => {
  try {
    const { title, link, rate } = req.body;
    const { partId } = req.params;
    const part = await Parts.findOne({
      _id: partId,
    });

    if (!part) {
      return next(new ErrorHandler("Part not found", 404));
    }

    // // Verify the part belongs to a project owned by the user
    // const project = await Project.findOne({
    //   _id: part.project,
    //   user: req.user._id,
    // });

    // if (!project) {
    //   return next(new ErrorHandler("Unauthorized to update this part", 403));
    // }

    // Update the part
    part.title = title || part.title;
    part.link = link || part.link;
    part.rate = rate || part.rate;

    await part.save();

    res.status(200).json({
      success: true,
      message: "Part Updated Successfully",
      part,
    });
  } catch (error) {
    next(error);
  }
};

