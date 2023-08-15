import React from "react";

//  Message interface

type Message = {
  text: string;
  isUser: boolean;
};
//Message Array

interface MessageArray {
  messages: Message[];
}
//  Create Action

type Action = {
  type: "ADD_MESSAGE";
  payload: MessageArray;
};

//  Create Initial State
const initalState = { messages: [] };

//  Create Context for Message

export const MessageContext = React.createContext<{
  state: MessageArray;
  dispatch: React.Dispatch<Action>;
}>({ state: initalState, dispatch: () => {} });

//  Create Reducer

export const reducer = (state: MessageArray, action: Action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return { messages: action.payload.messages };
    default:
      return state;
  }
};

//  Create Provider

export const MessageProvider: React.FC<any> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = React.useReducer(reducer, initalState);
  return (
    <MessageContext.Provider value={{ state, dispatch }}>
      {children}
    </MessageContext.Provider>
  );
};

// Create useContext Hook

export const useMessage = (): {
  state: MessageArray;
  dispatch: React.Dispatch<Action>;
} => {
  const context = React.useContext(MessageContext);
  if (context === undefined) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};
