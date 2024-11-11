document.getElementById('sendBtn').addEventListener('click', async function() {
    const userInput = document.getElementById('input').value; // الرسالة التي يدخلها المستخدم

    if (userInput.trim() === '') return; // التحقق من أن الحقل ليس فارغًا

    addMessage(userInput, 'user'); // إضافة رسالة المستخدم
    document.getElementById('input').value = ''; // مسح الحقل بعد الإرسال

    try {
        const response = await fetch('http://localhost:3000/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userInput }) // إرسال الرسالة إلى الخادم
        });

        const data = await response.json(); // استقبال الرد من الخادم
        addMessage(data.reply, 'ai'); // إضافة رد الذكاء الاصطناعي
    } catch (error) {
        console.error('Error fetching AI response:', error);
    }
});

function addMessage(message, sender) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add(sender); // إضافة الصنف 'user' أو 'ai' للتمييز بين الرسائل
    messageContainer.textContent = message;
    document.getElementById('messages').appendChild(messageContainer);
}

