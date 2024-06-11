import groupRepo from "../repositories/group.repo.js";
import userRepo from "../repositories/user.repo.js";

const groupSerivce ={
    createGroup: async (name) => {
        try {
            // Check if the group name already exists
            const existingGroup = await groupRepo.findGroupByName({name});
            if (existingGroup) {
                return { status: false, message: "Group name already registered!" };
            }
    
            // Create the group if the name is not registered
            const result = await groupRepo.createGroup({ name });
            if (result) {
                return { status: true, message: "Group created successfully", result };
            } else {
                return { status: false, message: "Group creation failed!" };
            }
        } catch (error) {
            throw error;
        }
    },
    addUserGroup: async (userId, groupId) => {
        try {
            // Check if the user exists
            const user = await userRepo.getUserById(userId);
            if (!user) {
                return { status: false, message: "user not found" };
            }
    
            // Check if the group exists
            const group = await groupRepo.getGroupById(groupId);
            if (!group) {
                return { status: false, message: "group not found" };
            }
    
            // Check if the user is already a member of the group
            const isMember = await groupRepo.isUserInGroup(userId, groupId);
            if (isMember) {
                return { status: false, message: "user already added to the group" };
            }
    
            // Add user to the group
            const result = await groupRepo.addUserToGroup({ userId, groupId });
            if (result) {
                return { status: true, message: "user added successfully", result };
            } else {
                return { status: false, message: "user add failed!" };
            }
        } catch (error) {
            throw error;
        }
    },
    findGroupByName: async ({name}) => {
        try {
          const group = await groupRepo.findGroupByName({name});
          return group;
        } catch (error) {
          throw error;
        }
      },
    getGroupMembers: async (groupId) => {
        try {
          const user = await groupRepo.getGroupMembers(groupId);
          return user;
        } catch (error) {
          throw error;
        }
      },
}

export default groupSerivce;
