import React from 'react'
import ChatUser from './ChatUser'
import Messages from './Messages'
import Type from './Type'

function Right() {
  return (
    <div className="w-[70%] border border-black text-white bg-slate-950" >
      <ChatUser />
      <div style={{maxHeight:"calc(88vh - 8vh)"}} className="py-2 overflow-y-auto">
      <Messages />
      </div>
      <Type />
    </div>
  )
}

export default Right