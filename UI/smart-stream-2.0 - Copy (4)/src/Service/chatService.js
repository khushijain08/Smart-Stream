import ZIM from 'zego-zim-web';

// ZIM Initialization
const appID = 910129338;       // Replace with your App ID
const appSign = 'd72a9f97d19c056b591f6762d3107eae8028d711561a8d2def2d1cc1bb3adb09';   // Replace with your App Sign

export const initializeChat = () => {
    const zim = ZIM.create({ appID, appSign });
    return zim;
};

// User Login Function
export const loginUser = (zim, userID, userName) => {
    zim.login({ userID, userName })
        .then(() => console.log('User logged in successfully'))
        .catch((error) => console.error('Login failed', error));
};

// Message Sending Function
export const sendMessage = (zim, roomID, message) => {
    const messageObj = ZIM.createTextMessage(message);
    zim.sendMessage(roomID, messageObj)
        .then(() => console.log('Message sent successfully'))
        .catch((error) => console.error('Message sending failed', error));
};