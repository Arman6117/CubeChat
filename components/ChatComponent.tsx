

import { notFound, usePathname } from "next/navigation";



import ChatComponentClient from "./ChatComponentClient";

const ChatComponent = () => {

 
  return (
    <div className="flex flex-col p-2 space-y-8">
    <ChatComponentClient/>
    </div>
  );
};

export default ChatComponent;
