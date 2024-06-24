import liveStreamSerivce from "../services/liveStram.service.js";


const liveStramController ={
    createLiveStream: async (req,res) =>{
        try {
            const { date,time  } = req.body;
      
            const result = await liveStreamSerivce.createLiveStream(date,time);
      
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
              message: 'Error occurred while creating liveStreamS'
            });
          }
    },
    getliveStream: async (req, res) => {
        const channelname = req.body
        try {
            const result = await liveStreamSerivce.getliveStream(channelname);
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
    getliveStreams: async (req, res) => {
      try {
          const result = await liveStreamSerivce.getliveStreams();
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
    deleteLiveStream: async (req, res) => {
      const channelname = req.body
      try {
          const result = await liveStreamSerivce.deleteLiveStream(channelname);
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


export default liveStramController