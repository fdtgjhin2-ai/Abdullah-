<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>دردشتي الخاصة</title>
    <style>
        body { font-family: sans-serif; background: #e5ddd5; margin: 0; display: flex; flex-direction: column; height: 100vh; }
        #messages { flex: 1; overflow-y: auto; padding: 20px; list-style: none; display: flex; flex-direction: column; }
        #messages li { background: white; padding: 10px 15px; margin-bottom: 10px; border-radius: 15px; box-shadow: 0 1px 2px rgba(0,0,0,0.1); max-width: 80%; word-wrap: break-word; }
        form { display: flex; padding: 15px; background: #f0f0f0; border-top: 1px solid #ddd; }
        input { flex: 1; padding: 12px; border: 1px solid #ccc; border-radius: 25px; outline: none; font-size: 16px; }
        button { padding: 10px 20px; background: #075e54; color: white; border: none; margin-right: 10px; border-radius: 25px; cursor: pointer; font-weight: bold; }
    </style>
</head>
<body>
    <ul id="messages"></ul>
    <form id="form">
        <input id="input" placeholder="اكتب رسالتك هنا..." autocomplete="off" />
        <button type="submit">إرسال</button>
    </form>
    <script src="/socket.io/socket.io.js"></script>
    <script>
        var socket = io();
        var form = document.getElementById('form');
        var input = document.getElementById('input');
        var messages = document.getElementById('messages');

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (input.value) {
                socket.emit('chat message', input.value);
                input.value = '';
            }
        });

        socket.on('chat message', function(msg) {
            var item = document.createElement('li');
            item.textContent = msg;
            messages.appendChild(item);
            messages.scrollTop = messages.scrollHeight;
        });
    </script>
</body>
</html>
