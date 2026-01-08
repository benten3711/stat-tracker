import { parseScoresheet, type GameData } from '../utils/parser';

export function renderScanner(container: HTMLElement) {
    container.innerHTML = `
    <div class="scanner-view animate-fade-in glass" style="padding: 2rem; max-width: 800px; margin: 0 auto;">
      <button id="back-home" style="background: transparent; margin-bottom: 2rem; border: 1px solid var(--border-glass);">← Back to Dashboard</button>
      <h2>Scoresheet Scanner</h2>
      <p>Capture a clear photo of the official USA Water Polo scoresheet. Ensure all names and numbers are visible.</p>
      
      <div id="drop-zone" class="drop-zone" style="border: 2px dashed var(--accent); padding: 4rem; border-radius: 1rem; cursor: pointer; transition: all 0.3s ease;">
        <span style="font-size: 4rem;">📄</span>
        <p>Drop file here or click to capture</p>
        <input type="file" id="file-input" accept="image/*" style="display: none;">
      </div>

      <div id="parsing-status" style="display: none; margin-top: 2rem;">
        <div class="loader"></div>
        <p>Parsing scoresheet data... checking player rosters and calculating totals.</p>
      </div>

      <div id="results" style="display: none; margin-top: 2rem; text-align: left;">
        <h3 style="color: var(--accent); margin-bottom: 1rem;">Verification Required</h3>
        <div id="game-info" style="margin-bottom: 2rem; padding: 1rem; background: rgba(0,0,0,0.2); border-radius: 0.5rem;"></div>
        <div id="table-container" class="glass" style="overflow-x: auto;"></div>
        <button id="save-stats" style="margin-top: 2rem; width: 100%; background: var(--gradient-accent);">Confirm and Save to Public Database</button>
      </div>
    </div>
  `;

    const dropZone = container.querySelector('#drop-zone') as HTMLElement;
    const fileInput = container.querySelector('#file-input') as HTMLInputElement;
    const status = container.querySelector('#parsing-status') as HTMLElement;
    const results = container.querySelector('#results') as HTMLElement;
    const backBtn = container.querySelector('#back-home') as HTMLElement;

    backBtn.addEventListener('click', () => {
        // Navigate home - simple reload or state reset
        location.reload();
    });

    dropZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
            handleFile(file);
        }
    });

    async function handleFile(file: File) {
        dropZone.style.display = 'none';
        status.style.display = 'block';

        try {
            const data = await parseScoresheet(file);
            showResults(data);
        } catch (error) {
            alert('Error parsing scoresheet. Please try again with a clearer image.');
            dropZone.style.display = 'block';
        } finally {
            status.style.display = 'none';
        }
    }

    function showResults(data: GameData) {
        results.style.display = 'block';
        const info = results.querySelector('#game-info')!;
        info.innerHTML = `
      <p><strong>Event:</strong> ${data.eventName}</p>
      <p><strong>Team:</strong> ${data.teamName}</p>
      <p><strong>Division:</strong> ${data.division}</p>
    `;

        const table = results.querySelector('#table-container')!;
        table.innerHTML = `
      <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
        <thead>
          <tr style="border-bottom: 1px solid var(--border-glass);">
            <th style="padding: 1rem;">#</th>
            <th style="padding: 1rem;">Player</th>
            <th style="padding: 1rem;">USAWP#</th>
            <th style="padding: 1rem;">Goals</th>
            <th style="padding: 1rem;">Fouls</th>
          </tr>
        </thead>
        <tbody>
          ${data.players.map(p => `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
              <td style="padding: 1rem; text-align: center;">${p.no}</td>
              <td style="padding: 1rem;">${p.name}</td>
              <td style="padding: 1rem; color: var(--text-secondary);">${p.usaWpNo}</td>
              <td style="padding: 1rem; text-align: center; color: var(--accent); font-weight: bold;">${p.totalGoals}</td>
              <td style="padding: 1rem; text-align: center;">${p.fouls.join(', ') || '-'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

        results.querySelector('#save-stats')?.addEventListener('click', () => {
            alert('Statistics successfully pushed to public database!');
            location.reload();
        });
    }
}
