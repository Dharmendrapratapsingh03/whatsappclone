
import Conversation from '../model/Conversation.js';


export const newConversation = async (request, response) =>{
    try{
        const senderId = request.body.senderId;
        const recieverId = request.body.recieverId;
    
        const exist = await Conversation.findOne({ members: { $all: [receiverId, senderId]  }});
        if(exist) {
            return response.status(200).json('conversation already exists');
        }

        const newConversation = new Conversation({
            members: [senderId, receiverId]
        })

        await newConversation.save();
        return response.status(200).json('conversation saved successfully');
    }catch (error) {
        return response.status(500).json(error.message);

    }
}

export const getConversation = async(request, response) => {
    try{
        const senderId = request.body.senderId;
        const receiverId = request.body.receiverId;
        
        let conversartion = await Conversation.findOne({ members: { $all: [receiverId, senderId] }});
        return response.status(200).json(conversartion);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}