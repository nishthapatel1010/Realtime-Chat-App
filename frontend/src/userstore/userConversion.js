import { create } from 'zustand'
import Message from '../../../backend/models/messagemodel'

const userConversionStore = create((set) => ({
  selectedConversion: null,
  setSelectedConversion: (selectedConversion) => set({selectedConversion}),
  messages:[],
  setMessages:(messages)=>set({messages}),
}))

export default userConversionStore;
