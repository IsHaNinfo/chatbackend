import liveStramRepo from "../repositories/liveStream.repo.js";


const liveStreamSerivce ={

    createLiveStream: async (date,time ) => {
        try {
            // Check if the group name already exists
           
            // Create the group if the name is not registered
            const result = await liveStramRepo.createLiveStram({ date,time  });
            if (result) {
                return { status: true, message: "Live Stream created successfully", result };
            } else {
                return { status: false, message: "Live Stream creation failed!" };
            }
        } catch (error) {
            throw error;
        }
    },


    getliveStream: async (channelname) => {
        try {
            const result = await liveStramRepo.getliveStream(channelname);
            if (!result) {
                return { status: false, message: "No any Live Stream found!" }
            } else {
                return {
                    status: true,
                    message: "Live Stream get Successfully",
                    result
                }
            }
        } catch (error) {
            throw error;
        }
    },

    getliveStreams: async () => {
        try {
            const result = await liveStramRepo.getliveStreams();
            if (!result) {
                return { status: false, message: "No any Live Stream found!" }
            } else {
                return {
                    status: true,
                    message: "Live Streams get Successfully",
                    result
                }
            }
        } catch (error) {
            throw error;
        }
    },

    deleteLiveStream: async (channelname) => {
        try {
            const result = await liveStramRepo.deleteLiveStream(channelname);
            if (!result) {
                return { status: false, message: "Live Stream not found!" }
            } else {
                return {
                    status: true,
                    message: "Live Stream delete Successfully",
                    result
                }
            }
        } catch (error) {
            throw error;
        }
    },
}

export default liveStreamSerivce;