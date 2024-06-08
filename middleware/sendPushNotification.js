import { sendNotification } from "../config/firebase/notification.js";
const sendPushNotification = async (req, res) => {
    try {
        const { title, body, image, token } = req.body;
        const data = { title, body, image, token };
        const result = await sendNotification(data);

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
        });
    }
};

export default sendPushNotification;