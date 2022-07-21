// import {useState, useMemo } from "react";
// import { MainContainer, Sidebar, ConversationList, Conversation, Avatar, MessageGroup, Message,
//   ChatContainer, ConversationHeader, MessageList, MessageInput} from "@chatscope/chat-ui-kit-react";
// import { useChat, ChatMessage, MessageContentType, MessageDirection, MessageStatus } from "@chatscope/use-chat";

// export const Chat = () => {

//   // Message input value
//   const [value, setValue] = useState("");

//   // Get all chat related values and methods from useChat hook 
//   const {
//     currentMessages, conversations, activeConversation, setActiveConversation, sendMessage, getUser
//   } = useChat();

//   // Get current user data
//   const [currentUserAvatar, currentUserName] = useMemo(() => {

//     if (activeConversation) {
//       const participant = activeConversation.participants.length > 0 ? activeConversation.participants[0] : undefined;

//       if (participant) {
//         const user = getUser(participant.id);
//         if (user) {
//           return [<Avatar src={user.avatar} />, user.username]
//         }
//       }
//     }

//     return [undefined, undefined];

//   }, [activeConversation]);

//   const handleSend = text => {

//     // Logger user (sender)
//     const currentUserId = "123";

//     const message = new ChatMessage({
//       id: "",
//       content: text,
//       contentType: MessageContentType.TextHtml,
//       senderId: currentUserId,
//       direction: MessageDirection.Outgoing,
//       status: MessageStatus.Sent
//     });

//     sendMessage({
//       message,
//       conversationId: activeConversation.id,
//       senderId: currentUserId,
//     });

//   };

//   return (<MainContainer>
//     <Sidebar position="left">
//       <ConversationList>
//         {conversations.map(c => {
          
//           // Helper for getting the data of the first participant
//           const [avatar, name] = (() => {

//             const participant = c.participants.length > 0 ? c.participants[0] : undefined;
//             if (participant) {
//               const user = getUser(participant.id);
//               if (user) {

//                 return [<Avatar src={user.avatar} />, user.username]

//               }
//             }

//             return [undefined, undefined]
//           })();

//           <Conversation key={c.id}
//                         name={name}
//                         active={activeConversation?.id === c.id}
//                         unreadCnt={c.unreadCounter}
//                         onClick={e => setActiveConversation(c.id)}>
//             {avatar}
//           </Conversation>
//         })}
//       </ConversationList>
//     </Sidebar>
    
//     <ChatContainer>
      
//       <ConversationHeader>
//         {currentUserAvatar}
//         <ConversationHeader.Content userName={currentUserName} />
//       </ConversationHeader>
      
//       <MessageList>
//         {currentMessages.map(g => <MessageGroup key={g.id} direction={g.direction}>
//           <MessageGroup.Messages>
//             {g.messages.map(m => <Message key={m.id} model={{
//               type: "text",
//               payload: m.content
//             }} />)}
//           </MessageGroup.Messages>
//         </MessageGroup>)}
//       </MessageList>
      
//       <MessageInput value={value} onSend={handleSend} />
      
//     </ChatContainer>
    
//   </MainContainer>);
// }
