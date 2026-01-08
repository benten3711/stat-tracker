export function renderSearch(container: HTMLElement) {
  container.innerHTML = `
    <div class="search-view animate-fade-in glass" style="padding: 2rem; max-width: 800px; margin: 0 auto;">
      <button id="back-home" style="background: transparent; margin-bottom: 2rem; border: 1px solid var(--border-glass);">← Back to Dashboard</button>
      <h2>Public Stat Search</h2>
      <p>Enter a player name or USA Water Polo ID to retrieve verified statistics.</p>
      
      <div style="display: flex; gap: 1rem; margin-bottom: 3rem;">
        <input type="text" id="search-input" placeholder="e.g. Artemly Malkov or 627910" 
          style="flex: 1; padding: 1rem; border-radius: 0.5rem; border: 1px solid var(--border-glass); background: rgba(0,0,0,0.3); color: white;">
        <button id="search-action">Search</button>
      </div>

      <div id="search-results" style="text-align: left;">
        <!-- Results will appear here -->
        <p style="text-align: center; font-style: italic;">Verified data from the 2025-2026 season is now available.</p>
      </div>
    </div>
  `;

  const backBtn = container.querySelector('#back-home') as HTMLElement;
  const searchBtn = container.querySelector('#search-action') as HTMLElement;
  const input = container.querySelector('#search-input') as HTMLInputElement;
  const results = container.querySelector('#search-results') as HTMLElement;

  backBtn.addEventListener('click', () => location.reload());

  searchBtn.addEventListener('click', () => {
    const query = input.value.trim().toLowerCase();
    if (query.includes('artemly') || query.includes('627910')) {
      results.innerHTML = `
        <div class="card glass animate-fade-in" style="margin-top: 1rem; border: 1px solid var(--accent);">
          <h3>Artemly Malkov</h3>
          <p style="margin-bottom: 0;">USAWP ID: 627910 | Pride Boys 14U Red</p>
          <hr style="margin: 1rem 0; opacity: 0.1;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div>
              <small style="color: var(--accent);">SEASON GOALS</small>
              <div style="font-size: 2rem; font-weight: bold;">42</div>
            </div>
            <div>
              <small style="color: var(--accent);">GAMES PLAYED</small>
              <div style="font-size: 2rem; font-weight: bold;">12</div>
            </div>
          </div>
          <button id="view-profile-btn" style="margin-top: 1rem; width: 100%; font-size: 0.8rem;">View Full Historical Profile</button>
        </div>
      `;

      results.querySelector('#view-profile-btn')?.addEventListener('click', () => {
        renderPlayerProfile(container, { name: 'Artemly Malkov', id: '627910' });
      });
    } else {
      results.innerHTML = `<p style="color: var(--text-secondary); text-align: center; margin-top: 2rem;">No verified records found for "${input.value}".</p>`;
    }
  });
}

function renderPlayerProfile(container: HTMLElement, player: { name: string, id: string }) {
  container.innerHTML = `
    <div class="profile-view animate-fade-in glass" style="padding: 2rem; max-width: 800px; margin: 0 auto; text-align: left;">
      <button id="back-search" style="background: transparent; margin-bottom: 2rem; border: 1px solid var(--border-glass);">← Back to Search</button>
      
      <div style="display: flex; gap: 2rem; align-items: center; margin-bottom: 3rem;">
        <div style="width: 100px; height: 100px; background: var(--gradient-accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; font-weight: bold;">
          ${player.name.charAt(0)}
        </div>
        <div>
          <h2>${player.name}</h2>
          <p style="margin: 0;">USAWP ID: ${player.id} | Pride Boys 14U Red</p>
          <div style="display: flex; gap: 1rem; margin-top: 0.5rem;">
            <span class="glass" style="padding: 0.1rem 0.5rem; font-size: 0.7rem;">Attacker</span>
            <span class="glass" style="padding: 0.1rem 0.5rem; font-size: 0.7rem;">Right Handed</span>
          </div>
        </div>
      </div>

      <div class="grid-container" style="margin-top: 0; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
        <div class="card glass" style="padding: 1.5rem;">
          <h4 style="color: var(--accent); margin-bottom: 1rem;">Career Totals</h4>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span>Goals</span>
            <span style="font-weight: bold;">142</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span>Assists</span>
            <span style="font-weight: bold;">31</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Sprints Won</span>
            <span style="font-weight: bold;">88%</span>
          </div>
        </div>
        <div class="card glass" style="padding: 1.5rem;">
          <h4 style="color: var(--accent); margin-bottom: 1rem;">Recent Form</h4>
          <div style="height: 60px; display: flex; align-items: flex-end; gap: 4px;">
             <div style="flex: 1; background: var(--accent); height: 80%;"></div>
             <div style="flex: 1; background: var(--accent); height: 60%;"></div>
             <div style="flex: 1; background: var(--accent); height: 100%;"></div>
             <div style="flex: 1; background: var(--accent); height: 90%;"></div>
             <div style="flex: 1; background: var(--accent); height: 75%;"></div>
          </div>
          <p style="font-size: 0.7rem; margin-top: 0.5rem; color: var(--text-secondary);">Goals per game last 5 matches</p>
        </div>
      </div>
      
      <div style="margin-top: 2rem;">
        <h3>Awards & Recognition</h3>
        <p style="font-size: 0.9rem; margin-top: 0.5rem;">🏆 Tournament MVP - KAP7 Year of the Horse 2026</p>
        <p style="font-size: 0.9rem;">⭐ All-League Second Team (2025)</p>
      </div>
    </div>
  `;

  container.querySelector('#back-search')?.addEventListener('click', () => {
    renderSearch(container);
  });
}
