const Message = require("./../model/messageModel")

const addMessage = async(req,res,next) => {
    try{
        const {from,to,message} = req.body;
        const data = await Message.create({
            message: {text: message},
            users: [from, to],
            sender: from,
        });
        if(data) {
            return res.json({
                msg: "Message added successfully"
            })
        }
        return res.json({
            msg: "Failed to add message into the database"
        })
    } catch(err){
        next(err)
    }
}
const getAllMessages = async (req, res, next) => {
    try {
      console.log(req.body)
      const { from, to } = req.body;
  
      const messages = await Message.find({
        users: {
          $all: [from, to],
        },
      }).sort({ updatedAt: 1 });
  
      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
        };
      });
      console.log(projectedMessages)
      return res.json(projectedMessages);
    } catch (ex) {
      next(ex);
    }
  };

module.exports = {
    addMessage,
    getAllMessages
}