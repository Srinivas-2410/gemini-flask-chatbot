document.addEventListener('DOMContentLoaded', function () {
    const sendBtn = document.getElementById('sendBtn');
    const userInput = document.getElementById('userInput');
    const chatbox = document.getElementById('chatbox');

    // Function to add messages to the chatbox
    function addMessage(message, isUser = true) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', isUser ? 'user-message' : 'bot-message');
        messageDiv.textContent = message;
        chatbox.appendChild(messageDiv);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    // Function to send a message to the backend
    function sendMessage() {
        const message = userInput.value;
        if (message.trim() === "") return;

        // Display user's message
        addMessage(message, true);
        userInput.value = '';

        // Send user's message to Flask backend
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        })
        .then(response => response.json())
        .then(data => {
            // Display bot's response
            addMessage(data.response, false);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Event listener for the send button
    sendBtn.addEventListener('click', sendMessage);

    // Allow sending message by pressing Enter key
    userInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});
