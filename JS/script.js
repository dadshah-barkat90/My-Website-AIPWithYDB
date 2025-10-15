// ========== MENU TOGGLE ==========
function setupMenuToggle() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    const icon = hamburger.querySelector("i");
    if (icon) {
      icon.classList.toggle("fa-xmark");
      icon.classList.toggle("fa-bars");
    }
  });
$(function () {
  $("#header").load("navbar.html", function () {
    setupMenuToggle();
    setupSearchBar(); // keep your search working
  });
  $("#footer").load("footer.html");
});

  // Optional: close menu on link click
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("show"));
  });
}

/* ============================
  optimized script.js
  - safe, consolidated, and lightweight
  - keeps: menu, search, auth, prompts, testimonials, newsletter, hero rotator
  - removes heavy / redundant animations
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
  Utility helpers
  ---------------------------- */
function showPopup(text, iconClass = "fa-circle-check", isError = false) {
  const msg = document.createElement("div");
  msg.className = "popup-message";
  msg.innerHTML = `<i class="fa-solid ${iconClass}"></i><p>${text}</p>`;
  // Minimal inline styling so popup always visible even if CSS missing
  msg.style.position = "fixed";
  msg.style.right = "20px";
  msg.style.bottom = "20px";
  msg.style.padding = "10px 14px";
  msg.style.borderRadius = "10px";
  msg.style.zIndex = 99999;
  msg.style.background = isError ? "#ff7b7b" : "rgba(255,255,255,0.05)";
  msg.style.color = isError ? "#111" : "#fff";
  msg.style.display = "flex";
  msg.style.alignItems = "center";
  msg.style.gap = "10px";
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 2200);
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ---------------------------
  NAVBAR: Menu toggle, Search, Auth
  (these run after navbar.html is loaded)
  ---------------------------- */
function setupMenuToggle() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  if (!hamburger || !navLinks) return;

  // ensure we don't double-bind if called multiple times
  hamburger.replaceWith(hamburger.cloneNode(true));
  const newHamburger = document.getElementById("hamburger");

  newHamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    const icon = newHamburger.querySelector("i");
    if (icon) {
      icon.classList.toggle("fa-xmark");
      icon.classList.toggle("fa-bars");
    }
  });

  // close menu when a link clicked
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("show"));
  });
}

function setupSearchBar() {
  // Prefer IDs; fall back to .search-box markup if IDs are not present
  const searchInput = document.getElementById("searchInput") || document.querySelector(".search-box input");
  const searchIcon = document.getElementById("searchIcon") || document.querySelector(".search-box i");
  if (!searchInput || !searchIcon) return;

  const doSearch = () => {
    const q = (searchInput.value || "").trim();
    if (!q) return;
    localStorage.setItem("searchQuery", q.toLowerCase());
    window.location.href = "search.html";
  };

  // remove previous handlers by cloning if necessary
  searchIcon.replaceWith(searchIcon.cloneNode(true));
  const newSearchIcon = document.getElementById("searchIcon") || document.querySelector(".search-box i");

  newSearchIcon.addEventListener("click", doSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") doSearch();
  });
}

function setupAuthButton() {
  const auth = document.getElementById("authButton");
  if (!auth) return;

  // replace node to remove duplicate listeners
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
  Theme toggle (delegated)
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
  Safe .btn.small glow (delegated)
  - does NOT block <a> navigation
  ---------------------------- */
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn.small");
  if (!btn) return;

  btn.classList.add("active-glow");
  setTimeout(() => btn.classList.remove("active-glow"), 1600);

  // if it's a button element, prevent default only when it's not a submit
  if (btn.tagName.toLowerCase() === "button" && !btn.classList.contains("no-prevent")) {
    e.preventDefault();
  }
});

/* ---------------------------
  HERO ROTATOR (kept; lightweight)
  ---------------------------- */
(function heroRotator() {
  document.addEventListener("DOMContentLoaded", () => {
    const heroImg = document.getElementById("heroImg");
    if (!heroImg) return;
    const imgs = [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1758626036095-676b425c4288?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171",
      "https://images.unsplash.com/photo-1666597107756-ef489e9f1f09?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332",
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
})();

/* ---------------------------
  Community counter (light)
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
    container.querySelectorAll(".community-btn").forEach((btn) => {
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
  Newsletter lightweight validation
  ---------------------------- */
(function newsletter() {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("newsletterForm");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = (document.getElementById("newsletterEmail") || {}).value?.trim() || "";
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showPopup("Please enter a valid email.", "fa-exclamation-circle", true);
        return;
      }
      showPopup("Thanks! You're subscribed 🚀", "fa-paper-plane");
      form.reset();
    });
  });
})();

/* ---------------------------
  Testimonials (slider + add review)
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

    // load saved reviews
    const saved = JSON.parse(localStorage.getItem("userReviews") || "[]");
    const anchor = nextBtn || null;
    if (saved.length && anchor) {
      saved.forEach(r => {
        const div = document.createElement("div");
        div.className = "testimonial-card";
        div.innerHTML = `
          <img src="=${encodeURIComponent(r.name)}" alt="${escapeHtml(r.name)}">
          <h3>${escapeHtml(r.name)}</h3>
          <span>${escapeHtml(r.role)}</span>
          <p>"${escapeHtml(r.message)}"</p>
          <div class="stars">${escapeHtml(r.rating)}</div>
        `;
        container.insertBefore(div, anchor);
      });
    }
    show(0);

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

/* ---------------------------
  Prompts library (only runs on prompts page)
  - render, search, filters, copy, favorites
  ---------------------------- */
(function promptsLibrary() {
  const PROMPTS = [
    { id: "p1", title: "YouTube Video Idea Generator", category: "youtube", desc: "Generate fresh video ideas + short outlines for any topic.", prompt: "Generate 10 YouTube video ideas about {topic} with a 2-sentence hook and 5-point outline for each." },
    { id: "p2", title: "ChatGPT Improve Email", category: "chatgpt", desc: "Rewrite and improve email tone for professional delivery.", prompt: "Rewrite the following email to sound more professional and concise: {email_text}" },
    { id: "p3", title: "Code Debug Helper", category: "coding", desc: "Explain and fix bugs in the provided code snippet.", prompt: "Find bug(s) and explain how to fix this JavaScript code: {code_snippet}" },
    { id: "p4", title: "Midjourney Art Prompt", category: "art", desc: "High-detail image prompt for sci-fi environment renders.", prompt: "A hyper-detailed sci-fi city at sunset, neon reflections, cinematic lighting, ultra-detailed --v 5 --ar 16:9" },
    { id: "p5", title: "Blog Post Outline", category: "writing", desc: "Create a detailed blog outline with SEO headings and meta description.", prompt: "Create a detailed blog post outline on '{topic}' with headings, subheadings, and a meta description under 160 characters." }
  ];

  document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("promptGrid");
    if (!grid) return;

    const searchInput = document.getElementById("promptSearch");
    const filterRow = document.getElementById("filterRow");
    const clearSearch = document.getElementById("clearSearch");
    const favToggle = document.getElementById("showFavoritesToggle");

    const LS_FAVORITES = "cwdb_favorites_v1";
    const readFavorites = () => JSON.parse(localStorage.getItem(LS_FAVORITES) || "[]");
    const saveFavorites = (arr) => localStorage.setItem(LS_FAVORITES, JSON.stringify(arr));
    const isFav = (id) => readFavorites().includes(id);
    const toggleFav = (id) => {
      const arr = readFavorites();
      if (arr.includes(id)) {
        const filtered = arr.filter(x => x !== id);
        saveFavorites(filtered);
        return false;
      } else {
        arr.push(id);
        saveFavorites(arr);
        return true;
      }
    };

    function renderCard(item) {
      const card = document.createElement("div");
      card.className = "prompt-card";
      card.dataset.cat = item.category;
      card.dataset.id = item.id;
      card.innerHTML = `
        <div class="top">
          <div class="card-icon"><i class="fa-solid fa-bolt"></i></div>
          <div style="flex:1">
            <h3>${escapeHtml(item.title)}</h3>
            <p class="desc">${escapeHtml(item.desc)}</p>
          </div>
        </div>
        <pre class="prompt-text">${escapeHtml(item.prompt)}</pre>
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
          badge.style.display = "inline-block";
          setTimeout(() => (badge.style.display = "none"), 1200);
          showPopup("Prompt copied to clipboard", "fa-copy");
        } catch (err) {
          const ta = document.createElement("textarea");
          ta.value = promptText;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          ta.remove();
          showPopup("Prompt copied to clipboard", "fa-copy");
        }
      });

      openBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showPopup("Open this prompt in your AI tool (paste it into ChatGPT).", "fa-rocket");
      });

      favBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const id = favBtn.dataset.id;
        const now = toggleFav(id);
        favBtn.innerHTML = `<i class="${now ? "fa-solid fa-star" : "fa-regular fa-star"}"></i>`;
        showPopup(now ? "Added to favorites" : "Removed from favorites", now ? "fa-star" : "fa-star");
        if (favToggle && favToggle.classList.contains("active")) applyFilters();
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
      const cat = activeBtn ? activeBtn.dataset.cat : "all";
      const favoritesOnly = favToggle && favToggle.classList.contains("active");
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

    // initial render
    renderList(PROMPTS.slice());

    // events
    if (filterRow) {
      filterRow.addEventListener("click", (e) => {
        const btn = e.target.closest(".filter-btn");
        if (!btn) return;
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        applyFilters();
      });
    }
    if (searchInput) searchInput.addEventListener("input", () => applyFilters());
    if (clearSearch) clearSearch.addEventListener("click", () => { if (searchInput) { searchInput.value = ""; applyFilters(); } });
    if (favToggle) favToggle.addEventListener("click", () => { favToggle.classList.toggle("active"); applyFilters(); });
  });
})();

/* ---------------------------
  SEARCH PAGE: read query & show results
  ---------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const resultsBox = document.getElementById("results");
  const display = document.getElementById("searchQueryDisplay");
  if (!resultsBox || !display) return;

  const raw = localStorage.getItem("searchQuery") || "";
  const q = (raw || "").trim().toLowerCase();
  if (!q) {
    display.innerHTML = "No search query found.";
    return;
  }

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
      } catch (err) {
        // ignore fetch errors (local dev might give 404)
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
});

/* ---------------------------
  SIGNUP / LOGIN (localStorage)
  ---------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  // Signup
  const signupBtn = document.getElementById("signupBtn");
  if (signupBtn) {
    signupBtn.addEventListener("click", () => {
      const name = (document.getElementById("name") || {}).value?.trim() || "";
      const email = (document.getElementById("email") || {}).value?.trim() || "";
      const password = (document.getElementById("password") || {}).value?.trim() || "";
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

  // Login
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const email = (document.getElementById("email") || {}).value?.trim() || "";
      const password = (document.getElementById("password") || {}).value?.trim() || "";
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

  // ensure auth button reflects state even if navbar not reloaded yet
  setupAuthButton();
});

/* ---------------------------
  Safety: ensure overlays don't block clicks (quick fallback)
  - Prefer adding pointer-events:none in CSS permanently
  ---------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".ai-universe-overlay, .floating-orbs span").forEach(el => {
    if (el) el.style.pointerEvents = "none";
  });
});
/* ====== HUMAN-LIKE AI CONTACT ASSISTANT ====== */
document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chatForm");
  const chatBox = document.getElementById("chatBox");
  const userInput = document.getElementById("userInput");

  if (!chatForm) return;

  // Greeting messages
  const greetings = [
    "Hey there! 👋 I'm DB, your friendly AI assistant. How can I help you today?",
    "Hi! 😊 I’m DB — your guide to AIPromptsByDB. Want to explore tools, prompts, or tutorials?",
    "Hello friend! 💬 Need help with prompts, AI tools, or login issues?"
  ];

  // Random welcome when page loads
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
  chatBox.innerHTML = `<div class="bot-message">${randomGreeting}</div>`;

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userText = userInput.value.trim();
    if (!userText) return;

    appendMessage("user", userText);
    userInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
      const botReply = getSmartResponse(userText);
      appendMessage("bot", botReply);
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 800);
  });

  function appendMessage(sender, text) {
    const div = document.createElement("div");
    div.className = sender === "user" ? "user-message" : "bot-message";
    div.textContent = text;
    chatBox.appendChild(div);
  }

  // 🔥 Smart responses based on your website
  function getSmartResponse(input) {
    const msg = input.toLowerCase();

    // Greetings
    if (/(hi|hello|hey|salam)/.test(msg))
      return "Hi there! 👋 I’m DB — here to help you explore prompts, tools, and tutorials.";

    // About section
    if (msg.includes("about"))
      return "AIPromptsByDB is a futuristic platform that helps creators, developers, and AI lovers find the best prompts, tools, and learning resources.";

    // Tools
    if (msg.includes("tools") || msg.includes("ai tools"))
      return "🧰 We’ve got tools like ChatGPT, Gemini, Midjourney, Claude, Leonardo AI, and Runway ML — all linked in the ‘AI Tools’ section.";

    // Prompts
    if (msg.includes("prompt") || msg.includes("prompts"))
      return "💡 Our Prompts section has ready-made prompts for ChatGPT, YouTube, coding, art, and writing. You can search, copy, and save your favorites!";

    // Tutorials
    if (msg.includes("tutorial"))
      return "📚 You can visit the Tutorials section to learn how to use AI tools, write better prompts, and grow your skills.";

    // Community
    if (msg.includes("community"))
      return "👥 Our AI Community lets you join Discord or WhatsApp groups to connect with other creators, share ideas, and collaborate!";

    // Contact
    if (msg.includes("contact") || msg.includes("email"))
      return "📩 You can contact us through this page or email us at contact@aipromptsbydb.com.";

    // Login/signup
    if (msg.includes("login") || msg.includes("signup") || msg.includes("account"))
      return "🔐 You can log in or sign up using the button at the top-right corner of any page.";

    // Newsletter
    if (msg.includes("newsletter") || msg.includes("subscribe"))
      return "📰 You can subscribe at the bottom of the page to receive weekly AI tips and prompts.";

    // Owner / creator
    if (msg.includes("who made") || msg.includes("owner") || msg.includes("db"))
      return "💚 AIPromptsByDB was crafted with passion and creativity by DB — the mind behind this entire platform.";

    // Website purpose
    if (msg.includes("what is") && msg.includes("aipromptsbydb"))
      return "✨ AIPromptsByDB is a website that provides creative AI prompts, free tools, tutorials, and a growing AI community — designed to boost your productivity and creativity.";

    // Funny or fallback
    const randomReplies = [
      "Haha 😄 that’s an interesting question! I’ll learn to answer that soon.",
      "Hmm 🤔 I’m still thinking about that… try asking me about our prompts, tools, or tutorials.",
      "I'm not sure about that, but I can tell you everything about AIPromptsByDB!",
      "Good one 😅! Maybe check the About or Tools section for more details."
    ];
    return randomReplies[Math.floor(Math.random() * randomReplies.length)];
  }
});
// ===== CONTACT FORM VALIDATION =====
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact-form form");
  const successMsg = document.getElementById("formSuccess");

  if (contactForm) {
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
      let error = document.createElement("small");
      error.classList.add("error-message");
      error.innerText = message;
      input.parentElement.appendChild(error);
      input.style.borderColor = "#ff4444";
    }

    function clearErrors() {
      document.querySelectorAll(".error-message").forEach((e) => e.remove());
      document
        .querySelectorAll(".contact-form input, .contact-form textarea")
        .forEach((i) => (i.style.borderColor = "#333"));
      successMsg.style.display = "none";
    }
  }
});
// Wait for footer to load dynamically first
// ✅ Newsletter form works across all pages (even with dynamic footer)
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

  // Optional: Simulate sending email
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
