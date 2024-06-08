import messageService from "../services/message.services.js";

const messageController = {
    createMessage: async (req, res) => {
        try {
            const user = req.userId.id;
            const { groupId, text} = req.body;
            const result = await messageService.createMessage(user, groupId, text);
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                })
            } else {
                res.status(400).json({
                    response_code: 400,
                    result
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            })
        }
    },
    getAllMessages: async (req, res) => {
        const groupId = req.params.id;

        try {
            const result = await messageService.getAllMessages(groupId);
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                })
            } else {
                res.status(404).json({
                    response_code: 404,
                    result
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            })
        }
    },
    getOneMessage: async (req, res) => {
        const message_id = req.params.message_id;
        try {
            const result = await messageService.getOneMessage(message_id);
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                })
            } else {
                res.status(404).json({
                    response_code: 404,
                    result
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            })
        }
    },

    deleteMessage: async (req, res) => {
        const message_id = req.params.message_id;
        try {
            const result = await messageService.deleteMessage(message_id);
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                })
            } else {
                res.status(404).json({
                    response_code: 404,
                    result
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            })
        }
    },
    findMessagesFromUserIds: async (req, res) => {
        const sender_user_id = req.userId.id;
        const receiver_user_id = req.params.receiver_user_id;
        try {
            const result = await messageService.findMessagesFromUserIds(sender_user_id, receiver_user_id);
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    result
                })
            } else {
                res.status(404).json({
                    response_code: 404,
                    result
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            })
        }
    },

}

export default messageController;