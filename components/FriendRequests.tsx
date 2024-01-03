import React, { FC } from 'react'

interface FriendRequestsProps {
   incomingFriendRequests:IncomingFriendRequest[],
   sessionId:string
}

const FriendRequests:FC<FriendRequestsProps> = ({
    incomingFriendRequests,
    sessionId
}) => {
  return (
    <div>FriendRequests</div>
  )
}

export default FriendRequests