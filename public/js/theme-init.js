(function () {
  try {
    var stored = localStorage.getItem("theme");
    var mode = stored === "light" || stored === "dark" ? stored : "system";
    var root = document.documentElement;

    root.dataset.themeMode = mode;
    if (mode !== "system") root.dataset.theme = mode;

    var dark =
      mode === "dark" ||
      (mode === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#07111f" : "#f4f7fb");
  } catch (error) {
    /* localStorage unavailable: keep system default */
  }
})();
