import { configureStore } from "@reduxjs/toolkit";
import { adminReducer } from "./reducers/adminSlice";
import { messagesReducer } from "./reducers/messagesSlice";
import { projectReducer } from "./reducers/projectSlice";
import { userReducer } from "./reducers/userSlice";
import { languageReducer } from "./reducers/language";
import { darkReducer } from "./reducers/dark";
import { appointmentReducer } from "./reducers/appointmentsSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    user: userReducer,
    project: projectReducer,
    messages: messagesReducer,
    language: languageReducer,
    dark: darkReducer,
    appointment: appointmentReducer,
  },
});
