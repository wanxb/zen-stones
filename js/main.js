(() => {
  const canvas = document.getElementById('sand');
  const scene = window.ZenStonesScene.createScene(canvas, window.ZenStonesData.layout);
  window.ZenStonesUI.createUI(scene);
  addEventListener('resize', scene.resize);
})();
