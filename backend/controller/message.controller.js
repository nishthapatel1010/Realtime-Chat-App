import Conversation from "../models/Conversationmodel.js";
import Message from "../models/Messagemodel.js"; // Adjust path if needed

// send the message
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params; // e.g., "67df9f1a66a49d2c273ee92c"
    const senderId = req.user._id; // e.g., "67e1976f6f673b2ce82a4d3b"

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      message: message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);
    res.status(201).json( newMessage );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get the message
export const getMessage = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    }

    const { id: chatUser } = req.params; // e.g., "67df9f1a66a49d2c273ee92c"
    const senderId = req.user._id; // e.g., "67e1976f6f673b2ce82a4d3b"

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, chatUser] },
    }).populate({
      path: "messages",
      options: { sort: { createdAt: 1 } },
    });

    if (!conversation) {
      return res.status(200).json({ message: "No conversation found", messages: [] });
    }
    res.status(200).json({
      message: "Messages retrieved successfully",
      messages: conversation.messages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};