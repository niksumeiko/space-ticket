import { LandingPage } from './landing/useCases/LandingPage';
import { IntroPage } from './intro/useCases/IntroPage';
import { TicketPage } from './ticket/useCases/TicketPage';

export const routes = [
    {
        index: true,
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/ticket',
        element: <TicketPage />,
    },
    {
        path: '/intro',
        element: <IntroPage />,
    },
];
