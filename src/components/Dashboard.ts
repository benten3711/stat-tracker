export function renderDashboard(container: HTMLElement) {
    container.innerHTML = `
    <div class="dashboard-view animate-fade-in glass" style="padding: 2rem; max-width: 1000px; margin: 0 auto; text-align: left;">
      <button id="back-dashboard-home" style="background: transparent; margin-bottom: 2rem; border: 1px solid var(--border-glass);">← Back to Dashboard</button>
      
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem;">
        <div>
          <h2 style="background: var(--gradient-accent); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: inline-block;">Pride Boys 14U Red</h2>
          <p style="margin: 0; font-size: 0.9rem;">Season 2025-2026 Analysis</p>
        </div>
        <div class="glass" style="padding: 0.5rem 1rem; font-size: 0.8rem; border-color: var(--accent);">
          Win Rate: <span style="color: var(--accent); font-weight: bold;">75%</span>
        </div>
      </div>

      <div class="grid-container" style="margin-top: 0; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
        <div class="card glass" style="padding: 1.5rem; text-align: center;">
          <small style="color: var(--text-secondary);">GOALS PER GAME</small>
          <div style="font-size: 2.5rem; font-weight: 800; color: var(--accent);">12.4</div>
          <div style="font-size: 0.7rem; color: #10b981;">↑ 12% from last month</div>
        </div>
        <div class="card glass" style="padding: 1.5rem; text-align: center;">
          <small style="color: var(--text-secondary);">EXCLUSIONS DRAWN</small>
          <div style="font-size: 2.5rem; font-weight: 800;">6.2</div>
          <div style="font-size: 0.7rem; color: #f59e0b;">Stable</div>
        </div>
        <div class="card glass" style="padding: 1.5rem; text-align: center;">
          <small style="color: var(--text-secondary);">SAVE PERCENTAGE</small>
          <div style="font-size: 2.5rem; font-weight: 800; color: var(--primary);">48%</div>
          <div style="font-size: 0.7rem; color: #ef4444;">↓ 3% vs league avg</div>
        </div>
      </div>

      <div style="margin-top: 3rem;">
        <h3>Scoring Distribution</h3>
        <div class="glass" style="margin-top: 1rem; padding: 2rem; height: 200px; display: flex; align-items: flex-end; gap: 1rem;">
          <!-- Simple CSS Bar Chart -->
          <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <div style="width: 100%; background: var(--accent); height: 40%; border-radius: 4px 4px 0 0; opacity: 0.7;"></div>
            <small>Q1</small>
          </div>
          <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <div style="width: 100%; background: var(--accent); height: 70%; border-radius: 4px 4px 0 0;"></div>
            <small>Q2</small>
          </div>
          <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <div style="width: 100%; background: var(--accent); height: 55%; border-radius: 4px 4px 0 0; opacity: 0.8;"></div>
            <small>Q3</small>
          </div>
          <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <div style="width: 100%; background: var(--accent); height: 90%; border-radius: 4px 4px 0 0;"></div>
            <small>Q4</small>
          </div>
          <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <div style="width: 100%; background: var(--primary); height: 20%; border-radius: 4px 4px 0 0;"></div>
            <small>SO</small>
          </div>
        </div>
      </div>

      <div style="margin-top: 3rem;">
        <h3>Top Scorers</h3>
        <ul style="list-style: none; margin-top: 1rem;">
          <li style="display: flex; justify-content: space-between; padding: 1rem; border-bottom: 1px solid var(--border-glass);">
            <span>Artemly Malkov <small style="color: var(--text-secondary);">#2</small></span>
            <span style="font-weight: bold;">42 Goals</span>
          </li>
          <li style="display: flex; justify-content: space-between; padding: 1rem; border-bottom: 1px solid var(--border-glass);">
            <span>Cole Lydiard <small style="color: var(--text-secondary);">#6</small></span>
            <span style="font-weight: bold;">38 Goals</span>
          </li>
           <li style="display: flex; justify-content: space-between; padding: 1rem;">
            <span>Asher Langsdale <small style="color: var(--text-secondary);">#3</small></span>
            <span style="font-weight: bold;">12 Goals</span>
          </li>
        </ul>
      </div>
    </div>
  `;

    document.querySelector('#back-dashboard-home')?.addEventListener('click', () => {
        location.reload();
    });
}
