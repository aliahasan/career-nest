import Company from "../models/company.model.js";

export const createCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    const ownerId = req.user.userId;
    console.log(ownerId);
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }
    const company = await Company.findOne({ companyName });
    if (company) {
      return res.status(400).json({
        message: "Company already exists",
        success: false,
      });
    }
    const newCompany = await Company.create({
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

// get company by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company retrieved successfully",
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

// update company by id
export const updateCompanyById = async (req, res) => {
  try {
    const { companyName, description, website, location } = req.body;
    const id = req.params.id;
    const file = req.file;
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
