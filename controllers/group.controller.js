import groupSerivce from "../services/group.service.js";

const groupController ={
    createGroup: async (req,res) =>{
        try {
            const { name  } = req.body;
      
            const result = await groupSerivce.createGroup(name);
      
            if (result.status) {
              res.status(200).json({
                result: result,
              });
            } else {
              res.status(400).json({
                response_code: 400,
                success: false,
                message: result.message
              });
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({
              response_code: 500,
              error: error.message,
              success: false,
              message: 'Error occurred while creating project'
            });
          }
    },

    addUserGroup: async (req,res) =>{
        try {
            const groupId = req.params.id
            const { userId  } = req.body;
          
      
            const result = await groupSerivce.addUserGroup(userId,groupId);
      
            if (result.status) {
              res.status(200).json({
                response_code: 200,
                success: true,
                message: result.message,
              });
            } else {
              res.status(400).json({
                response_code: 400,
                success: false,
                message: result.message
              });
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({
              response_code: 500,
              error: error.message,
              success: false,
              message: 'Error occurred while creating project'
            });
          }
    },

    getGroupMembers: async (req, res) => {
      const groupId = req.params.id
      try {
        const result = await groupSerivce.getGroupMembers(groupId);
        if (result.status) {
          // Status is true, so registration is successful
          res.status(200).json({
            response_code: 200,
            success: true,
            message: result.message,
            result
          });
        } else {
          console.log(result);
          // Status is false, there is an error
          res.status(400).json({
            response_code: 400,
            success: false,
            message: result.message
          });
        }
  
  
      } catch (error) {
        console.error(error);
        res.status(500).json({
          error: error,
          response_code: 500,
          error: 'Error occurred'
        });
      }
    },
}

export default groupController;