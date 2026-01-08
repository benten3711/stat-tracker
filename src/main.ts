import './style.css'
import { renderScanner } from './components/Scanner';
import { renderSearch } from './components/Search';
import { renderDashboard } from './components/Dashboard';

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <div class="animate-fade-in">
    <h1>WP STAT TRACKER</h1>
    <p>Empowering water polo coaches with precision analytics. Scan scoresheets, track player evolution, and lead your team to victory.</p>
    
    <div class="grid-container">
      <div class="card glass">
        <div style="font-size: 3rem; margin-bottom: 1rem;">📷</div>
        <h3>Scoresheet Scanner</h3>
        <p style="font-size: 0.9rem; margin-top: 1rem;">Upload or capture the official USA Water Polo scoresheet to extract data instantly.</p>
        <button id="camera-btn">Start Scanning</button>
      </div>

      <div class="card glass">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
        <h3>Public Search</h3>
        <p style="font-size: 0.9rem; margin-top: 1rem;">Search for players, teams, or specific events to view historical performance.</p>
        <button id="search-btn" style="background: transparent; border: 1px solid var(--accent);">Browse Stats</button>
      </div>

      <div class="card glass">
        <div style="font-size: 3rem; margin-bottom: 1rem;">📊</div>
        <h3>Performance Insights</h3>
        <p style="font-size: 0.9rem; margin-top: 1rem;">Deep dive into metrics, shot charts, and goalie saves over multiple seasons.</p>
        <button id="stats-btn" style="background: transparent; border: 1px solid var(--accent);">View Demo</button>
      </div>
    </div>

    <!-- Hidden file input for scanner simulation -->
    <input type="file" id="scoresheet-upload" accept="image/*" style="display: none;">
  </div>
`

// Setup simple event listeners for interaction
document.querySelector('#camera-btn')?.addEventListener('click', () => {
  const container = document.querySelector<HTMLDivElement>('#app')!;
  renderScanner(container);
});

document.querySelector('#search-btn')?.addEventListener('click', () => {
  const container = document.querySelector<HTMLDivElement>('#app')!;
  renderSearch(container);
});

document.querySelector('#stats-btn')?.addEventListener('click', () => {
  const container = document.querySelector<HTMLDivElement>('#app')!;
  renderDashboard(container);
});

document.querySelector('#scoresheet-upload')?.addEventListener('change', (e) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    alert('Scoresheet received! Parsing engine starting...');
    // Real implementation will follow
  }
});
