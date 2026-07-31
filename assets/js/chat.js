(function () {
  'use strict';

  var EMAIL = 'hello@taraz.studio';
  var STORAGE_KEY = 'taraz-chat-v1';
  var API_ENDPOINT = '/api/chat';

  var I18N = {
    en: {
      greeting: 'Hi! I am the AI virtual assistant of Taraz. Tell me what problem you want to solve, ask about our services, pricing, or a demo — or just say hello. A specialist can also take over if you need a human.',
      chips: ['Pricing', 'Services', 'Book a demo', 'Talk to a person'],
      replies: {
        greet: 'Hello! Thanks for reaching out. How can we help? You can ask about pricing, services, or book a quick demo.',
        pricing: 'Every engagement is scoped around one operational workflow, so pricing depends on the size of the problem. The fastest way to get a ballpark is a 30-minute discovery call — we usually share an estimate within one business day. Should I prepare a demo for you as well?',
        services: 'We deliver four things: operational diagnosis, intelligent automation, internal products (dashboards and tools), and product engineering. Tell me which area your team is struggling with and I will point you to the right starting point.',
        demo: 'Great — a demo is the fastest way to see what we build. Send us a message with the subject "Demo request" through the contact form and we will set up a 30-minute walkthrough within two business days. Anything specific you want the demo to cover?',
        contact: 'You can reach us through the contact form on the homepage, or by email at ' + EMAIL + '. A specialist usually replies within one business day.',
        human: 'Of course — a specialist will take it from here. Please use the contact form with your number and the best time to call, and we will connect you directly. Meanwhile, is there anything else I can answer?',
        hours: 'We reply Sunday to Thursday, 09:00 to 18:00 Tehran time. Messages sent outside these hours are answered first thing the next morning.',
        thanks: 'You are welcome! If anything else comes to mind, I am right here.',
        fallback: 'Thanks for your message — a specialist will get back to you shortly. For urgent matters, you can also use the contact form. Is there anything about pricing, services, or demos I can answer right now?',
      },
    },
    fa: {
      greeting: '\u0633\u0644\u0627\u0645! \u0645\u0646 \u062f\u0633\u062a\u06cc\u0627\u0631 \u0647\u0648\u0634\u0645\u0646\u062f \u062a\u0627\u0631\u0627\u0632 \u0647\u0633\u062a\u0645. \u0628\u06af\u0648\u06cc\u06cc\u062f \u0686\u0647 \u0645\u0634\u06a9\u0644 \u06cc\u0627 \u0646\u06cc\u0627\u0632\u06cc \u062f\u0627\u0631\u06cc\u062f \u2014 \u0648 \u06cc\u0627 \u062f\u0631\u0628\u0627\u0631\u0647 \u062e\u062f\u0645\u0627\u062a\u060c \u0642\u06cc\u0645\u062a \u06cc\u0627 \u062f\u0645\u0648 \u0628\u067e\u0631\u0633\u06cc\u062f. \u0627\u06af\u0631 \u0646\u06cc\u0627\u0632 \u0628\u0647 \u06af\u0641\u062a\u200c\u06af\u0648 \u0628\u0627 \u06a9\u0627\u0631\u0634\u0646\u0627\u0633 \u062f\u0627\u0634\u062a\u06cc\u062f\u060c \u0627\u06cc\u0646\u062c\u0627 \u0647\u0633\u062a\u06cc\u0645.',
      chips: ['\u0642\u06cc\u0645\u062a \u0648 \u0647\u0632\u06cc\u0646\u0647', '\u062e\u062f\u0645\u0627\u062a', '\u0631\u0632\u0631\u0648 \u062f\u0645\u0648', '\u06af\u0641\u062a\u200c\u06af\u0648 \u0628\u0627 \u06a9\u0627\u0631\u0634\u0646\u0627\u0633'],
      replies: {
        greet: '\u0633\u0644\u0627\u0645! \u0645\u0645\u0646\u0648\u0646 \u06a9\u0647 \u067e\u06cc\u0627\u0645 \u062f\u0627\u062f\u06cc\u062f. \u0686\u06cc\u06a9 \u0645\u06cc\u200c\u062a\u0648\u0627\u0646\u06cc\u0645 \u06a9\u0645\u06a9 \u06a9\u0646\u06cc\u0645\u061f \u062f\u0631\u0628\u0627\u0631\u0647 \u0642\u06cc\u0645\u062a\u060c \u062e\u062f\u0645\u0627\u062a \u06cc\u0627 \u0631\u0632\u0631\u0648 \u062f\u0645\u0648\u06cc \u06a9\u0648\u062a\u0627\u0647 \u0628\u067e\u0631\u0633\u06cc\u062f.',
        pricing: '\u0647\u0631 \u0647\u0645\u06a9\u0627\u0631\u06cc \u0628\u0631 \u0627\u0633\u0627\u0633 \u06cc\u06a9 \u06a9\u0631\u0627\u0646\u200c\u0648\u0648\u0631\u06a9 \u0639\u0645\u0644\u06cc\u0627\u062a\u06cc \u0634\u0627\u0631\u0632 \u0645\u06cc\u200c\u0634\u0648\u062f\u060c \u067e\u0633 \u0642\u06cc\u0645\u062a \u0628\u0647 \u0627\u0628\u0639\u0627\u062f \u0645\u0633\u0626\u0644\u0647 \u0628\u0633\u062a\u06af\u06cc \u062f\u0627\u0631\u062f. \u0633\u0631\u06cc\u0639\u200c\u062a\u0631\u06cc\u0646 \u0631\u0627\u0647 \u06af\u0631\u0641\u062a\u0646 \u0628\u0631\u0622\u0648\u0631\u062f \u062a\u0642\u0631\u06cc\u0628\u06cc\u060c \u06cc\u06a9 \u062c\u0644\u0633\u0647 \u0645\u0639\u0631\u0641\u06cc 30 \u062f\u0642\u06cc\u0642\u0647\u200c\u0627\u06cc \u0627\u0633\u062a \u2014 \u0645\u0639\u0645\u0648\u0644\u0627\u064b \u0638\u0631\u0641 \u06cc\u06a9 \u0631\u0648\u0632 \u06a9\u0627\u0631\u06cc \u0628\u0631\u0622\u0648\u0631\u062f \u0631\u0627 \u0627\u0634\u062a\u0631\u0627\u06a9 \u0645\u06cc\u200c\u06a9\u0646\u06cc\u0645. \u0628\u0631\u0627\u06cc\u062a\u0627\u0646 \u062f\u0645\u0648 \u0647\u0645 \u0622\u0645\u0627\u062f\u0647 \u06a9\u0646\u0645\u061f',
        services: '\u0686\u0647\u0627\u0631 \u062e\u062f\u0645\u062a \u0627\u0631\u0627\u0626\u0647 \u0645\u06cc\u200c\u062f\u0647\u06cc\u0645: \u0639\u0627\u0631\u0636\u0647\u200c\u06cc\u0627\u0628\u06cc \u0639\u0645\u0644\u06cc\u0627\u062a\u06cc\u060c \u0627\u062a\u0648\u0645\u0627\u0633\u06cc\u0648\u0646 \u0647\u0648\u0634\u0645\u0646\u062f\u060c \u0645\u062d\u0635\u0648\u0644\u0627\u062a \u062f\u0627\u062e\u0644\u06cc (\u062f\u0627\u0634\u0628\u0648\u0631\u062f \u0648 \u0627\u0628\u0632\u0627\u0631\u0647\u0627) \u0648 \u0645\u0647\u0646\u062f\u0633\u06cc \u0645\u062d\u0635\u0648\u0644. \u0628\u06af\u0648\u06cc\u06cc\u062f \u062a\u06cc\u0645 \u0634\u0645\u0627 \u0628\u0627 \u06a9\u062f\u0627\u0645 \u0628\u062e\u0634 \u0645\u0634\u06a9\u0644 \u062f\u0627\u0631\u062f \u062a\u0627 \u0634\u0645\u0627 \u0631\u0627 \u0628\u0647 \u0646\u0642\u0637\u0647 \u0634\u0631\u0648\u0639 \u0645\u0646\u0627\u0633\u0628 \u0647\u062f\u0627\u06cc\u062a \u06a9\u0646\u0645.',
        demo: '\u0639\u0627\u0644\u06cc \u0627\u0633\u062a \u2014 \u062f\u0645\u0648 \u0633\u0631\u06cc\u0639\u200c\u062a\u0631\u06cc\u0646 \u0631\u0627\u0647 \u062f\u06cc\u062f\u0646 \u0627\u06cc\u0646 \u0627\u0633\u062a \u06a9\u0647 \u0686\u0647 \u0645\u06cc\u200c\u0633\u0627\u0632\u06cc\u0645. \u0627\u0632 \u0637\u0631\u06cc\u0642 \u0641\u0631\u0645 \u062a\u0645\u0627\u0633 \u0628\u0627 \u0645\u0648\u0636\u0648\u0639 \u00ab\u062f\u0631\u062e\u0648\u0627\u0633\u062a \u062f\u0645\u0648\u00bb \u067e\u06cc\u0627\u0645 \u0628\u062f\u0647\u06cc\u062f \u062a\u0627 \u0638\u0631\u0641 \u062f\u0648 \u0631\u0648\u0632 \u06a9\u0627\u0631\u06cc \u06cc\u06a9 \u062f\u0645\u0648\u06cc 30 \u062f\u0642\u06cc\u0642\u0647\u200c\u0627\u06cc \u062a\u0631\u062a\u06cc\u0628 \u062f\u0647\u06cc\u0645. \u0645\u06cc\u200c\u062e\u0648\u0627\u0647\u06cc\u062f \u062f\u0645\u0648 \u0631\u0648\u06cc \u0686\u0647 \u0645\u0648\u0636\u0648\u0639\u06cc \u0645\u062a\u0645\u0631\u06a9\u0632 \u0634\u0648\u062f\u061f',
        contact: '\u0645\u06cc\u200c\u062a\u0648\u0627\u0646\u06cc\u062f \u0627\u0632 \u0637\u0631\u06cc\u0642 \u0641\u0631\u0645 \u062a\u0645\u0627\u0633 \u062f\u0631 \u0635\u0641\u062d\u0647 \u0627\u0635\u0644\u06cc \u06cc\u0627 \u0627\u06cc\u0645\u06cc\u0644 ' + EMAIL + ' \u0628\u0627 \u0645\u0627 \u062f\u0631 \u0627\u0631\u062a\u0628\u0627\u0637 \u0628\u0627\u0634\u06cc\u062f. \u0645\u0639\u0645\u0648\u0644\u0627\u064b \u06a9\u0627\u0631\u0634\u0646\u0627\u0633 \u0638\u0631\u0641 \u06cc\u06a9 \u0631\u0648\u0632 \u06a9\u0627\u0631\u06cc \u067e\u0627\u0633\u062e \u0645\u06cc\u200c\u062f\u0647\u062f.',
        human: '\u062d\u062a\u0645\u0627\u064b \u2014 \u06a9\u0627\u0631\u0634\u0646\u0627\u0633 \u0627\u062f\u0627\u0645\u0647 \u0645\u06cc\u200c\u062f\u0647\u062f. \u0644\u0637\u0641\u0627\u064b \u0627\u0632 \u0637\u0631\u06cc\u0642 \u0641\u0631\u0645 \u062a\u0645\u0627\u0633\u060c \u0634\u0645\u0627\u0631\u0647 \u0648 \u0632\u0645\u0627\u0646 \u0645\u0646\u0627\u0633\u0628 \u062a\u0645\u0627\u0633 \u0631\u0627 \u0628\u0641\u0631\u0633\u062a\u06cc\u062f \u062a\u0627 \u0645\u0633\u062a\u0642\u06cc\u0645 \u0634\u0645\u0627 \u0631\u0627 \u0645\u062a\u0635\u0644 \u06a9\u0646\u06cc\u0645. \u062f\u0631 \u0627\u06cc\u0646 \u0645\u06cc\u0627\u0646 \u067e\u0633\u0648\u062e\u06cc \u0628\u0647 \u0633\u0648\u0627\u0644 \u062f\u06cc\u06af\u0631\u06cc \u0647\u0645 \u062f\u0627\u0631\u0645.',
        hours: '\u0634\u0646\u0628\u0647 \u062a\u0627 \u067e\u0646\u062c\u0634\u0646\u0628\u0647\u060c \u0633\u0627\u0639\u062a 9 \u062a\u0627 18 \u0628\u0647 \u0648\u0642\u062a \u062a\u0647\u0631\u0627\u0646 \u067e\u0627\u0633\u062e\u06af\u0648 \u0647\u0633\u062a\u06cc\u0645. \u067e\u06cc\u0627\u0645\u200c\u0647\u0627\u06cc \u062e\u0627\u0631\u062c \u0627\u0632 \u0627\u06cc\u0646 \u0633\u0627\u0639\u0627\u062a \u0627\u0648\u0644 \u0635\u0628\u062d \u0631\u0648\u0632 \u0628\u0639\u062f \u067e\u0627\u0633\u062e \u062f\u0627\u062f\u0647 \u0645\u06cc\u200c\u0634\u0648\u0646\u062f.',
        thanks: '\u062e\u0648\u0634\u062d\u0627\u0644 \u0634\u062f\u0645! \u0627\u06af\u0631 \u0633\u0648\u0627\u0644\u06cc \u062f\u06cc\u06af\u0631 \u0628\u0647 \u0630\u0647\u0646\u062a\u0627\u0646 \u0631\u0633\u06cc\u062f\u060c \u0645\u0646 \u0647\u0645\u06cc\u0646\u062c\u0627 \u0647\u0633\u062a\u0645.',
        fallback: '\u0645\u0645\u0646\u0648\u0646 \u0627\u0632 \u067e\u06cc\u0627\u0645\u062a\u0627\u0646 \u2014 \u06a9\u0627\u0631\u0634\u0646\u0627\u0633 \u0628\u0647 \u0632\u0648\u062f\u06cc \u0628\u0627 \u0634\u0645\u0627 \u062a\u0645\u0627\u0633 \u0645\u06cc\u200c\u06af\u06cc\u0631\u062f. \u0628\u0631\u0627\u06cc \u0645\u0648\u0627\u0631\u062f \u0636\u0631\u0648\u0631\u06cc \u0647\u0645 \u0645\u06cc\u200c\u062a\u0648\u0627\u0646\u06cc\u062f \u0627\u0632 \u0641\u0631\u0645 \u062a\u0645\u0627\u0633 \u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u06a9\u0646\u06cc\u062f. \u0622\u06cc\u0627 \u062f\u0631 \u0645\u0648\u0631\u062f \u0642\u06cc\u0645\u062a\u060c \u062e\u062f\u0645\u0627\u062a \u06cc\u0627 \u062f\u0645\u0648 \u0633\u0648\u0627\u0644\u06cc \u062f\u0627\u0631\u06cc\u062f \u06a9\u0647 \u0627\u06a9\u0646\u0648\u0646 \u067e\u0627\u0633\u062e \u0628\u062f\u0647\u0645\u061f',
      },
    },
  };

  var RULES = [
    { re: /(human|person|agent|operator|specialist|expert|talk to|کارشناس|انسان|اپراتور|متخصص)/, key: 'human' },
    { re: /(demo|pilot|trial|walkthrough|sample|دمو|پایلوت|نمونه)/, key: 'demo' },
    { re: /(price|cost|pricing|budget|quote|estimate|charge|قیمت|هزینه|تعرفه|بها)/, key: 'pricing' },
    { re: /(service|offer|deliver|product|خدمات|خدمت|محصول)/, key: 'services' },
    { re: /(contact|email|call|phone|telegram|تماس|ایمیل|تلفن|واتساپ)/, key: 'contact' },
    { re: /(hour|time|open|when|ساعت|زمان|وقت)/, key: 'hours' },
    { re: /(thank|thanks|ممنون|تشکر|سپاس)/, key: 'thanks' },
    { re: /(hi|hello|hey|salam|good (morning|afternoon|evening)|سلام|درود|علیک)/, key: 'greet' },
  ];

  var body = document.getElementById('chatBody');
  var form = document.getElementById('chatForm');
  var input = document.getElementById('chatInput');
  var chipsEl = document.getElementById('chatChips');
  var clearBtn = document.getElementById('chatClear');
  var transcriptBtn = document.getElementById('chatTranscript');

  if (!body || !form || !input) return;

  var history = [];
  try {
    history = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (e) {
    history = [];
  }

  function lang() {
    return document.documentElement.lang === 'en' ? 'en' : 'fa';
  }

  function timeStr() {
    var d = new Date();
    try {
      return d.toLocaleTimeString(lang() === 'fa' ? 'fa-IR' : 'en-US', { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return '';
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {}
  }

  function scrollDown() {
    body.scrollTop = body.scrollHeight;
  }

  function addMsg(role, text) {
    var wrap = document.createElement('div');
    wrap.className = 'chat-msg chat-msg--' + role;
    var p = document.createElement('p');
    p.textContent = text;
    wrap.appendChild(p);
    var t = document.createElement('span');
    t.className = 'chat-msg__time';
    t.textContent = timeStr();
    wrap.appendChild(t);
    body.appendChild(wrap);
    scrollDown();
    return wrap;
  }

  function renderHistory() {
    body.innerHTML = '';
    if (!history.length) {
      history.push({ role: 'bot', text: I18N[lang()].greeting, ts: Date.now() });
      save();
    }
    history.forEach(function (m) {
      var el = addMsg(m.role, m.text);
      el.querySelector('.chat-msg__time').textContent = new Date(m.ts).toLocaleTimeString(lang() === 'fa' ? 'fa-IR' : 'en-US', { hour: '2-digit', minute: '2-digit' });
    });
    renderChips();
  }

  function showTyping() {
    var el = document.createElement('div');
    el.className = 'chat-msg chat-msg--bot chat-typing';
    el.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < 3; i++) { el.appendChild(document.createElement('span')); }
    body.appendChild(el);
    scrollDown();
    return el;
  }

  function replyTo(text) {
    var lower = text.toLowerCase();
    for (var i = 0; i < RULES.length; i++) {
      if (RULES[i].re.test(lower)) return RULES[i].key;
    }
    return 'fallback';
  }

  function botReply(key) {
    var r = I18N[lang()].replies[key];
    return r || I18N[lang()].replies.fallback;
  }

  function aiReply(msgs, done) {
    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: msgs, locale: lang() }),
    })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          return { ok: res.ok, data: data };
        });
      })
      .then(function (r) {
        var text = r.data && r.data.replyText;
        if (r.ok && typeof text === 'string' && text.trim()) {
          done(text.trim());
        } else {
          done(null);
        }
      })
      .catch(function () {
        done(null);
      });
  }

  function send(text) {
    var msg = text.trim();
    if (!msg) return;
    history.push({ role: 'user', text: msg, ts: Date.now() });
    addMsg('user', msg);
    save();
    var typing = showTyping();
    var started = Date.now();
    var msgs = [];
    history.slice(-20).forEach(function (m) {
      msgs.push({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.text });
    });
    aiReply(msgs, function (reply) {
      var wait = Math.max(0, 700 - (Date.now() - started));
      setTimeout(function () {
        typing.remove();
        var text = reply || botReply(replyTo(msg));
        history.push({ role: 'bot', text: text, ts: Date.now() });
        addMsg('bot', text);
        save();
      }, wait);
    });
  }

  function renderChips() {
    chipsEl.innerHTML = '';
    I18N[lang()].chips.forEach(function (label) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'chat-chip';
      b.textContent = label;
      b.addEventListener('click', function () {
        input.value = label;
        send(label);
      });
      chipsEl.appendChild(b);
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    send(input.value);
    input.value = '';
    input.focus();
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      history = [];
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      renderHistory();
      input.focus();
    });
  }

  if (transcriptBtn) {
    transcriptBtn.addEventListener('click', function () {
      var lines = history.map(function (m) {
        return (m.role === 'user' ? '> ' : 'Taraz: ') + m.text;
      }).join('\n');
      var subject = lang() === 'fa' ? 'گفتگوی سایت تاراز' : 'Chat transcript from taraz.studio';
      window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines);
    });
  }

  var langObserver = new MutationObserver(renderChips);
  langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  renderHistory();
  if (window.matchMedia && window.matchMedia('(min-width: 768px)').matches) {
    input.focus();
  }
})();
