import sequelize from "../config/db.connection.js";
import { DataTypes } from "sequelize";

// User model definition
export const User = sequelize.define(
    "User",
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        socketId: {
            type: DataTypes.STRING,
        }
    },
    {
        tableName: "users",
    }
);

// Group model definition
export const Group = sequelize.define(
    "Group",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "groups",
    }
);

// Message model definition
export const Message = sequelize.define(
    "Message",
    {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sender_user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "Users",
                key: "id",
            },
        },
        groupId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Groups",
                key: "id",
            },
        },
    },
    {
        tableName: "messages",
    }
);

// UserGroup join table definition
export const UserGroup = sequelize.define(
    "UserGroup",
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "Users",
                key: "id",
            },
        },
        groupId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "Groups",
                key: "id",
            },
        },
    },
    {
        tableName: "usergroups",
    }
);


export const LiveStream = sequelize.define(
    "LiveStream",
    {
        channelname: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => generateUniqueChannelName(),
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
    },
    {
        tableName: "livestreams",
    }
);

function generateUniqueChannelName() {
    // Generate a random string of alphabetic characters
    const length = 9;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Associations
User.hasMany(Message, {
    as: 'messages',
    foreignKey: "sender_user_id",
    onDelete: 'CASCADE',
});
Message.belongsTo(User, {
    as: 'sender',
    foreignKey: "sender_user_id",
});

Group.hasMany(Message, {
    as: 'messages',
    foreignKey: "groupId",
    onDelete: 'CASCADE',
});
Message.belongsTo(Group, {
    as: 'group',
    foreignKey: "groupId",
});

Group.belongsToMany(User, { through: UserGroup, foreignKey: 'groupId', otherKey: 'userId' });
User.belongsToMany(Group, { through: UserGroup, foreignKey: 'userId', otherKey: 'groupId' });
