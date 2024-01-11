import { autocomplete } from "@algolia/autocomplete-js";
import { createQuerySuggestionsPlugin } from "@algolia/autocomplete-plugin-query-suggestions";
import "@algolia/autocomplete-theme-classic";

import searchClient from "./utils.js";

const indexName = "prod_ECOM_query_suggestions";

const querySuggestionsPlugin = createQuerySuggestionsPlugin({
  searchClient,
  indexName,
  onSubmit({ state }) {
    setInstantSearchUiState({ query: state.query });
  },
  getSearchParams({ state }) {
    return { hitsPerPage: state.query ? 5 : 10 };
  },
  transformSource({ source }) {
    return {
      ...source,
      getItemUrl({ item }) {
        console.log(item);
        return `/search?query=${item.query}`;
      },
      templates: {
        item(params) {
          const { item, html } = params;

          return html`<a class="aa-ItemLink" href="/search?query=${item.query}">
            ${source.templates.item(params).props.children}
          </a>`;
        },
      },
    };
  },
});

autocomplete({
  container: "#autocomplete",
  plugins: [querySuggestionsPlugin],
  openOnFocus: true,
});
