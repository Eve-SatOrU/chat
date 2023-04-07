const chatBox = document.querySelector('#chat-box');

socket.on('message', message => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  chatBox.appendChild(messageElement);
});

const messagesDiv = document.querySelector('#messages');
const messageP = document.createElement('p');
messageP.textContent = message;
messagesDiv.appendChild(messageP);
