import { Suspense } from 'react';

import { LoadingOverlay } from '~/components';

type LoadComponentProps = {
  component: React.LazyExoticComponent<() => JSX.Element>;
};

const LoadComponent = ({ component: Component }: LoadComponentProps) => (
  <Suspense fallback={<LoadingOverlay open fullScreen />}>
    <Component />
  </Suspense>
);

export default LoadComponent;
