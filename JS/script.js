/* ============================
  Optimized script.js
  - Lightweight, safe, and modular
  - Handles: menu toggle, search, auth, theme, glow, hero rotator
  ============================ */

/* ---------------------------
  Load navbar & footer (jQuery)
  ---------------------------- */
$(function () {
  $("#header").load("navbar.html", function () {
    setupMenuToggle();
    setupSearchBar();
    setupAuthButton();
  });
  $("#footer").load("footer.html");
});

/* ---------------------------
  NAVBAR: Menu toggle
  ---------------------------- */
function setupMenuToggle() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  if (!hamburger || !navLinks) return;

  // Prevent double-binding
  const clonedHamburger = hamburger.cloneNode(true);
  hamburger.parentNode.replaceChild(clonedHamburger, hamburger);

  clonedHamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    const icon = clonedHamburger.querySelector("i");
    if (icon) {
      icon.classList.toggle("fa-xmark");
      icon.classList.toggle("fa-bars");
    }
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("show"));
  });
}

/* ---------------------------
  Search Bar
  ---------------------------- */
function setupSearchBar() {
  const searchInput = document.getElementById("searchInput") || document.querySelector(".search-box input");
  const searchIcon = document.getElementById("searchIcon") || document.querySelector(".search-box i");
  if (!searchInput || !searchIcon) return;

  const doSearch = () => {
    const query = searchInput.value.trim();
    if (!query) return;
    localStorage.setItem("searchQuery", query.toLowerCase());
    window.location.href = "search.html";
  };

  const clonedIcon = searchIcon.cloneNode(true);
  searchIcon.parentNode.replaceChild(clonedIcon, searchIcon);

  clonedIcon.addEventListener("click", doSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") doSearch();
  });
}

/* ---------------------------
  Auth Button
  ---------------------------- */
function setupAuthButton() {
  const auth = document.getElementById("authButton");
  if (!auth) return;

  const newAuth = auth.cloneNode(true);
  auth.parentNode.replaceChild(newAuth, auth);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (isLoggedIn) {
    newAuth.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i> Logout';
    newAuth.href = "#";
    newAuth.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.setItem("isLoggedIn", "false");
      showPopup("Logged out", "fa-right-from-bracket");
      setTimeout(() => (window.location.href = "login.html"), 300);
    });
  } else {
    newAuth.innerHTML = '<i class="fa-solid fa-user"></i> Login';
    newAuth.href = "login.html";
  }
}

/* ---------------------------
  Utility: Popup Message
  ---------------------------- */
function showPopup(text, iconClass = "fa-circle-check", isError = false) {
  const msg = document.createElement("div");
  msg.className = "popup-message";
  msg.innerHTML = `<i class="fa-solid ${iconClass}"></i><p>${text}</p>`;
  Object.assign(msg.style, {
    position: "fixed",
    right: "20px",
    bottom: "20px",
    padding: "10px 14px",
    borderRadius: "10px",
    zIndex: 99999,
    background: isError ? "#ff7b7b" : "rgba(255,255,255,0.05)",
    color: isError ? "#111" : "#fff",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  });
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 2200);
}

/* ---------------------------
  Utility: Escape HTML
  ---------------------------- */
function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ---------------------------
  Theme Toggle (delegated)
  ---------------------------- */
document.addEventListener("click", (e) => {
  const t = e.target.closest("#themeToggle");
  if (!t) return;
  document.body.classList.toggle("light-mode");
  const icon = t.querySelector("i");
  if (icon) {
    icon.classList.toggle("fa-sun");
    icon.classList.toggle("fa-moon");
  }
});

/* ---------------------------
  Button Glow (delegated)
  ---------------------------- */
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn.small");
  if (!btn) return;

  btn.classList.add("active-glow");
  setTimeout(() => btn.classList.remove("active-glow"), 1600);

  if (btn.tagName.toLowerCase() === "button" && !btn.classList.contains("no-prevent")) {
    e.preventDefault();
  }
});

/* ---------------------------
  Hero Rotator
  ---------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const heroImg = document.getElementById("heroImg");
  if (!heroImg) return;

  const imgs = [
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1758626036095-676b425c4288?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1171",
    "https://images.unsplash.com/photo-1666597107756-ef489e9f1f09?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1332",
    "https://cdn.prod.website-files.com/65dcd1b152c7cc7a4fc810f5/66573d07550c6bff181c8203_Robot%20Artist.webp",
    "https://tecnosoluciones.com/wp-content/uploads/2023/12/como-crear-imagenes-con-ChatGPT.png"
  ];

  let i = 0;
  setInterval(() => {
    i = (i + 1) % imgs.length;
    heroImg.style.opacity = 0;
    setTimeout(() => {
      heroImg.src = imgs[i];
      heroImg.style.opacity = 1;
    }, 350);
  }, 2200);
});


/* ---------------------------
  Community Counter (light)
  ---------------------------- */
(function communityCounter() {
  document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".community-info");
    if (!container) return;

    let count = Number(localStorage.getItem("communityMembers")) || 1500;
    let el = container.querySelector(".member-counter");
    if (!el) {
      el = document.createElement("p");
      el.className = "member-counter";
      container.appendChild(el);
    }
    el.textContent = `👥 ${count} members already joined!`;

    const buttons = container.querySelectorAll(".community-btn");
    if (!buttons.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        count++;
        localStorage.setItem("communityMembers", count);
        el.textContent = `👥 ${count} members already joined!`;
        showPopup("Welcome to the Community! 🎉", "fa-circle-check");
      });
    });
  });
})();

/* ---------------------------
  Newsletter Lightweight Validation
  ---------------------------- */
(function newsletter() {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("newsletterForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = (document.getElementById("newsletterEmail") || {}).value?.trim() || "";
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!isValid) {
        showPopup("Please enter a valid email.", "fa-exclamation-circle", true);
        return;
      }
      showPopup("Thanks! You're subscribed 🚀", "fa-paper-plane");
      form.reset();
    });
  });
})();

/* ---------------------------
  Testimonials (Slider + Add Review)
  ---------------------------- */
(function testimonials() {
  document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".testimonial-container");
    if (!container) return;

    const nextBtn = container.querySelector(".next");
    const prevBtn = container.querySelector(".prev");

    function getCards() {
      return Array.from(container.querySelectorAll(".testimonial-card"));
    }

    let idx = 0;
    function show(index) {
      const cards = getCards();
      if (!cards.length) return;
      index = ((index % cards.length) + cards.length) % cards.length;
      idx = index;
      cards.forEach((c, i) => c.classList.toggle("active", i === index));
    }

    if (nextBtn) nextBtn.addEventListener("click", () => show(idx + 1));
    if (prevBtn) prevBtn.addEventListener("click", () => show(idx - 1));
    setInterval(() => show(idx + 1), 6000);

    // Load saved reviews
    const saved = JSON.parse(localStorage.getItem("userReviews") || "[]");
    const anchor = nextBtn || container.lastElementChild;
    if (saved.length && anchor) {
      saved.forEach((r) => {
        const div = document.createElement("div");
        div.className = "testimonial-card";
        div.innerHTML = `
          <img src="https://i.pravatar.cc/100?u=${encodeURIComponent(r.name)}" alt="${escapeHtml(r.name)}">
          <h3>${escapeHtml(r.name)}</h3>
          <span>${escapeHtml(r.role)}</span>
          <p>"${escapeHtml(r.message)}"</p>
          <div class="stars">${escapeHtml(r.rating)}</div>
        `;
        container.insertBefore(div, anchor);
      });
    }
    show(0);

    // Add new review
    const reviewForm = document.getElementById("reviewForm");
    if (!reviewForm) return;

    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = (document.getElementById("name") || {}).value?.trim() || "";
      const role = (document.getElementById("role") || {}).value?.trim() || "";
      const message = (document.getElementById("message") || {}).value?.trim() || "";
      const rating = (document.getElementById("rating") || {}).value || "";

      if (!name || !role || !message || !rating) {
        showPopup("Please fill all review fields.", "fa-exclamation-triangle", true);
        return;
      }

      if (!anchor) {
        showPopup("Error: testimonial area not found.", "fa-xmark", true);
        return;
      }

      const newCard = document.createElement("div");
      newCard.className = "testimonial-card";
      newCard.innerHTML = `
        <img src="https://i.pravatar.cc/100?u=${encodeURIComponent(name)}" alt="${escapeHtml(name)}">
        <h3>${escapeHtml(name)}</h3>
        <span>${escapeHtml(role)}</span>
        <p>"${escapeHtml(message)}"</p>
        <div class="stars">${escapeHtml(rating)}</div>
      `;
      container.insertBefore(newCard, anchor);

      const stored = JSON.parse(localStorage.getItem("userReviews") || "[]");
      stored.push({ name, role, message, rating });
      localStorage.setItem("userReviews", JSON.stringify(stored));

      reviewForm.reset();
      show(getCards().length - 1);
      showPopup("Thanks — your review is live!", "fa-circle-check");
    });
  });
})();

(function promptsLibrary() {
  const PROMPTS = [
    { id: "p1", title: "YouTube Video Idea Generator", category: "youtube", desc: "Generate fresh video ideas + short outlines for any topic.", prompt: "Generate 10 YouTube video ideas about {topic} with a 2-sentence hook and 5-point outline for each." },
    { id: "p2", title: "ChatGPT Improve Email", category: "chatgpt", desc: "Rewrite and improve email tone for professional delivery.", prompt: "Rewrite the following email to sound more professional and concise: {email_text}" },
    { id: "p3", title: "Code Debug Helper", category: "coding", desc: "Explain and fix bugs in the provided code snippet.", prompt: "Find bug(s) and explain how to fix this JavaScript code: {code_snippet}" },
    { id: "p4", title: "Midjourney Art Prompt", category: "art", desc: "High-detail image prompt for sci-fi environment renders.", prompt: "A hyper-detailed sci-fi city at sunset, neon reflections, cinematic lighting, ultra-detailed --v 5 --ar 16:9" },
    { id: "p5", title: "Blog Post Outline", category: "writing", desc: "Create a detailed blog outline with SEO headings and meta description.", prompt: "Create a detailed blog post outline on '{topic}' with headings, subheadings, and a meta description under 160 characters." }
  ];

  const LS_FAVORITES = "cwdb_favorites_v1";
  const LS_EXPANSIONS = "cwdb_expanded_prompts";

  document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("promptGrid");
    const searchInput = document.getElementById("promptSearch");
    const filterRow = document.getElementById("filterRow");
    const clearSearch = document.getElementById("clearSearch");
    const favToggle = document.getElementById("showFavoritesToggle");

    if (!grid) return;

    const readFavorites = () => JSON.parse(localStorage.getItem(LS_FAVORITES) || "[]");
    const saveFavorites = (arr) => localStorage.setItem(LS_FAVORITES, JSON.stringify(arr));
    const isFav = (id) => readFavorites().includes(id);
    const toggleFav = (id) => {
      const favs = readFavorites();
      const updated = favs.includes(id) ? favs.filter(x => x !== id) : [...favs, id];
      saveFavorites(updated);
      return updated.includes(id);
    };

    const readExpansions = () => JSON.parse(localStorage.getItem(LS_EXPANSIONS) || "{}");
    const saveExpansion = (id, text) => {
      const db = readExpansions();
      db[id] = text;
      localStorage.setItem(LS_EXPANSIONS, JSON.stringify(db));
    };

    function renderCard(item) {
      const card = document.createElement("div");
      card.className = "prompt-card";
      card.dataset.cat = item.category;
      card.dataset.id = item.id;

      const expanded = readExpansions()[item.id] || item.prompt;

      card.innerHTML = `
        <div class="top">
          <div class="card-icon"><i class="fa-solid fa-bolt"></i></div>
          <div style="flex:1">
            <h3>${escapeHtml(item.title)}</h3>
            <p class="desc">${escapeHtml(item.desc)}</p>
          </div>
        </div>
        <pre class="prompt-text">${escapeHtml(expanded)}</pre>
        <div class="card-actions">
          <div class="left">
            <button class="btn-copy" data-id="${item.id}" title="Copy prompt"><i class="fa-solid fa-copy"></i> Copy</button>
            <a class="btn-open" href="#" data-id="${item.id}" title="Open prompt">Open</a>
          </div>
          <div>
            <button class="favorite-btn" data-id="${item.id}" title="Favorite">
              <i class="${isFav(item.id) ? 'fa-solid fa-star' : 'fa-regular fa-star'}"></i>
            </button>
          </div>
        </div>
        <div class="copied-badge" style="display:none;">COPIED</div>
      `;
      attachCardEvents(card, item);
      return card;
    }

    function attachCardEvents(card, item) {
      const copyBtn = card.querySelector(".btn-copy");
      const openBtn = card.querySelector(".btn-open");
      const favBtn = card.querySelector(".favorite-btn");
      const badge = card.querySelector(".copied-badge");
      const promptText = card.querySelector(".prompt-text").textContent;

      copyBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
          await navigator.clipboard.writeText(promptText);
        } catch {
          const ta = document.createElement("textarea");
          ta.value = promptText;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          ta.remove();
        }
        badge.style.display = "inline-block";
        setTimeout(() => (badge.style.display = "none"), 1200);
        showPopup("Prompt copied to clipboard", "fa-copy");
      });

      openBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const input = prompt("Customize this prompt:\n" + item.prompt);
        if (input) {
          saveExpansion(item.id, input);
          applyFilters();
          showPopup("Prompt customized and saved!", "fa-wand-magic-sparkles");
        }
      });

      favBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const now = toggleFav(item.id);
        favBtn.innerHTML = `<i class="${now ? "fa-solid fa-star" : "fa-regular fa-star"}"></i>`;
        showPopup(now ? "Added to favorites" : "Removed from favorites", "fa-star");
        if (favToggle?.classList.contains("active")) applyFilters();
      });
    }

    function renderList(list) {
      grid.innerHTML = "";
      if (!list.length) {
        grid.innerHTML = `<div class="empty-state">No prompts found. Try another keyword or category.</div>`;
        return;
      }
      const frag = document.createDocumentFragment();
      list.forEach(p => frag.appendChild(renderCard(p)));
      grid.appendChild(frag);
    }

    function applyFilters() {
      const q = (searchInput?.value || "").toLowerCase().trim();
      const activeBtn = document.querySelector(".filter-btn.active");
      const cat = activeBtn?.dataset.cat || "all";
      const favoritesOnly = favToggle?.classList.contains("active");
      const favs = readFavorites();

      const filtered = PROMPTS.filter(p => {
        if (favoritesOnly && !favs.includes(p.id)) return false;
        if (cat !== "all" && p.category !== cat) return false;
        if (!q) return true;
        const hay = (p.title + " " + p.desc + " " + p.prompt + " " + p.category).toLowerCase();
        return hay.includes(q);
      });
      renderList(filtered);
    }

    renderList(PROMPTS.slice());

    filterRow?.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilters();
    });

    searchInput?.addEventListener("input", applyFilters);
    clearSearch?.addEventListener("click", () => {
      if (searchInput) {
        searchInput.value = "";
        applyFilters();
      }
    });

    favToggle?.addEventListener("click", () => {
      favToggle.classList.toggle("active");
      applyFilters();
    });
  });

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();


document.addEventListener("DOMContentLoaded", () => {
  /* ---------------------------
    Escape HTML Utility
  ---------------------------- */
  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* ---------------------------
    SEARCH PAGE: Read Query & Show Results
  ---------------------------- */
  const resultsBox = document.getElementById("results");
  const display = document.getElementById("searchQueryDisplay");

  if (resultsBox && display) {
    const raw = localStorage.getItem("searchQuery") || "";
    const q = raw.trim().toLowerCase();

    if (!q) {
      display.innerHTML = "No search query found.";
    } else {
      display.innerHTML = `Results for "<b>${escapeHtml(q)}</b>"`;

      const pages = [
        { name: "Home", file: "index.html" },
        { name: "About", file: "about.html" },
        { name: "Prompts", file: "prompts.html" },
        { name: "Tools", file: "tools.html" },
        { name: "Tutorials", file: "tutorials.html" },
        { name: "Community", file: "community.html" },
        { name: "Contact", file: "contact.html" }
      ];

      (async () => {
        const found = [];
        for (const p of pages) {
          try {
            const res = await fetch(p.file);
            const text = await res.text();
            if (text.toLowerCase().includes(q)) found.push(p);
          } catch {
            // Ignore fetch errors (e.g., local dev 404)
          }
        }

        resultsBox.innerHTML = found.length
          ? found.map(r => `
              <div class="result-card">
                <h3>${escapeHtml(r.name)}</h3>
                <p>Content match found in ${escapeHtml(r.file)}</p>
                <a href="${escapeHtml(r.file)}" class="visit-btn">View Page</a>
              </div>`).join("")
          : `<p>No results found for "<b>${escapeHtml(q)}</b>".</p>`;
      })();
    }
  }

  /* ---------------------------
    SIGNUP / LOGIN (localStorage)
  ---------------------------- */
  const signupBtn = document.getElementById("signupBtn");
  const loginBtn = document.getElementById("loginBtn");

  if (signupBtn) {
    signupBtn.addEventListener("click", () => {
      const name = document.getElementById("name")?.value.trim() || "";
      const email = document.getElementById("email")?.value.trim() || "";
      const password = document.getElementById("password")?.value.trim() || "";

      if (!name || !email || !password) {
        showPopup("Please fill out all fields.", "fa-exclamation-triangle", true);
        return;
      }

      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);
      showPopup("Signup successful! Please login now.", "fa-circle-check");
      setTimeout(() => (window.location.href = "login.html"), 700);
    });
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const email = document.getElementById("email")?.value.trim() || "";
      const password = document.getElementById("password")?.value.trim() || "";
      const remember = document.getElementById("rememberMe")?.checked || false;

      const savedEmail = localStorage.getItem("userEmail");
      const savedPassword = localStorage.getItem("userPassword");

      if (email === savedEmail && password === savedPassword) {
        localStorage.setItem("isLoggedIn", "true");
        if (remember) localStorage.setItem("rememberMe", "true");
        showPopup("Login successful! Redirecting...", "fa-circle-check");
        setTimeout(() => (window.location.href = "index.html"), 700);
      } else {
        showPopup("Invalid email or password!", "fa-xmark", true);
      }
    });
  }

  // Ensure auth button reflects login state
  setupAuthButton();

  /* ---------------------------
    Safety: Prevent Overlays from Blocking Clicks
  ---------------------------- */
  document.querySelectorAll(".ai-universe-overlay, .floating-orbs span").forEach(el => {
    el.style.pointerEvents = "none";
  });
});

/* ============================
  HUMAN-LIKE AI CONTACT ASSISTANT
  ============================ */
document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chatForm");
  const chatBox = document.getElementById("chatBox");
  const userInput = document.getElementById("userInput");

  if (!chatForm || !chatBox || !userInput) return;

  const greetings = [
    "Hey there! 👋 I'm DB, your friendly AI assistant. How can I help you today?",
    "Hi! 😊 I’m DB — your guide to AIPromptsByDB. Want to explore tools, prompts, or tutorials?",
    "Hello friend! 💬 Need help with prompts, AI tools, or login issues?"
  ];

  const memory = [];
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
  appendMessage("bot", randomGreeting);

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userText = userInput.value.trim();
    if (!userText) return;

    appendMessage("user", userText);
    memory.push({ role: "user", text: userText });
    userInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
      showTyping();
      setTimeout(() => {
        const botReply = getSmartResponse(userText);
        appendMessage("bot", botReply);
        memory.push({ role: "bot", text: botReply });
        chatBox.scrollTop = chatBox.scrollHeight;
      }, 1000);
    }, 400);
  });

  function appendMessage(sender, text) {
    const div = document.createElement("div");
    div.className = sender === "user" ? "user-message" : "bot-message";
    div.innerText = text;
    chatBox.appendChild(div);
  }

  function showTyping() {
    const typing = document.createElement("div");
    typing.className = "bot-message typing";
    typing.innerText = "DB is typing...";
    chatBox.appendChild(typing);
    setTimeout(() => typing.remove(), 900);
  }

  function getSmartResponse(input) {
    const msg = input.toLowerCase();

    const responses = [
      { keywords: ["hi", "hello", "hey", "salam"], reply: "Hi there! 👋 I’m DB — here to help you explore prompts, tools, and tutorials." },
      { keywords: ["about"], reply: "AIPromptsByDB is a futuristic platform that helps creators, developers, and AI lovers find the best prompts, tools, and learning resources." },
      { keywords: ["tools", "ai tools"], reply: "🧰 We’ve got tools like ChatGPT, Gemini, Midjourney, Claude, Leonardo AI, and Runway ML — all linked in the ‘AI Tools’ section." },
      { keywords: ["prompt", "prompts"], reply: "💡 Our Prompts section has ready-made prompts for ChatGPT, YouTube, coding, art, and writing. You can search, copy, and save your favorites!" },
      { keywords: ["tutorial"], reply: "📚 You can visit the Tutorials section to learn how to use AI tools, write better prompts, and grow your skills." },
      { keywords: ["community"], reply: "👥 Our AI Community lets you join Discord or WhatsApp groups to connect with other creators, share ideas, and collaborate!" },
      { keywords: ["contact", "email"], reply: "📩 You can contact us through this page or email us at contact@aipromptsbydb.com." },
      { keywords: ["login", "signup", "account"], reply: "🔐 You can log in or sign up using the button at the top-right corner of any page." },
      { keywords: ["newsletter", "subscribe"], reply: "📰 You can subscribe at the bottom of the page to receive weekly AI tips and prompts." },
      { keywords: ["who made", "owner", "db"], reply: "💚 AIPromptsByDB was crafted with passion and creativity by DB — the mind behind this entire platform." },
      { keywords: ["what is", "aipromptsbydb"], reply: "✨ AIPromptsByDB is a website that provides creative AI prompts, free tools, tutorials, and a growing AI community — designed to boost your productivity and creativity." }
    ];

    for (const r of responses) {
      if (r.keywords.some(k => msg.includes(k))) return r.reply;
    }

    const fallback = [
      "Haha 😄 that’s an interesting question! I’ll learn to answer that soon.",
      "Hmm 🤔 I’m still thinking about that… try asking me about our prompts, tools, or tutorials.",
      "I'm not sure about that, but I can tell you everything about AIPromptsByDB!",
      "Good one 😅! Maybe check the About or Tools section for more details."
    ];
    return fallback[Math.floor(Math.random() * fallback.length)];
  }
});

/* ============================
  CONTACT FORM VALIDATION
  ============================ */
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact-form form");
  const successMsg = document.getElementById("formSuccess");

  if (!contactForm || !successMsg) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    clearErrors();

    const name = contactForm.querySelector('input[name="name"]');
    const email = contactForm.querySelector('input[name="email"]');
    const subject = contactForm.querySelector('input[name="subject"]');
    const message = contactForm.querySelector('textarea[name="message"]');

    if (name.value.trim().length < 2) {
      showError(name, "Please enter your full name.");
      valid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showError(email, "Please enter a valid email address.");
      valid = false;
    }

    if (subject.value.trim().length < 3) {
      showError(subject, "Subject should be at least 3 characters long.");
      valid = false;
    }

    if (message.value.trim().length < 10) {
      showError(message, "Message must be at least 10 characters long.");
      valid = false;
    }

    if (valid) {
      successMsg.innerText = "✅ Your message has been sent successfully!";
      successMsg.style.display = "block";
      contactForm.reset();
    }
  });

  function showError(input, message) {
    const error = document.createElement("small");
    error.classList.add("error-message");
    error.innerText = message;
    input.parentElement.appendChild(error);
    input.style.borderColor = "#ff4444";
  }

  function clearErrors() {
    document.querySelectorAll(".error-message").forEach(e => e.remove());
    document.querySelectorAll(".contact-form input, .contact-form textarea").forEach(i => {
      i.style.borderColor = "#333";
    });
    successMsg.style.display = "none";
  }
});

/* ============================
  NEWSLETTER FORM VALIDATION
  ============================ */
$(document).on("submit", "#footerNewsletterForm", function (e) {
  e.preventDefault();

  const emailInput = document.getElementById("footerEmail");
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: "Please enter your email before subscribing.",
      confirmButtonColor: "#00ffc3",
      background: "#0a0f1f",
      color: "#fff"
    });
    return;
  }

  if (!emailRegex.test(email)) {
    Swal.fire({
      icon: "warning",
      title: "Invalid Email",
      text: "Please enter a valid email address.",
      confirmButtonColor: "#00ffc3",
      background: "#0a0f1f",
      color: "#fff"
    });
    return;
  }

  setTimeout(() => {
    Swal.fire({
      icon: "success",
      title: "You're Subscribed! 🎉",
      text: "Thank you for joining our newsletter. Stay tuned for AI updates!",
      confirmButtonText: "Awesome!",
      confirmButtonColor: "#00ffc3",
      background: "#0a0f1f",
      color: "#fff"
    });
    emailInput.value = "";
  }, 500);
});

/* ============================
  End of optimized script.js
  ============================ */
