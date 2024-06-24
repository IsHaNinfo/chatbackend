import { LiveStream} from "../models/model.js";


const liveStramRepo = { 
    createLiveStram: async (date, time ) => {
        try {
          const result = await LiveStream.create(
            date,
            time 
          );
          return result; 
        } catch (error) {
          throw error;
        }
      },

      getliveStream: async ({channelname}) => {
        try {
            const result = await LiveStream.findOne({
                where: { channelname: channelname },
            });
            return result;
        } catch (error) {
            throw error;
        }
    },
    getliveStreams: async () => {
      try {
          const result = await LiveStream.findAll({
          });
          return result;
      } catch (error) {
          throw error;
      }
  },
    deleteLiveStream: async ({channelname}) => {
      try {
          const result = await LiveStream.destroy({
              where: {
                channelname: channelname,
              }
          });
          return result;
      } catch (error) {
          throw error;
      }
  },
}

export default liveStramRepo;