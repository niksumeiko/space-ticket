import { LandingPage } from './landing/useCases/LandingPage';
import { IntroPage } from './intro/useCases/IntroPage';

export const routes = [
    {
        index: true,
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/intro',
        element: <IntroPage />,
    },
];
