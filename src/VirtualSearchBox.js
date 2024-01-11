import { connectSearchBox } from "instantsearch.js/es/connectors";

const virtualSearchBox = connectSearchBox(() => {});

export default virtualSearchBox;
