import { FocusPageLayout, HeroTitle } from '@design-system';

export const IntroPage = () => {
    const date = new Date();
    const hours = date.getHours();

    return (
        <FocusPageLayout>
            <HeroTitle title="/Introduction" disabled />
            <p>
                {hours < 12 ? 'Good morning' : 'Hello'}, this app enables to retrieve a
                ticket to a space shuttle ;)
            </p>
        </FocusPageLayout>
    );
};
