import { StatsStore } from '../utils/parser';

export function renderDashboard(container: HTMLElement) {
  const games = StatsStore.getAllGames();

  if (games.length === 0) {
    container.innerHTML = `
      <div class="dashboard-empty animate-fade-in glass" style="padding: 4rem; max-width: 600px; margin: 0 auto; text-align: center;">
        <div style="font-size: 4rem; margin-bottom: 2rem;">📈</div>
        <h2>Dashboard Empty</h2>
        <p>No verified sessions found. Scan a scoresheet and save it to generate team analytics.</p>
        <button id="back-dashboard-home" style="margin-top: 2rem;">Back to Main Dashboard</button>
      </div>
    `;
    document.querySelector('#back-dashboard-home')?.addEventListener('click', () => location.reload());
    return;
  }

  // Aggregate Data
  let totalGoals = 0;
  let qGoals = [0, 0, 0, 0, 0];
  const playerTotals: Record<string, { name: string, goals: number, no: string }> = {};

  games.forEach(game => {
    game.players.forEach(p => {
      totalGoals += p.totalGoals;
      p.goals.forEach((g, i) => { if (qGoals[i] !== undefined) qGoals[i] += g; });

      const key = p.usaWpNo;
      if (!playerTotals[key]) {
        playerTotals[key] = { name: p.name, goals: 0, no: p.no };
      }
      playerTotals[key].goals += p.totalGoals;
    });
  });

  const topScorers = Object.values(playerTotals).sort((a, b) => b.goals - a.goals).slice(0, 5);
  const maxQ = Math.max(...qGoals) || 1;

  container.innerHTML = `
    <div class="dashboard-view animate-fade-in glass" style="padding: 2rem; max-width: 1000px; margin: 0 auto; text-align: left;">
      <button id="back-dashboard-home" style="background: transparent; margin-bottom: 2rem; border: 1px solid var(--border-glass);">← Back to Home</button>
      
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem;">
        <div>
          <h2 style="background: var(--gradient-accent); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: inline-block;">Team Analytics Dashboard</h2>
          <p style="margin: 0; font-size: 0.9rem;">Aggregate performance from ${games.length} sessions</p>
        </div>
        <div class="glass" style="padding: 0.5rem 1rem; font-size: 0.8rem; border-color: var(--accent);">
          Total Scale: <span style="color: var(--accent); font-weight: bold;">Verified AI</span>
        </div>
      </div>

      <div class="grid-container" style="margin-top: 0; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
        <div class="card glass" style="padding: 1.5rem; text-align: center;">
          <small style="color: var(--text-secondary);">TOTAL GOALS</small>
          <div style="font-size: 2.5rem; font-weight: 800; color: var(--accent);">${totalGoals}</div>
          <div style="font-size: 0.7rem; color: #10b981;">Across all recorded games</div>
        </div>
        <div class="card glass" style="padding: 1.5rem; text-align: center;">
          <small style="color: var(--text-secondary);">AVG GOALS / SESSION</small>
          <div style="font-size: 2.5rem; font-weight: 800;">${(totalGoals / games.length).toFixed(1)}</div>
          <div style="font-size: 0.7rem; color: #f59e0b;">Verified accuracy</div>
        </div>
        <div class="card glass" style="padding: 1.5rem; text-align: center;">
          <small style="color: var(--text-secondary);">RECORDED SESSIONS</small>
          <div style="font-size: 2.5rem; font-weight: 800; color: var(--primary);">${games.length}</div>
          <div style="font-size: 0.7rem; color: var(--text-secondary);">Last update: ${new Date(games[games.length - 1].timestamp).toLocaleDateString()}</div>
        </div>
      </div>

      <div style="margin-top: 3rem;">
        <h3>Scoring Distribution by Quarter</h3>
        <div class="glass" style="margin-top: 1rem; padding: 2rem; height: 200px; display: flex; align-items: flex-end; gap: 1rem;">
          ${qGoals.map((g, i) => `
            <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
              <div style="width: 100%; background: var(--accent); height: ${(g / maxQ) * 90}%; border-radius: 4px 4px 0 0; opacity: ${0.5 + (i * 0.1)};"></div>
              <small>${i < 4 ? 'Q' + (i + 1) : 'SO'}</small>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="margin-top: 3rem;">
        <h3>Top Point Leaders</h3>
        <ul style="list-style: none; margin-top: 1rem;">
          ${topScorers.map((p, i) => `
            <li style="display: flex; justify-content: space-between; padding: 1rem; ${i < topScorers.length - 1 ? 'border-bottom: 1px solid var(--border-glass);' : ''}">
              <span>${p.name} <small style="color: var(--text-secondary);">#${p.no}</small></span>
              <span style="font-weight: bold;">${p.goals} Goals</span>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `;

  document.querySelector('#back-dashboard-home')?.addEventListener('click', () => {
    location.reload();
  });
}

