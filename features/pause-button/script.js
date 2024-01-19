export default async function ({ feature, console }) {
  let vm = feature.traps.vm;

  let controls = await ScratchTools.waitForElement(
    "div[class^='controls_controls-container_']"
  );

  let button = document.createElement("img");
  button.src = feature.self.getResource("pause");
  button.title = "Pause";
  button.draggable = false;
  button.classList.add("ste-pause-btn");
  button.addEventListener("click", pause)

  controls.insertBefore(
    button,
    controls.querySelector("img[class^='stop-all_stop-all_']")
  );

  function pause() {
    vm.runtime.audioEngine.audioContext.suspend();
    if (!vm.runtime.ioDevices.clock._paused) {
      vm.runtime.ioDevices.clock.pause();
    }
    vm.runtime.threads.forEach(pauseThread);

    const activeThread = vm.runtime.sequencer.activeThread;
  }
}
