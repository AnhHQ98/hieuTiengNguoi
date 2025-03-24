import { Link } from 'react-router-dom';

import config from '~/config';

import classNames from 'classnames/bind';
import menuTreeStyles from '~/components/MenuTree.module.scss';
const cx = classNames.bind(menuTreeStyles);

function EnglishTenses() {
    return (
        <div className={cx('menuTree')}>
            <details className={cx('menuGroup', 'menuLevel1')}>
                <summary className={cx('menuLabel')}>Present Tense</summary>
                <ul className={cx('menuList', 'menuLevel2')}>
                    <li>
                        <Link to={config.routes.presentSimple}>Present simple</Link>
                    </li>
                    <li>
                        <Link to={config.routes.presentContinuous}>Present Continuous</Link>
                    </li>
                    <li>
                        <Link to={config.routes.presentPerfect}>Present Perfect</Link>
                    </li>
                    <li>
                        <Link to={config.routes.presentPerfectContinuous}>Present Perfect Continuous</Link>
                    </li>
                </ul>
            </details>
            <details className={cx('menuGroup', 'menuLevel1')}>
                <summary className={cx('menuLabel')}>Past Tense</summary>
                <ul className={cx('menuList', 'menuLevel2')}>
                    <li>
                        <Link to={config.routes.pastSimple}>Past Simple</Link>
                    </li>
                    <li>
                        <Link to={config.routes.pastContinuous}>Past Continuous</Link>
                    </li>
                    <li>
                        <Link to={config.routes.pastPerfect}>Past Perfect</Link>
                    </li>
                    <li>
                        <Link to={config.routes.pastPerfectContinuous}>Past Perfect Continuous</Link>
                    </li>
                </ul>
            </details>
            <details className={cx('menuGroup', 'menuLevel1')}>
                <summary className={cx('menuLabel')}>Future Tense</summary>
                <ul className={cx('menuList', 'menuLevel2')}>
                    <li>
                        <Link to={config.routes.futureSimple}>Future Simple</Link>
                    </li>
                    <li>
                        <Link to={config.routes.futureContinuous}>Future Continuous</Link>
                    </li>
                    <li>
                        <Link to={config.routes.futurePerfect}>Future Perfect</Link>
                    </li>
                    <li>
                        <Link to={config.routes.futurePerfectContinuous}>Future Perfect Continuous</Link>
                    </li>
                </ul>
            </details>
        </div>
    );
}

export default EnglishTenses;
