import instantsearch from "instantsearch.js";
import "instantsearch.css/themes/satellite.css";
import searchClient from "./utils.js";

import {
  searchBox,
  hits,
  configure,
  panel,
  pagination,
  refinementList,
  menu,
} from "instantsearch.js/es/widgets";

import instantSearchRouter from "../routing/instantSearchRouter";

import virtualSearchBox from "./VirtualSearchBox.js";

const indexName = "prod_ECOM";

export const search = instantsearch({
  indexName,
  searchClient,
  routing: instantSearchRouter,
});

let categoryFilters = "";

(function CategoryPageCheck() {
  if (window.location.pathname == "/search/Mens/Clothing") {
    console.log(window.location.pathname);
    categoryFilters = "category_page_id:'Men > Clothing'";
    console.log(categoryFilters);
    return;
  }
  if (window.location.pathname == "/search/Womens/Clothing") {
    console.log(window.location.pathname);
    categoryFilters = "category_page_id:'Women > Clothing'";
    console.log(categoryFilters);
    return;
  } else return;
})();

function searchpage() {
  search.addWidgets([
    configure({
      hitsPerPage: 9,
      attributesToHighlight: ["name"],
      filters: categoryFilters,
    }),
    virtualSearchBox({
      container: "#searchbox",
    }),
    hits({
      container: "#hits",
      cssClasses: {
        root: "",
        list: "grid grid-cols-1 md:grid-cols-3 gap-4",
        item: "relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md",
      },
      templates: {
        item(hit, { html, components }) {
          return html`
            <a
              class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
              href="#"
            >
              <img
                class="object-cover"
                src="${hit.image_urls[0]}"
                alt="product image"
              />
              <span
                class="${hit.price.discount_level == -100
                  ? "hidden"
                  : "absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white"}"
                >${Math.abs(hit.price.discount_level)}% Off</span
              >
            </a>
            <div class="mt-4 px-5 pb-5 w-full flex flex-col flex-grow">
              <a href="#">
                <h5 class="text-xl tracking-tight text-slate-900">
                  ${hit.name}
                </h5>
              </a>
              <div class="mt-2 mb-5 flex items-center justify-between">
                <p>
                  <span class="text-3xl font-bold text-slate-900"
                    >$${(Math.round(hit.price.value * 100) / 100).toFixed(
                      2
                    )}</span
                  >
                  <span
                    class="${hit.price.discounted_value
                      ? "text-sm text-slate-900 line-through"
                      : "hidden"}"
                    >$${hit.price.discounted_value}</span
                  >
                </p>
              </div>
              <a
                href="#"
                class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-2 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Add to cart</a
              >
            </div>
          `;
        },
      },
    }),

    panel({
      templates: { header: "brand" },
    })(refinementList)({
      container: "#brand",
      attribute: "brand",
    }),
    panel({
      templates: { header: "categories" },
    })(menu)({
      container: "#menu",
      attribute: "list_categories",
      transformItems(items) {
        return items.filter(
          (item) =>
            item.value !== "Clothing" &&
            item.value !== "Men" &&
            item.value !== "Women"
        );
      },
    }),
    pagination({
      container: "#pagination",
    }),
  ]);
}

const observer = new MutationObserver(function (mutations_list) {
  mutations_list.forEach(function (mutation) {
    mutation.addedNodes.forEach(function (added_node) {
      if (added_node.id == "search-page") {
        console.log("#searchpage has been mounted");
        searchpage();

        observer.disconnect();
      }
    });
  });
});

observer.observe(document.querySelector("#main-page"), {
  subtree: false,
  childList: true,
});
