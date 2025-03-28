import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true,
        maxlength: 1000,
        trim: true,
        validate: [
            {
                validator: (value) => value.length > 0,
                message: 'Message cannot be empty',
            },
            {
                validator: (value) => /^[a-zA-Z0-9 ,.!?]+$/.test(value),
                message: 'Message can only contain alphanumeric characters, spaces, and basic punctuation (,.!?)',
            }
        ]
    }
}, {
    timestamps: true
});

const Message = mongoose.model('Message', messageSchema)
export default Message;