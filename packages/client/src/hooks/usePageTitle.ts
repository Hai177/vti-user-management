import React from 'react';

import { PAGE_TITLE_SUFFIX } from '~/appConstants';

const usePageTitle = (title: string) => {
  React.useEffect(() => {
    document.title = `${title} ${PAGE_TITLE_SUFFIX}`;
  }, []);
};

export { usePageTitle };
