import { useState, createContext} from "react";
//import Notification from "../components/Notification/Notification";
import * as React from 'react';
// import Button from '@mui/material/Button';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';
// import Alert from '@mui/material/Alert';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Notification = ({ message, status }) => {

    

    // const notificar = (msg, status) => {
    //     if (status === 'success') {
    //         toast.success(msg)
    //     }


  const notificationStyle = {
    position: 'absolute',
    top: 100,
    right: 10,
    width: 'auto',
    height: 'auto',
    backgroundColor: status === 'success' ? 'green' : 'red',
    color: 'white',
    padding: '10px 20px 10px 20px'
  }

  if(message === '') return

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}








export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {


    const notify = (msg, status) => toast(msg, { type: status,
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",});


    // const [notification, setNotification] = useState({});

    // const addNotification = (notificationToAdd) => {
    //     setNotification(notificationToAdd);
    // };

    // const removeNotification = () => {
    //     setNotification({});
    // };
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('success');

    const setNotification = (msg, status) => {
        setMessage(msg);
        setStatus(status);
        notify(msg, status);
    }

    return (
        <NotificationContext.Provider value={{ setNotification }}>
            {/* <Notification message={message} status={status} /> */}
            <ToastContainer />
            {children}
        </NotificationContext.Provider>
    );
}