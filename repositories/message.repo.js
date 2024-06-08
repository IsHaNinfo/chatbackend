import { Message, User } from "../models/model.js"
import sequelize from "../config/db.connection.js"
import { Op } from "sequelize";
import { io } from "./../index.js"
const messageRepo = {
    createMessage: async (sender_user_id, groupId, text) => {

        try {
            await sequelize.sync();
            const result = await Message.create({
                sender_user_id, groupId, text
            });

            // Find the newly created message with sender and receiver details
            const data = await Message.findOne({
                where: { id: result.id },
                include: {
                    model: User,
                    as: 'sender',
                    attributes: ['id', 'firstName', "lastName"],
                },
            });

            // Emit 'message' event to all connected clients
            io.emit('message', data);

            return result;
        } catch (error) {
            throw error;
        }
    },
    getAllMessages: async (groupId) => {
        try {
            const result = await Message.findAll({
                include: {
                    model: User,
                    as: 'sender',
                    attributes: ['id', 'firstName', "lastName"],
                },
                where: { groupId: groupId },
            });
            return result;
        } catch (error) {
            throw error;
        }
    },
    getOneMessage: async (message_id) => {
        try {
            const result = await Message.findOne({
                where: { id: message_id },
                include: [{
                    model: User,
                    as: 'sender',
                    attributes: ['id', 'firstName', "lastName"],
                },
                {
                    model: User,
                    as: 'receiver',
                    attributes: ['id', 'firstName', "lastName"],
                },],
            });
            return result;
        } catch (error) {
            throw error;
        }
    },

    deleteMessage: async (message_id) => {
        try {
            const result = await Message.destroy({
                where: {
                    id: message_id,
                }
            });
            return result;
        } catch (error) {
            throw error;
        }
    },
    findMessagesFromUserIds: async (sender_user_id, receiver_user_id) => {
        try {
            const result = await Message.findAll({
                include: [{
                    model: User,
                    as: 'sender',
                    attributes: ['id', 'firstName', 'lastName'],
                },
                {
                    model: User,
                    as: 'receiver',
                    attributes: ['id', 'firstName', 'lastName'],
                }],
                where: {
                    [Op.or]: [
                        { sender_user_id: sender_user_id, receiver_user_id: receiver_user_id },
                        { sender_user_id: receiver_user_id, receiver_user_id: sender_user_id }
                    ]
                },
                order: [['createdAt', 'ASC']]
            });
            return result;
        } catch (error) {
            throw error;
        }
    },

}

export default messageRepo;