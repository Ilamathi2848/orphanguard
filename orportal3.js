// Premium frontend JS - orportal3.js
// Browser-only code. Make sure backend runs at http://localhost:5000

const API_BASE = "http://localhost:5000"; // <-- change if your backend uses a different host/port
const params = new URLSearchParams(window.location.search);
const id = params.get("id") || "sunshine-home";
const API = `http://localhost:5000/api/orphanages/${id}`;


const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("fetch failed");
  return res.json();
}

async function init() {
  try {
    const data = await fetchJson(API);
    bindData(data);
  } catch (err) {
    console.warn("API failed, trying local fallback (if present).", err);
    try {
      // optional local fallback file (not required)
      const data = await fetchJson("sample-orphanage-final.json");
      bindData(data);
    } catch (e) {
      console.error("Failed to load data", e);
      $("#main").innerHTML =
        '<p style="padding:24px">Unable to load data. Try again later.</p>';
    }
  }
}

function bindData(data) {
  // Basic fields
  $("#orphanage-name").textContent = data.name || "Unnamed";
  $("#orphanage-subtitle").textContent =
    data.tagline || `${data.location || ""} ${data.established ? "• Est. " + data.established : ""}`;

  // Stats
  $("#stat-children").textContent = data.counts?.children ?? "—";
  $("#stat-volunteers").textContent = data.counts?.volunteers ?? "—";
  $("#stat-staff").textContent = data.counts?.staff ?? "—";
  $("#stat-facilities").textContent = (data.facilities || []).length;

  // About
  $("#about-text").textContent = data.description || "";

  // Quick info
  $("#contact-location").textContent = data.location || "—";
  $("#established").textContent = data.established ?? "—";
  $("#contact-hours").textContent = data.visitingHours || "—";
  const phone = data.phone || "";
  if (phone) {
    $("#contact-phone").textContent = phone;
    $("#contact-phone").href = `tel:${phone.replace(/\s+/g, "")}`;
  } else $("#contact-phone").textContent = "—";

  const email = data.email || "";
  if (email) {
    $("#contact-email").textContent = email;
    $("#contact-email").href = `mailto:${email}`;
  } else $("#contact-email").textContent = "—";

  // Cover photo
  if (data.coverImage) $("#cover-photo").style.backgroundImage = `url('${data.coverImage}')`;
  else $("#cover-photo").style.backgroundImage = `linear-gradient(135deg,#ffecec,#fff)`;

  // Facilities list
  const fl = $("#facilities-list");
  fl.innerHTML = "";
  (data.facilities || []).forEach((f) => {
    const li = document.createElement("li");
    li.textContent = f;
    fl.appendChild(li);
  });

  // Children cards
  const cg = $("#children-grid");
  cg.innerHTML = "";
  (data.children || []).forEach((ch) => {
    const card = document.createElement("article");
    card.className = "child-card";

    const img = document.createElement("div");
    img.className = "child-img";
    img.style.backgroundImage = `url('${ch.photo || "/images/child-placeholder.jpg"}')`;
    img.dataset.consent = ch.consentForPublishing ? "true" : "false";

    const info = document.createElement("div");
    info.className = "child-info";
    info.innerHTML = `<h4>${ch.firstName || "Child"} • ${ch.age ? ch.age + " yrs" : ""}</h4><p class="muted">${ch.shortBio || ""}</p>`;

    card.appendChild(img);
    card.appendChild(info);

    card.addEventListener("click", () => openChildModal(ch));
    cg.appendChild(card);
  });

  // Gallery
  const gallery = $("#gallery");
  gallery.innerHTML = "";
  (data.gallery || []).forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = data.name + " gallery";
    img.loading = "lazy";
    img.addEventListener("click", () => openLightbox(src));
    gallery.appendChild(img);
  });

  // Map embed
  $("#map-frame").src = data.locationMapEmbed || `https://www.google.com/maps?q=${encodeURIComponent(data.location || "")}&output=embed`;

  // Donation
  $("#donation-text").textContent = data.donationIntro || "";
  const du = $("#donation-usage");
  if (du) {
    du.innerHTML = "";
    (data.donationBreakdown || []).forEach((x) => {
      const li = document.createElement("li");
      li.textContent = x;
      du.appendChild(li);
    });
  }

  // Volunteer intro
  $("#volunteer-text").textContent = data.volunteerIntro || "";

  // Copy contact
  $("#copy-contact").addEventListener("click", () => {
    const txt = `${data.name}\n${data.location || ""}\nPhone: ${data.phone || "—"}\nEmail: ${data.email || "—"}`;
    navigator.clipboard?.writeText(txt).then(() => {
      $("#copy-contact").textContent = "Copied!";
      setTimeout(() => ($("#copy-contact").textContent = "Copy Contact"), 1500);
    }).catch(() => alert("Copy not supported"));
  });

  // Donate demo
  $("#donate-now").addEventListener("click", () => {
    const amt = Number($("#donation-amount").value) || 500;
    alert(`Demo donation: ₹${amt}. Integrate payment gateway for real payments.`);
  });

  // Blur toggle setup
  const blurToggle = $("#toggle-blur");
  blurToggle.checked = true;
  blurToggle.addEventListener("change", () => applyFaceBlur(blurToggle.checked));
  const anyConsent = (data.children || []).some((c) => c.consentForPublishing);
  if (!anyConsent) {
    blurToggle.checked = true;
    blurToggle.disabled = true;
    blurToggle.parentElement.title = "No photos available for publishing";
  }
  applyFaceBlur(true);

  // Lightbox handlers
  document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  $("#lightbox").addEventListener("click", (e) => {
    if (e.target.id === "lightbox") closeLightbox();
  });
}

function applyFaceBlur(shouldBlur) {
  $$(".child-img").forEach((el) => {
    const consent = el.dataset.consent === "true";
    if (shouldBlur && !consent) el.style.filter = "blur(6px)";
    else el.style.filter = "none";
  });
}

function openLightbox(src) {
  $("#lightbox-img").src = src;
  $("#lightbox").style.display = "flex";
  $("#lightbox").setAttribute("aria-hidden", "false");
}
function closeLightbox() {
  $("#lightbox").style.display = "none";
  $("#lightbox").setAttribute("aria-hidden", "true");
  $("#lightbox-img").src = "";
}
function openChildModal(child) {
  const msg = `Name: ${child.firstName || "—"}\nAge: ${child.age || "—"}\nInterests: ${child.interests || "—"}\n\n${child.shortBio || ""}`;
  alert(msg);
}

// Start
init();
