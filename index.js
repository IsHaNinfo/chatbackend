import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./config/db.connection.js";
import userRoutes from "./routes/user.router.js";
import messageRoutes from "./routes/message.route.js";
import liveStramroutes from  "./routes/livestream.route.js"
import userRepo from "./repositories/user.repo.js"
import http from "http";
import { Server } from "socket.io";
import messageRepo from "./repositories/message.repo.js";
import { Message,Group } from "./models/model.js";
import groupRoutes from "./routes/group.route.js";

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,constent-type",
        "Content-Type: multipart/form-data"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

//connect database
sequelize
    .authenticate()
    .then(() => {
        console.log("connection has been established successfully");
    })
    .catch((error) => {
        console.error("unable connect to the database: ", error);
    });

//Table creation
sequelize
    .sync({ force: false })
    .then(() => {
        console.log("tables created");
    })
    .catch((error) => {
        console.error("unable to create tables: ", error);
    });

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});


io.on("connection", async (socket) => {
    console.log(`User Connected: ${socket.id} >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`);

    try {
        console.log("Fetching old messages...");
        const allMessages = await messageRepo.getAllMessages();
        console.log("Old messages retrieved:", allMessages);

        if (Array.isArray(allMessages) && allMessages.length > 0) {
            console.log("Emitting old messages...");
            socket.emit("initial_messages", allMessages);
            console.log("Old messages emitted");
        } else {
            console.log("No old messages found or empty array.");
        }
    } catch (error) {
        console.error("Error emitting old messages:", error);
    }

    socket.on("initial_data", (userId) => {
        console.log(userId, "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
        const updateUser = async () => {
            await userRepo.updateUserSocketId(userId, socket.id);
        }
        updateUser();

    });

    socket.on("join_group", async (groupId) => {
        const group = await Group.findByPk(groupId);
        if (group) {
            socket.join(groupId);
            const messages = await Message.findAll({ where: { groupId } });
            socket.emit("initial_group_messages", messages);
        }
    });

    // Handle sending a message to a group
    socket.on("send_group_message", async ({ groupId, userId, text }) => {
        const message = await Message.create({ groupId, sender_user_id: userId, text });
        io.to(groupId).emit("new_group_message", message);
    });



    socket.on("disconnect", () => {
        console.log(`User Disconnected: ${socket.id}  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`);
        const removeSocketIdFromUser = async () => {
            await userRepo.removeSocketIdBySocketId(socket.id)
        }
        removeSocketIdFromUser();
    });
});

export { io };



// Main Routes
app.use("/user", userRoutes);
app.use("/message", messageRoutes);
app.use("/group", groupRoutes);
app.use("/livestream", liveStramroutes);

//run server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
