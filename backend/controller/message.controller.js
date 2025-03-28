import Conversation from "../models/Conversationmodel.js";
import Message from "../models/Messagemodel.js"; // Adjust path if needed

export const sendMessage = async (req, res) => {
  try {
    // Ensure req.user is defined (auth middleware should have set it)
  

    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; // Current user (sender)

    // Check if a conversation already exists between sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // If no conversation exists, create a new conversation
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create a new message
    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      message: message,
      // conversationId: conversation._id // Associate the message with the conversation
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);
    res.status(201).json({ message: "message sent successfully",newMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    }

    const { id: chatUser } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, chatUser] },
    }).populate({
      path: "messages",
      options: { sort: { createdAt: 1 } }, // Sort by creation time
    });

    if (!conversation) {
      return res.status(200).json({ message: "No conversation found", messages: [] });
    }
   const messages=conversation.messages;
    res.status(200).json({
      message: "Messages retrieved successfully",
      messages: conversation.messages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};