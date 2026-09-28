<script>
document.addEventListener("DOMContentLoaded", function () {

    const chatToggle   = document.getElementById('chatToggle');
    const chatWidget   = document.getElementById('chatWidget');
    const chatClose    = document.getElementById('chatClose');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput    = document.getElementById('chatInput');
    const chatSend     = document.getElementById('chatSend');

    if (!chatToggle) return;

    /* ---- Open / Close ---- */
    chatToggle.addEventListener('click', () => {
        chatWidget.classList.toggle('open');
    });

    chatClose.addEventListener('click', () => {
        chatWidget.classList.remove('open');
    });

    /* ══════════════════════════════════
       QUICK REPLY CHIPS
    ══════════════════════════════════ */
    function showQuickReplies() {
        const chips = [
            "What services do you offer?",
            "What is your tech stack?",
            "Show me your projects",
            "How much do you charge?",
            "How do I hire you?",
            "Tell me about yourself"
        ];

        const outer = document.createElement("div");
        outer.className = "quick-replies-wrapper";
        outer.id = "quick-replies";

        const label = document.createElement("p");
        label.className = "quick-replies-label";
        label.textContent = "Suggested questions:";
        outer.appendChild(label);

        const wrap = document.createElement("div");
        wrap.className = "quick-replies";

        chips.forEach(chip => {
            const chipBtn = document.createElement("button");
            chipBtn.className = "quick-reply-btn";
            chipBtn.textContent = chip;
            chipBtn.onclick = () => {
                chatInput.value = chip;
                outer.remove();
                handleSend();
            };
            wrap.appendChild(chipBtn);
        });

        outer.appendChild(wrap);
        chatMessages.appendChild(outer);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    /* ══════════════════════════════════
       TYPING INDICATOR
    ══════════════════════════════════ */
    function showTyping() {
        const el = document.createElement("div");
        el.className = "msg msg-bot typing-indicator";
        el.id = "typing";
        el.innerHTML = "<span></span><span></span><span></span>";
        chatMessages.appendChild(el);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function hideTyping() {
        const el = document.getElementById("typing");
        if (el) el.remove();
    }

    /* ══════════════════════════════════
       KNOWLEDGE BASE
    ══════════════════════════════════ */
    function getBotReply(userMsg) {
        const t = userMsg.toLowerCase().trim();
        if (!t) return "Please type something!";

        if (t.includes("hi") || t.includes("hello") || t.includes("hey")) {
            return "Hey there! 👋 I'm your portfolio assistant. Ask me about my services, tech stack, projects, pricing, or how to get in touch.";
        }

        if (t.includes("service") || t.includes("offer") || t.includes("do you do")) {
            return "I offer three core services: 🌐 Web Development (Django, Python, HTML/CSS/Bootstrap), 📱 Mobile App Development (Android — Kotlin/Java, Firebase), and 🤖 AI-Integrated Apps (chatbots, smart features, AI APIs).";
        }

        if (t.includes("skill") || t.includes("stack") || t.includes("technology") || t.includes("tech")) {
            return "My stack: 🐍 Python/Django, 📱 Kotlin/Java (Android), 🔥 Firebase, 🤖 AI integration, 🎨 HTML/CSS/Bootstrap.";
        }

        if (t.includes("project") || t.includes("portfolio") || t.includes("work") || t.includes("built") || t.includes("show")) {
            return "I've built [list your project names here — web apps, Android apps, AI features]. Check the Projects section for details!";
        }

        if (t.includes("price") || t.includes("cost") || t.includes("charge") || t.includes("rate") || t.includes("fee") || t.includes("how much")) {
            return "Pricing depends on project scope. Share your project details and I'll get back to you with a custom quote within 24 hours.";
        }

        if (t.includes("hire") || t.includes("contact") || t.includes("reach") || t.includes("email") || t.includes("message")) {
            return "You can reach me directly through the contact page — I typically respond within 24 hours.";
        }

        if (t.includes("about") || t.includes("who") || t.includes("background") || t.includes("experience") || t.includes("education")) {
            return "I'm a Full-Stack Developer & Android Engineer specializing in web, mobile, and AI-powered apps. [Add your background/education here.]";
        }

        if (t.includes("thank")) {
            return "You're welcome! If you need more details, just ask. 😊";
        }

        return "I'm here to help! Try asking about my services, tech stack, projects, pricing, or how to hire me.";
    }

    /* ---- Add message ---- */
    function addMessage(text, sender) {
        hideTyping();
        const div = document.createElement('div');
        div.classList.add('msg', sender === 'bot' ? 'msg-bot' : 'msg-user');
        div.textContent = text;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    /* ---- Send handler ---- */
    function handleSend() {
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        chatInput.value = '';
        chatInput.focus();

        const qr = document.getElementById("quick-replies");
        if (qr) qr.remove();

        showTyping();

        setTimeout(() => {
            addMessage(getBotReply(text), 'bot');
        }, 500 + Math.random() * 300);
    }

    /* ---- Event listeners ---- */
    chatSend.addEventListener('click', handleSend);
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    });

    /* ---- Show chips on load ---- */
    showQuickReplies();
});
</script>