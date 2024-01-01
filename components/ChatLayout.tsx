
import ChatComponent from "./ChatComponent";

interface ChatLayoutProps {
  children?: React.ReactNode;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({}) => {
  return (
    <div className="w-[20%]   sm:flex hidden p-1  h-full ">
      <div className="from-blue-100 flex flex-col to rounded-lg bg-indigo-200 w-full  bg-gradient-to-b">
        <div className="py-10 px-5">
          <ChatComponent />
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
