import {notification } from 'antd';


export const notifiFuntion = (type,messagerNotifi,descriptionNotifi) => {
    notification[type]({
      message: messagerNotifi,
      description:descriptionNotifi,
      duration : 2
    });
  };