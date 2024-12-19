/// <reference types="../../node_modules/cypress/types/cypress-npm-api" />
/// <reference types="../../node_modules/cypress/types/net-stubbing" />
/// <reference types="../../node_modules/cypress/types/cypress" />
/// <reference types="../../node_modules/cypress/types/cypress-global-vars" />
/// <reference types="../../node_modules/cypress/types/cypress-type-helpers" />
import React, { type ReactElement } from 'react';
import { createHashRouter, type RouteObject } from 'react-router-dom';
import { mount, type MountReturn } from 'cypress/react18';

import { App } from '../../src/App';
import '../../src/index.css';
import './commands';

const injectRouter = (child: React.ReactNode): React.ReactNode => {
    if (!React.isValidElement(child)) {
        return child;
    }

    // Check if the element is App root
    if (child.type === App) {
        return React.cloneElement(child, {
            // Inject router factory with HashRouter
            createRouter: (routes: RouteObject[]) => createHashRouter(routes),
        });
    }

    // If element isn't App and has children, traverse them one by one
    if (child.props.children) {
        const children = React.Children.toArray(child.props.children);

        for (const grandChild of children) {
            const newGrandChild = injectRouter(grandChild);

            if (newGrandChild !== grandChild) {
                // Found and cloned App, updating the parent and stop traversing
                return React.cloneElement(child, {}, newGrandChild);
            }
        }
    }

    return child;
};

Cypress.Commands.overwriteQuery('url', () => {
    return () => {
        const hash = cy.getRemoteLocation('hash') ?? '';

        return hash.replace(/^#/, '');
    };
});

Cypress.Commands.add('mount', (element, path, options, rerenderKey) => {
    return cy
        .window()
        .then((w) => {
            w.location.hash = `#${path}`;

            return path;
        })
        .then(() =>
            mount(
                <React.StrictMode>
                    {injectRouter(element)}
                </React.StrictMode>,
                options,
                rerenderKey,
            ),
        );
});

Cypress.Commands.add(
    'getByTestId',
    (testId: string): Cypress.Chainable<JQuery<HTMLElement>> => {
        return cy.get(`[data-test="${testId}"]`);
    },
);

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            getRemoteLocation(key: string): string | undefined;
            mount(
                element: ReactElement,
                path: string,
                options?: Partial<{ log: boolean }>,
                rerenderKey?: string,
            ): Chainable<MountReturn>;
            getByTestId(testId: string): Cypress.Chainable<JQuery<HTMLElement>>;
        }
    }
}
