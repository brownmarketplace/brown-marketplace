var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState, useEffect, useRef } from "react";
var sendIcon = (React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M19 10L1 1L5 10L1 19L19 10Z", stroke: "black", strokeWidth: "2", strokeLinejoin: "round" })));
function ChatCentral(props) {
    var _a = useState([]), messages = _a[0], setMessages = _a[1];
    var _b = useState(false), isConnectionOpen = _b[0], setConnectionOpen = _b[1];
    var _c = useState(""), messageBody = _c[0], setMessageBody = _c[1];
    var username = "Ran";
    //props.userID;
    var ws = useRef();
    // sending message function
    var sendMessage = function () {
        if (messageBody) {
            ws.current.send(JSON.stringify({
                sender: username,
                body: messageBody,
            }));
            setMessageBody("");
        }
    };
    useEffect(function () {
        ws.current = new WebSocket("ws://localhost:8080");
        ws.current.onopen = function () {
            console.log("Connection opened");
            setConnectionOpen(true);
        };
        ws.current.onmessage = function (event) {
            var data = event.data;
            console.log(data);
            setMessages(function (_messages) { return __spreadArray(__spreadArray([], _messages, true), [data], false); });
        };
        return function () {
            console.log("Cleaning up...");
            ws.current.close();
        };
    }, []);
    var scrollTarget = useRef(null);
    useEffect(function () {
        if (scrollTarget.current) {
            scrollTarget.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages.length]);
    return (React.createElement("div", null,
        React.createElement("div", { id: "chat-view-container", className: "flex flex-col w-1/3" },
            messages.map(function (message, index) { return (React.createElement("div", { key: index, className: "my-3 rounded py-3 w-1/3 text-white ".concat(message.sender === username ? "self-end bg-purple-600" : "bg-blue-600") },
                React.createElement("div", { className: "flex items-center" },
                    React.createElement("div", { className: "ml-2" },
                        React.createElement("div", { className: "flex flex-row" },
                            React.createElement("div", { className: "text-sm font-medium leading-5 text-gray-900" },
                                message.sender,
                                " at"),
                            React.createElement("div", { className: "ml-1" },
                                React.createElement("div", { className: "text-sm font-bold leading-5 text-gray-900" },
                                    new Date(message.sentAt).toLocaleTimeString(undefined, {
                                        timeStyle: "short",
                                    }),
                                    " "))),
                        React.createElement("div", { className: "mt-1 text-sm font-semibold leading-5" }, message.body))))); }),
            React.createElement("div", { ref: scrollTarget })),
        React.createElement("footer", { className: "w-1/3" },
            React.createElement("p", null,
                "You are chatting as ",
                React.createElement("span", { className: "font-bold" }, username)),
            React.createElement("div", { className: "flex flex-row" },
                React.createElement("input", { id: "message", type: "text", className: "w-full border-2 border-gray-200 focus:outline-none rounded-md p-2 hover:border-purple-400", placeholder: "Type your message here...", value: messageBody, onChange: function (e) { return setMessageBody(e.target.value); }, required: true }),
                React.createElement("button", { "aria-label": "Send", onClick: sendMessage, className: "m-3", disabled: !isConnectionOpen }, sendIcon)))));
}
export default ChatCentral;
//# sourceMappingURL=ChatCentral.js.map