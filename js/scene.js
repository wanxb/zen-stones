window.ZenStonesScene = (() => {
  function createScene(canvas, options) {
    const ctx = canvas.getContext('2d');
    const stones = [];
    let dragged = null;
    let hoverX = 0;
    let hoverY = 0;
    let ripple = 0;

    function updateCanvasSize() {
      canvas.width = innerWidth * devicePixelRatio;
      canvas.height = innerHeight * devicePixelRatio;
      canvas.style.width = innerWidth + 'px';
      canvas.style.height = innerHeight + 'px';
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    }

    function seedLayout() {
      stones.length = 0;
      const count = innerWidth < 640 ? options.mobileCount : options.desktopCount;
      for (let i = 0; i < count; i++) {
        stones.push({
          x: innerWidth * (0.18 + Math.random() * 0.64),
          y: innerHeight * (0.28 + Math.random() * 0.54),
          r: 28 + Math.random() * 42,
          stretch: 0.6 + Math.random() * 0.7,
          rot: Math.random() * Math.PI,
          shade: 28 + Math.random() * 22
        });
      }
    }

    function resize() {
      updateCanvasSize();
      if (!stones.length) seedLayout();
    }

    function drawBackground(t) {
      ctx.fillStyle = '#f3ecde';
      ctx.fillRect(0, 0, innerWidth, innerHeight);
      ctx.fillStyle = 'rgba(0,0,0,.016)';
      for (let i = 0; i < 420; i++) {
        ctx.fillRect((i * 59) % innerWidth, (i * 97) % innerHeight, 1, 1);
      }
      ctx.strokeStyle = `rgba(183,129,82,${0.04 + Math.sin(t * 0.0015) * 0.02})`;
      ctx.beginPath();
      ctx.moveTo(0, innerHeight * 0.78);
      ctx.quadraticCurveTo(innerWidth * 0.25, innerHeight * 0.74, innerWidth * 0.5, innerHeight * 0.82);
      ctx.quadraticCurveTo(innerWidth * 0.72, innerHeight * 0.88, innerWidth, innerHeight * 0.76);
      ctx.stroke();
    }

    function drawRakeLines(t) {
      ctx.lineWidth = 1;
      for (let y = 80; y < innerHeight - 40; y += 18) {
        ctx.beginPath();
        for (let x = 0; x <= innerWidth; x += 8) {
          let offset = Math.sin(x * 0.008 + t * 0.001 + y * 0.01) * 2.8;
          stones.forEach((s) => {
            const dx = x - s.x;
            const dy = y - s.y;
            const d = Math.hypot(dx, dy);
            const influence = Math.max(0, 1 - d / (s.r * 3.7));
            offset += Math.sin(d * 0.05 - t * 0.003) * influence * 17;
          });
          if (x === 0) ctx.moveTo(x, y + offset);
          else ctx.lineTo(x, y + offset);
        }
        ctx.strokeStyle = 'rgba(44,41,37,.1)';
        ctx.stroke();
      }
    }

    function drawStone(s) {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rot);
      const g = ctx.createRadialGradient(-s.r * 0.35, -s.r * 0.4, 8, 0, 0, s.r * 1.4);
      g.addColorStop(0, `hsl(0 0% ${s.shade + 14}% / .96)`);
      g.addColorStop(1, `hsl(0 0% ${s.shade}% / 1)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(0, 0, s.r * s.stretch, s.r, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,.08)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();
    }

    function drawHover() {
      if (!hoverX && !hoverY) return;
      ctx.strokeStyle = 'rgba(183,129,82,.18)';
      ctx.beginPath();
      ctx.arc(hoverX, hoverY, 34 + Math.sin(ripple) * 4, 0, Math.PI * 2);
      ctx.stroke();
    }

    function render(t) {
      drawBackground(t);
      drawRakeLines(t);
      stones.forEach(drawStone);
      drawHover();
      ripple += 0.04;
      requestAnimationFrame(render);
    }

    function pointerPos(e) {
      return { x: e.clientX, y: e.clientY };
    }

    function handlePointerDown(e) {
      const p = pointerPos(e);
      hoverX = p.x;
      hoverY = p.y;
      for (let i = stones.length - 1; i >= 0; i--) {
        const s = stones[i];
        if (Math.hypot(p.x - s.x, p.y - s.y) < s.r * 1.1) {
          dragged = { stone: s, dx: p.x - s.x, dy: p.y - s.y };
          break;
        }
      }
    }

    function handlePointerMove(e) {
      const p = pointerPos(e);
      hoverX = p.x;
      hoverY = p.y;
      if (dragged) {
        dragged.stone.x = p.x - dragged.dx;
        dragged.stone.y = p.y - dragged.dy;
      }
    }

    function handlePointerUp() {
      dragged = null;
    }

    function addStoneAt(x, y) {
      stones.push({
        x,
        y,
        r: 16 + Math.random() * 16,
        stretch: 0.7 + Math.random() * 0.4,
        rot: Math.random() * Math.PI,
        shade: 26 + Math.random() * 16
      });
    }

    function shuffle() {
      seedLayout();
      stones.forEach((s) => { s.rot += (Math.random() - .5) * 0.8; });
    }

    function rake() {
      stones.forEach((s) => { s.rot += (Math.random() - .5) * 0.8; });
    }

    function calm() {
      stones.splice(0, stones.length);
      seedLayout();
    }

    function exportImage() {
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = 'zen-stones-composition.png';
      a.click();
    }

    function getStats() {
      const count = stones.length;
      const density = count <= 4 ? '低' : count <= 7 ? '中' : '高';
      const avg = stones.reduce((sum, s) => sum + s.r, 0) / Math.max(count, 1);
      const mood = avg > 42 ? '沉稳' : avg > 30 ? '平静' : '轻盈';
      return { count, density, mood };
    }

    resize();
    requestAnimationFrame(render);

    return {
      resize,
      handlePointerDown,
      handlePointerMove,
      handlePointerUp,
      addStoneAt,
      shuffle,
      rake,
      calm,
      exportImage,
      getStats
    };
  }

  return { createScene };
})();
