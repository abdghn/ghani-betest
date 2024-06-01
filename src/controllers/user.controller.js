const UserService = require('../services/user.service');
const CacheService = require('../services/cache.service');
const generateToken = require("../utils/jwt");

// Create User
exports.createUser = async (req, res) => {
    const { userName, accountNumber, emailAddress, identityNumber } = req.body;
    try {
        const user = await UserService.createUser({ userName, accountNumber, emailAddress, identityNumber });
        await CacheService.set(`user:${user.id}`, user);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Read User by ID
exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const cachedUser = await CacheService.get(`user:${id}`);
        if (cachedUser) {
            return res.status(200).json(cachedUser);
        }

        const user = await UserService.getUserById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Read User by Account Number
exports.getUserByAccountNumber = async (req, res) => {
    const { accountNumber } = req.params;
    try {
        const user = await UserService.getUserByFilter({accountNumber});
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Read User by Identity Number
exports.getUserByIdentityNumber = async (req, res) => {
    const { identityNumber } = req.params;
    try {
        const user = await UserService.getUserByFilter({identityNumber});
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Update User
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { userName, accountNumber, emailAddress, identityNumber } = req.body;
    try {
        const user = await UserService.updateUser(id, { userName, accountNumber, emailAddress, identityNumber });
        await CacheService.set(`user:${user.id}`, user);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await UserService.deleteUser(id);
        await CacheService.del(`user:${id}`);
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async(req, res) => {
    const { emailAddress } = req.body;
    try {
        const user = await UserService.getUserByFilter({emailAddress});
        const token = generateToken(user);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
