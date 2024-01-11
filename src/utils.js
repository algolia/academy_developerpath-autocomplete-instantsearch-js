import algoliasearch from "algoliasearch/lite";

const appId = "U9UXVSI686";
const apiKey = "737b3e1269f8cc2eeb6f8844b750996f";

const searchClient = algoliasearch(appId, apiKey);

export default searchClient;
