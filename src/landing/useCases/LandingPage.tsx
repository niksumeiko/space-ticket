import { FocusPageLayout, HeroTitle, MainMenu } from '@design-system';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.scss';

export const LandingPage = () => {
    return (
        <FocusPageLayout className={styles.background}>
            <HeroTitle title="Space Ticket app" />
            <MainMenu>
                <MainMenu.Item>
                    <Link to="/intro">App introduction</Link>
                </MainMenu.Item>
                <MainMenu.Item>
                    <Link to="/ticket">Get ticket</Link>
                </MainMenu.Item>
            </MainMenu>
        </FocusPageLayout>
    );
};
