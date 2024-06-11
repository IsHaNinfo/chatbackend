import { Group, UserGroup, User } from "../models/model.js";


const groupRepo = {

    createGroup: async (name) => {
        try {
          const result = await Group.create(
           name 
          );
          return result; 
        } catch (error) {
          throw error;
        }
      },
      addUserToGroup: async (userId,groupId) => {
        try {
          const result = await UserGroup.create(
            userId,groupId 
          );
          return result; 
        } catch (error) {
          throw error;
        }
      },
      findGroupByName: async ({name}) => {
        try {
          const result = await Group.findOne({
            where: {
              name: name,
            },
          });
          return result;
        } catch (error) {
          throw error;
        }
      },
      getGroupById: async (groupId) => {
        try {
          const result = await Group.findOne({
            where: {
              id: groupId,
            },
          });
          return result;
        } catch (error) {
          throw error;
        }
      },

      isUserInGroup : async (userId, groupId) => {
        try {
          const result = await UserGroup.findOne({
            where: {
              userId: userId,
              groupId:groupId
            },
          });
          return result;
        } catch (error) {
          throw error;
        }
      },
      getGroupMembers : async (groupId) => {
        try {
            const group = await Group.findByPk(groupId, {
                include: [
                    {
                        model: User,
                        through: {
                            attributes: []
                        },
                    },
                ],
            });
    
            if (!group) {
                return { status: false, message: "Group not found" };
            }
    
            const members = group.Users; // This will contain all users belonging to the group
            return { status: true, members };
        } catch (error) {
            console.error(error);
            return { status: false, message: "Error retrieving group members" };
        }
    }
}

export default groupRepo;