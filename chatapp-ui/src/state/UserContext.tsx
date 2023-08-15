import React from "react";

interface SelectUser {
  username: string;
  socketId: string | null;
  imageUrl: string;
}

interface State {
  selectUser: SelectUser;
}
type Action = {
  type: "SELECT_USER";
  payload: SelectUser;
};

export const intialSelectUserState: State = {
  selectUser: {
    username: "",
    socketId: "",
    imageUrl: "",
  },
};

// create context

const UserContext = React.createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: intialSelectUserState, dispatch: () => {} });

//user Reducer
export function SelectUserReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SELECT_USER":
      return { ...state, selectUser: action.payload };
    default:
      return state;
  }
}

// create user context provider
export const UserProvider: React.FC<any> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = React.useReducer(
    SelectUserReducer,
    intialSelectUserState
  );
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// userContext hook

export function useSelectUser(): {
  state: State;
  dispatch: React.Dispatch<Action>;
} {
  const context = React.useContext(UserContext);
  if (context === undefined) throw new Error("context is undefined");
  return context;
}
