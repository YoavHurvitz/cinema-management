const Member = require('../models/memberModel');

const getMembers = async (req, res) => {
  try {
    const members = await Member.find({});
    res.json(members);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getMemberById = async (req, res) => {
  try {
    const memberId = req.params.id;
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).send('Member not found');
    }
    res.json(member);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateMember = async (req, res) => {
  try {
    const memberId = req.params.id;
    const memberObj = req.body;
    await Member.findByIdAndUpdate(memberId, memberObj);
    res.send('Updated!');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteMember = async (req, res) => {
  try {
    const memberId = req.params.id;
    await Member.findByIdAndDelete(memberId);
    res.send('Deleted!');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addMember = async (req, res) => {
  try {
    const memberObj = req.body;
    const member = new Member(memberObj);
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
  addMember
};
