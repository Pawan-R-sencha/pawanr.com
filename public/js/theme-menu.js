const root = document.documentElement;
const media = window.matchMedia("(prefers-color-scheme: dark)");
const menu = document.getElementById("theme-menu");
const toggle = menu ? menu.querySelector("summary") : null;
const choices = Array.from(document.querySelectorAll("[data-theme-choice]"));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let transitionTimer = null;

const startThemeTransition = () => {
  if (reduceMotion.matches) return;

  root.classList.add("theme-transition");
  window.clearTimeout(transitionTimer);
  transitionTimer = window.setTimeout(() => {
    root.classList.remove("theme-transition");
  }, 200);
};

const getMode = () => {
  try {
    const stored = localStorage.getItem("theme");

    return stored === "light" || stored === "dark" ? stored : "system";
  } catch (error) {
    return "system";
  }
};

const apply = (mode) => {
  try {
    if (mode === "system") {
      localStorage.removeItem("theme");
      root.removeAttribute("data-theme");
    } else {
      localStorage.setItem("theme", mode);
      root.dataset.theme = mode;
    }
  } catch (error) {
    if (mode === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.dataset.theme = mode;
    }
  }

  root.dataset.themeMode = mode;

  const effectiveDark =
    mode === "dark" || (mode === "system" && media.matches);

  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) {
    themeColor.setAttribute("content", effectiveDark ? "#07111f" : "#f4f7fb");
  }

  choices.forEach((choice) => {
    choice.setAttribute("aria-pressed", String(choice.dataset.themeChoice === mode));
  });

  if (toggle) {
    toggle.setAttribute(
      "aria-label",
      "Color theme: " + mode + ". Choose system, light, or dark."
    );
  }
};

apply(getMode());

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    startThemeTransition();
    apply(choice.dataset.themeChoice || "system");

    if (menu instanceof HTMLDetailsElement) {
      menu.open = false;
    }

    if (toggle) {
      toggle.focus({ preventScroll: true });
    }
  });
});

media.addEventListener("change", () => {
  if (getMode() === "system") {
    startThemeTransition();
    apply("system");
  }
});

document.addEventListener("click", (event) => {
  if (
    menu instanceof HTMLDetailsElement &&
    menu.open &&
    !menu.contains(event.target)
  ) {
    menu.open = false;
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu instanceof HTMLDetailsElement && menu.open) {
    menu.open = false;

    if (toggle) {
      toggle.focus({ preventScroll: true });
    }
  }
});
