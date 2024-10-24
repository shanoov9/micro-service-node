const User = require('../models/userModel');
const sequelize = require('../configs/database');

exports.createUser = async (event) => {
    await sequelize.sync();  // Sync database models

    const { name, email } = JSON.parse(event.body);

    try {
        const newUser = await User.create({ name, email });
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User created successfully', user: newUser }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to create user', details: error.message }),
        };
    }
};
