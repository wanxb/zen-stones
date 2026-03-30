window.ZenStonesUI = (() => {
  function createUI(scene) {
    const stoneCountEl = document.getElementById('stoneCount');
    const densityEl = document.getElementById('density');
    const moodEl = document.getElementById('mood');
    const statsPanel = document.getElementById('statsPanel');
    const canvas = document.getElementById('sand');
    const top = document.querySelector('.top');
    let showUI = true;

    function syncStats() {
      const stats = scene.getStats();
      stoneCountEl.textContent = stats.count;
      densityEl.textContent = stats.density;
      moodEl.textContent = stats.mood;
    }

    canvas.addEventListener('pointerdown', (e) => {
      scene.handlePointerDown(e);
    });

    canvas.addEventListener('pointermove', (e) => {
      scene.handlePointerMove(e);
    });

    addEventListener('pointerup', () => {
      scene.handlePointerUp();
      syncStats();
    });

    canvas.addEventListener('dblclick', (e) => {
      scene.addStoneAt(e.clientX, e.clientY);
      syncStats();
    });

    document.getElementById('shuffleBtn').onclick = () => {
      scene.shuffle();
      syncStats();
    };

    document.getElementById('rakeBtn').onclick = () => {
      scene.rake();
      syncStats();
    };

    document.getElementById('calmBtn').onclick = () => {
      scene.calm();
      syncStats();
    };

    document.getElementById('exportBtn').onclick = () => {
      scene.exportImage();
    };

    addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        showUI = !showUI;
        top.style.display = showUI ? 'flex' : 'none';
        statsPanel.style.display = showUI ? 'block' : 'none';
      }
    });

    syncStats();
  }

  return { createUI };
})();
