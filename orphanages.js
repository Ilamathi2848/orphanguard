// orphanages.js
(async function(){
  const grid = document.getElementById('grid');
  document.getElementById('year').textContent = new Date().getFullYear();

  try {
    const res = await fetch('orphanages.json');
    if(!res.ok) throw new Error('Data fetch failed');
    const data = await res.json();

    data.forEach(o => {
      const div = document.createElement('article');
      div.className = 'card';
      div.innerHTML = `
        <div class="cover" style="background-image:url('${o.coverImage}')"></div>
        <h3>${o.name}</h3>
        <p>${o.short}</p>
        <div class="meta">
          <div class="counts">
            <span>👧 ${o.counts.children}</span>
            <span>🙋 ${o.counts.volunteers}</span>
            <span>🧑‍⚕️ ${o.counts.staff}</span>
          </div>
          <div class="btns">
            <a class="small-btn" href="orphanage.html?id=${o.id}">View</a>
            <button class="small-btn" onclick="window.location='mailto:${o.email}'">Email</button>
          </div>
        </div>
      `;
      grid.appendChild(div);
    });

  } catch (err) {
    grid.innerHTML = `<div style="padding:32px;color:#666">Unable to load orphanages. Try again later.</div>`;
    console.error(err);
  }
})();
