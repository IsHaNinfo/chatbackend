import messageRepo from "../repositories/message.repo.js";

const messageService = {
    createMessage: async (sender_user_id, groupId, text) => {
        try {
            const result = await messageRepo.createMessage(sender_user_id, groupId, text);
            if (result) {
                return { status: true, message: "Message created successfully", result }
            }
            else {
                return { status: false, message: "Message create failed!" }
            }
        } catch (error) {
            throw error;
        }
    },
    getAllMessages: async (groupId) => {
        try {
            const result = await messageRepo.getAllMessages(groupId);
            return {
                status: true,
                message: "Message get Successfully",
                result
            }

        } catch (error) {
            throw error;
        }
    },

    getOneMessage: async (message_id) => {
        try {
            const result = await messageRepo.getOneMessage(message_id);
            if (!result) {
                return { status: false, message: "No any message found!" }
            } else {
                return {
                    status: true,
                    message: "Message get Successfully",
                    result
                }
            }
        } catch (error) {
            throw error;
        }
    },
    deleteMessage: async (message_id) => {
        try {
            const result = await messageRepo.deleteMessage(message_id);
            if (!result) {
                return { status: false, message: "message not found!" }
            } else {
                return {
                    status: true,
                    message: "Message delete Successfully",
                    result
                }
            }
        } catch (error) {
            throw error;
        }
    },
    findMessagesFromUserIds: async (sender_user_id, receiver_user_id) => {
        try {
            const result = await messageRepo.findMessagesFromUserIds(sender_user_id, receiver_user_id);
            if (!result) {
                return { status: false, message: "No any message found!" }
            } else {
                return {
                    status: true,
                    message: "Message get Successfully",
                    result
                }
            }
        } catch (error) {
            throw error;
        }
    },


}

export default messageService;