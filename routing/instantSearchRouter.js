const instantSearchRouter = {
  stateMapping: {
    stateToRoute(uiState) {
      // refer to uiState docs for details: https://www.algolia.com/doc/api-reference/widgets/ui-state/js/
      return {
        query: uiState.prod_ECOM.query,
        page: uiState.prod_ECOM.page,
        brands:
          uiState.prod_ECOM.refinementList &&
          uiState.prod_ECOM.refinementList.brand,
        category:
          uiState.prod_ECOM.menu && uiState.prod_ECOM.menu.list_categories,
      };
    },

    routeToState(routeState) {
      // refer to uiState docs for details: https://www.algolia.com/doc/api-reference/widgets/ui-state/js/
      return {
        // eslint-disable-next-line camelcase
        prod_ECOM: {
          query: routeState.query,
          page: routeState.page,
          menu: {
            list_categories: routeState.category,
          },
          refinementList: {
            brand: routeState.brands,
          },
        },
      };
    },
  },
};

export default instantSearchRouter;
