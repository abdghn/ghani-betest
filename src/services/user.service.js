const User = require('../models/user.model');

class UserService {
    static async createUser(data) {
        const user = new User(data);
        await user.save();
        return user;
    }

    static async getUserById(id) {
        const user = await User.findById(id);
        if (!user) throw new Error('User not found');
        return user;
    }

    static async getUserByFilter(filter) {
        const user = await User.findOne(filter );
        if (!user) throw new Error('User not found');
        return user;
    }

    static async updateUser(id, data) {
        const user = await User.findByIdAndUpdate(id, data, { new: true });
        if (!user) throw new Error('User not found');
        return user;
    }

    static async deleteUser(id) {
        const user = await User.findByIdAndDelete(id);
        if (!user) throw new Error('User not found');

        return user;
    }
}

module.exports = UserService;
