// orphanage.js
(() => {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get('id') || 1);
  const nameEl = document.getElementById('o-name');
  const subEl = document.getElementById('o-sub');
  const coverEl = document.getElementById('cover-photo');
  const content = document.getElementById('content');

  const statChildren = document.getElementById('stat-children');
  const statVol = document.getElementById('stat-volunteers');
  const statStaff = document.getElementById('stat-staff');
  const statFac = document.getElementById('stat-facilities');

  document.getElementById('year2').textContent = new Date().getFullYear();

  let ORPH = null;

  fetch('orphanages.json')
    .then(r => { if(!r.ok) throw new Error('fetch failed'); return r.json(); })
    .then(list => {
      ORPH = list.find(x => Number(x.id) === id) || list[0];
      renderMain();
      bindTabs();
    })
    .catch(err => {
      console.error(err);
      content.innerHTML = '<p style="color:#666">Unable to load data. Try again later.</p>';
      nameEl.textContent = 'Not found';
    });

  function renderMain(){
    nameEl.textContent = ORPH.name;
    subEl.textContent = ORPH.location + ' • ' + (ORPH.established ? 'Est. ' + ORPH.established : '');
    coverEl.style.backgroundImage = `url('${ORPH.coverImage}')`;
    statChildren.textContent = ORPH.counts?.children ?? '—';
    statVol.textContent = ORPH.counts?.volunteers ?? '—';
    statStaff.textContent = ORPH.counts?.staff ?? '—';
    statFac.textContent = (ORPH.facilities || []).length;

    // initial tab
    showTab('about');

    // actions
    document.getElementById('copy-contact').addEventListener('click', () => {
      const txt = `${ORPH.name}\n${ORPH.location}\nPhone: ${ORPH.phone}\nEmail: ${ORPH.email}`;
      navigator.clipboard?.writeText(txt).then(()=> alert('Contact copied!')).catch(()=> alert('Copy failed'));
    });

    document.getElementById('donate-now').addEventListener('click', ()=> {
      const amt = prompt('Enter donation amount (INR):', '500');
      if(amt) alert(`Demo: Thank you — ₹${amt} (no real payment is done in this demo).`);
    });

    document.getElementById('volunteer-now').addEventListener('click', ()=> {
      window.location.href = 'volunteer.html';
    });
  }

  function bindTabs(){
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        showTab(b.dataset.tab);
      });
    });
  }

  function showTab(tab){
    content.innerHTML = '<p class="muted">Loading...</p>';
    setTimeout(()=> { // small delay for smoothness
      switch(tab){
        case 'about': return renderAbout();
        case 'stories': return renderStories();
        case 'children': return renderChildren();
        case 'volunteers': return renderVolunteers();
        case 'staff': return renderStaff();
        case 'facilities': return renderFacilities();
        case 'gallery': return renderGallery();
        case 'donation': return renderDonation();
        case 'contact': return renderContact();
        default: return renderAbout();
      }
    }, 180);
  }

  function renderAbout(){
    content.innerHTML = `<h3>About</h3><p>${ORPH.description || ORPH.short || ''}</p><p><strong>Mission:</strong> ${ORPH.mission||'—'}</p>`;
  }

  function renderStories(){
    const items = (ORPH.stories || []).map(s => `<li>${s}</li>`).join('');
    content.innerHTML = `<h3>Stories & Events</h3><ul>${items || '<li>No stories yet</li>'}</ul>`;
  }

  function renderChildren(){
    const kids = (ORPH.children || []);
    if(!kids.length){ content.innerHTML = '<h3>Children</h3><p>No child profiles available.</p>'; return; }
    const html = kids.map(c => `
      <div class="child-card">
        <div class="photo" style="background-image:url('${c.photo || 'images/child-placeholder.jpg'}')"></div>
        <div>
          <strong>${c.firstName} ${c.age? '• ' + c.age + ' yrs':''}</strong>
          <div class="muted" style="font-size:13px">${c.shortBio||''}</div>
        </div>
      </div>
    `).join('');
    content.innerHTML = `<h3>Children</h3><div class="children-grid">${html}</div>`;
  }

  function renderVolunteers(){
    const v = (ORPH.volunteers || []);
    content.innerHTML = `<h3>Volunteers</h3><ul>${v.length? v.map(x=>`<li>${x}</li>`).join('') : '<li>No volunteers listed</li>'}</ul>`;
  }

  function renderStaff(){
    const s = (ORPH.staff || []);
    content.innerHTML = `<h3>Staff</h3><ul>${s.length? s.map(x=>`<li>${x}</li>`).join('') : '<li>No staff listed</li>'}</ul>`;
  }

  function renderFacilities(){
    const f = (ORPH.facilities || []);
    content.innerHTML = `<h3>Facilities</h3><ul>${f.length? f.map(x=>`<li>${x}</li>`).join('') : '<li>No facilities listed</li>'}</ul>`;
  }

  function renderGallery(){
    const g = (ORPH.gallery || []);
    const html = g.map(img => `<img src="${img}" alt="${ORPH.name}">`).join('');
    content.innerHTML = `<h3>Gallery</h3><div class="gallery-grid">${html || '<div class="muted">No images</div>'}</div>`;
    // clicking opens full image in new tab:
    document.querySelectorAll('.gallery-grid img').forEach(img => img.addEventListener('click', ()=> window.open(img.src,'_blank')));
  }

  function renderDonation(){
    const breakdown = (ORPH.donationBreakdown || []).map(x => `<li>${x}</li>`).join('');
    content.innerHTML = `<h3>Donation</h3><p>${ORPH.donationIntro || 'Support the orphanage.'}</p><ul>${breakdown || '<li>No breakdown listed</li>'}</ul>
      <div style="margin-top:14px">
        <input id="don-amt" placeholder="Amount (INR)" style="padding:10px;border-radius:10px;border:1px solid #eee;width:160px">
        <button class="visit-btn" onclick="(function(){const a=document.getElementById('don-amt').value||500;alert('Demo: thank you ₹'+a)})()">Donate (Demo)</button>
      </div>`;
  }

  function renderContact(){
    content.innerHTML = `<h3>Contact</h3>
      <p><strong>Location:</strong> ${ORPH.location||'—'}</p>
      <p><strong>Phone:</strong> <a href="tel:${ORPH.phone}">${ORPH.phone||'—'}</a></p>
      <p><strong>Email:</strong> <a href="mailto:${ORPH.email}">${ORPH.email||'—'}</a></p>
      <p><strong>Visiting hours:</strong> ${ORPH.visitingHours||'—'}</p>`;
  }

})();
