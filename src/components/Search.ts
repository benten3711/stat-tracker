import { StatsStore, type PlayerStats } from '../utils/parser';

export function renderSearch(container: HTMLElement) {
  container.innerHTML = `
    <div class="search-view animate-fade-in glass" style="padding: 2rem; max-width: 800px; margin: 0 auto;">
      <button id="back-home" style="background: transparent; margin-bottom: 2rem; border: 1px solid var(--border-glass);">← Back to Dashboard</button>
      <h2>Public Stat Search</h2>
      <p>Enter a player name or USA Water Polo ID to retrieve verified statistics from your scanned sessions.</p>
      
      <div style="display: flex; gap: 1rem; margin-bottom: 3rem;">
        <input type="text" id="search-input" placeholder="e.g. Artemly Malkov or 627910" 
          style="flex: 1; padding: 1rem; border-radius: 0.5rem; border: 1px solid var(--border-glass); background: rgba(0,0,0,0.3); color: white;">
        <button id="search-action">Search</button>
      </div>

      <div id="search-results" style="text-align: left;">
        <p style="text-align: center; font-style: italic; color: var(--text-secondary);">Using AI Verified Database.</p>
      </div>
    </div>
  `;

  const backBtn = container.querySelector('#back-home') as HTMLElement;
  const searchBtn = container.querySelector('#search-action') as HTMLElement;
  const input = container.querySelector('#search-input') as HTMLInputElement;
  const results = container.querySelector('#search-results') as HTMLElement;

  backBtn.addEventListener('click', () => location.reload());

  searchBtn.addEventListener('click', () => {
    const query = input.value.trim();
    if (!query) return;

    const matches = StatsStore.getPlayerStats(query);

    if (matches.length > 0) {
      results.innerHTML = matches.map((p, index) => `
        <div class="card glass animate-fade-in" style="margin-top: 1rem; border: 1px solid var(--accent);">
          <h3>${p.name}</h3>
          <p style="margin-bottom: 0;">USAWP ID: ${p.usaWpNo}</p>
          <hr style="margin: 1rem 0; opacity: 0.1;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div>
              <small style="color: var(--accent);">SESSION GOALS</small>
              <div style="font-size: 2rem; font-weight: bold;">${p.totalGoals}</div>
            </div>
            <div>
              <small style="color: var(--accent);">CAP NUMBER</small>
              <div style="font-size: 2rem; font-weight: bold;">#${p.no}</div>
            </div>
          </div>
          <button id="view-profile-${index}" class="profile-btn" style="margin-top: 1rem; width: 100%; font-size: 0.8rem;">View Detailed Profile</button>
        </div>
      `).join('');

      matches.forEach((p, index) => {
        results.querySelector(`#view-profile-${index}`)?.addEventListener('click', () => {
          renderPlayerProfile(container, p);
        });
      });
    } else {
      results.innerHTML = `
        <div style="text-align: center; margin-top: 2rem;">
          <p style="color: var(--text-secondary);">No verified records found for "${query}".</p>
          <p style="font-size: 0.8rem; margin-top: 0.5rem;">Try scanning a scoresheet first to populate the database.</p>
        </div>
      `;
    }
  });
}

function renderPlayerProfile(container: HTMLElement, player: PlayerStats) {
  container.innerHTML = `
    <div class="profile-view animate-fade-in glass" style="padding: 2rem; max-width: 800px; margin: 0 auto; text-align: left;">
      <button id="back-search" style="background: transparent; margin-bottom: 2rem; border: 1px solid var(--border-glass);">← Back to Search</button>
      
      <div style="display: flex; gap: 2rem; align-items: center; margin-bottom: 3rem;">
        <div style="width: 100px; height: 100px; background: var(--gradient-accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; font-weight: bold;">
          ${player.name.charAt(0)}
        </div>
        <div>
          <h2>${player.name}</h2>
          <p style="margin: 0;">USAWP ID: ${player.usaWpNo} | Cap #${player.no}</p>
          <div style="display: flex; gap: 1rem; margin-top: 0.5rem;">
            <span class="glass" style="padding: 0.1rem 0.5rem; font-size: 0.7rem;">Verified Profile</span>
          </div>
        </div>
      </div>

      <div class="grid-container" style="margin-top: 0; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
        <div class="card glass" style="padding: 1.5rem;">
          <h4 style="color: var(--accent); margin-bottom: 1rem;">Session Highlights</h4>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span>Goals Scored</span>
            <span style="font-weight: bold;">${player.totalGoals}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span>Cap Number</span>
            <span style="font-weight: bold;">#${player.no}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Fouls</span>
            <span style="font-weight: bold;">${player.fouls.length}</span>
          </div>
        </div>
        <div class="card glass" style="padding: 1.5rem;">
          <h4 style="color: var(--accent); margin-bottom: 1rem;">Quarterly Scoring</h4>
          <div style="height: 60px; display: flex; align-items: flex-end; gap: 4px;">
             ${player.goals.map(g => `
               <div style="flex: 1; background: var(--accent); height: ${g * 30 + 10}%;"></div>
             `).join('')}
          </div>
          <p style="font-size: 0.7rem; margin-top: 0.5rem; color: var(--text-secondary);">Performance across 4 periods + SO</p>
        </div>
      </div>
    </div>
  `;

  container.querySelector('#back-search')?.addEventListener('click', () => {
    renderSearch(container);
  });
}
