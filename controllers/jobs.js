const getAllJobs = async (req, res) => {
  res.send("All Jobs");
};
const getJob = async (req, res) => {
  res.send("get single job");
};
const createJob = async (req, res) => {
  res.send("Create Job");
};
const updateJob = async (req, res) => {
  res.send("Update Jobs");
};
const deleteJob = async (req, res) => {
  res.send("Delete Jobs");
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
