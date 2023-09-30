import Conversations from "../../components/Messenger/cofounder/CofounderCoversations";
import Message from "../../components/Messenger/cofounder/CofounderMessenger";
import { Tooltip } from "@material-tailwind/react";
import { IoPaperPlaneSharp } from "react-icons/io5";
import { fetchCofounder } from "../../features/redux/slices/cofounder/cofounderDetailsSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/redux/reducers/Reducer";
import { getCofounderConversations } from "../../features/axios/api/messenger/conversation";
import { io, Socket } from "socket.io-client";
import configKeys from "../../utils/config";
import {
  getCofounderMessages,
  postCofounderMessages,
} from "../../features/axios/api/messenger/messages";

function Messenger() {
  const dispatch = useDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);
  const socket = useRef<Socket | null>(null);
  const cofounder = useSelector(
    (state: RootState) => state?.cofounderDetails?.cofounderDetails
  );
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState<any>(null);
  const [messages, setMessages] = useState<any>(null);
  const [newMessage, setNewMessage] = useState<any>("");
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState<any>([]);

  useEffect(() => {
    socket.current = io(configKeys.SOCKET_PORT);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data?.senderId,
        text: data?.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members?.includes(arrivalMessage.sender) &&
      setMessages((prev: any) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket?.current?.emit("addUser", cofounder?.cofounderData?._id);
    socket?.current?.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [cofounder?.cofounderData?._id]);

  useEffect(() => {
    dispatch(fetchCofounder());
  }, [dispatch]);

  useEffect(() => {
    const getConversations = async () => {
      if (cofounder) {
        const res = await getCofounderConversations(
          cofounder?.cofounderData?._id
        );
        setConversations(res);
      }
    };
    getConversations();
  }, [cofounder]);

  useEffect(() => {
    const getMessages = async () => {
      if (currentChat) {
        try {
          const res = await getCofounderMessages(currentChat?._id);
          setMessages(res);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const message = {
      conversationId: currentChat?._id,
      sender: cofounder?.cofounderData?._id,
      text: newMessage,
    };

    const receiverId = currentChat?.members?.find(
      (member: any) => member !== cofounder?.cofounderData?._id
    );

    socket?.current?.emit("sendMessage", {
      senderId: cofounder?.cofounderData?._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await postCofounderMessages(message);
      setMessages([...messages, res]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className=" h-screen pb-[70px] flex mx-auto max-w-screen-xl p-2 mt-4 rounded">
        <div className="flex-auto p-3">
          <div>
            <input
              className="w-5/6 p-3 border-b border-solid border-gray-500 focus:outline-none"
              placeholder="Tìm kiếm"
              type="text"
            />
            <div className="h-96 overflow-y-auto">
              {conversations?.map((c, index) => (
                <div onClick={() => setCurrentChat(c)} key={index}>
                  <Conversations
                    conversation={c}
                    currentUser={cofounder?.cofounderData}
                    onlineUsers={onlineUsers}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-auto p-3 w-64">
          <div className="flex flex-col justify-between h-full relative">
            {currentChat ? (
              <>
                <div className="pr-2 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
                  {messages?.map((msg: any, index: any) => (
                    <div key={index} ref={scrollRef}>
                      <Message
                        message={msg}
                        own={msg?.sender === cofounder?.cofounderData?._id}
                        id={msg?.sender}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <textarea
                    className="w-10/12 h-24 p-3 focus:outline-none"
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Nhập vào..."
                    value={newMessage}
                  />
                  <Tooltip content="Send">
                    <button
                      onClick={handleSubmit}
                      className="text-3xl text-blue-600"
                    >
                      <IoPaperPlaneSharp />
                    </button>
                  </Tooltip>
                </div>
              </>
            ) : (
              <span className="absolute top-10 text-4xl text-gray-400 cursor-default ">
                Mở cửa sổ trò chuyện để bắt đầu nhắn tin.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messenger;
