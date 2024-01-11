import "@algolia/autocomplete-theme-classic";

import { search } from "./searchpage.js";

// Handle Flash of unstyled content if necessary

// let domReady = (cb) => {
//   document.readyState === "interactive" || document.readyState === "complete"
//     ? cb()
//     : document.addEventListener("DOMContentLoaded", cb);
// };

// domReady(() => {
//   // Display body when DOM is loaded
//   document.body.style.visibility = "visible";
// });

search.start();
