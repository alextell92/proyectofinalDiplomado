import "./header.css";
export function renderHeader({
  logo,
  title,
  menuItems = [],
  backButton = false,
}) {
  const root = document.getElementById("root");
  if (!root) return;

  const header = document.createElement("header");

  if (backButton) {
    const btn = document.createElement("button");
    btn.textContent = backButton.label || "← Regresar";
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (backButton.action) {
        backButton.action();
      } else if (backButton.url) {
        window.location.href = backButton.url;
      } else {
        history.back();
      }
    });
    header.appendChild(btn);
  }

  if (logo) {
    let logoNode;
    if (typeof logo === "string") {
      logoNode = document.createElement("div");
      logoNode.textContent = logo;
    } else {
      logoNode = logo;
    }
    logoNode.classList.add("logo");
    header.appendChild(logoNode);
  }

  if (title) {
    const h1 = document.createElement("h1");
    h1.textContent = title;
    header.appendChild(h1);
  }

  if (menuItems.length) {
    const nav = document.createElement("nav");
    const ul = document.createElement("ul");
    menuItems.forEach(({ text, action }) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#";
      a.textContent = text;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        action();
      });
      li.appendChild(a);
      ul.appendChild(li);
    });
    nav.appendChild(ul);
    header.appendChild(nav);
  }

  root.appendChild(header);
}
