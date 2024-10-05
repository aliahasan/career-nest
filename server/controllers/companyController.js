import Company from "../models/company.model.js";
import { uploadImage } from "../utils/uploader.js";

export const createCompany = async (req, res) => {
  try {
    const { companyName, website, location, description } = req.body;

    const ownerId = req.user.userId;
    const company = await Company.findOne({ companyName });
    if (company) {
      return res.status(400).json({
        message: "Company already exists",
        success: false,
      });
    }

    let companyLogo;
    if (req.files && req.files.image && req.files.image[0]) {
      const logoImage = await uploadImage(req.files.image[0]);
      companyLogo = logoImage;
    }
    console.log(companyName, companyLogo, website, location, description);
    const newCompany = await Company.create({
      website,
      logo: companyLogo,
      location,
      description,
      companyName,
      ownerId,
    });

    return res.status(201).json({
      message: "Company created successfully",
      newCompany,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
// get all companies
export const getCompanies = async (req, res) => {
  try {
    const userId = req.user.id; //logged in user id
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "No companies found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Companies retrieved successfully",
      success: true,
      companies: companies,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// get all companies of  recruiter by his id
export const getCompanyById = async (req, res) => {
  try {
    const userId = req.params.id;
    const companies = await Company.findById(userId);
    if (!companies) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company retrieved successfully",
      success: true,
      companies: companies,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// update company by id
export const updateCompanyById = async (req, res) => {
  try {
    const { companyName, description, website, location } = req.body;
    const id = req.params.id;
    // cloudinary upload here------------------
    const updatedData = {
      companyName,
      description,
      website,
      location,
    };
    const company = await Company.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company information updated successfully",
      success: true,
      company: company,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
