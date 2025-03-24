import { Link } from 'react-router-dom';

import config from '~/config';

import classNames from 'classnames/bind';
import menuTreeStyles from '~/components/MenuTree.module.scss';
const cx = classNames.bind(menuTreeStyles);

function Phimmoi() {
    return (
        <div className={cx('menuTree')}>
            <details className={cx('menuGroup', 'menuLevel1')}>
                <summary className={cx('menuLabel')}>Modern Times</summary>
            </details>
            <details className={cx('menuGroup', 'menuLevel1')}>
                <summary className={cx('menuLabel')}>Medievel Times</summary>
            </details>
            <details className={cx('menuGroup', 'menuLevel1')}>
                <summary className={cx('menuLabel')}>Ancient Times</summary>
            </details>
            <details className={cx('menuGroup, menuLevel1')}>
                <summary className={cx('menuLabel')}>Prehistoric Times</summary>
                <Link className={cx('menuLevel2')} to={config.routes.iceAge}>Ice Age</Link>
                <details className={cx('menuGroup', 'menuLevel2')}>
                    <summary className={cx('menuLabel')}>Jurassic</summary>
                    <ul className={cx('menuList', 'menuLevel3')}>
                        <li>
                            <Link to={config.routes.jurassicWorld}>Jurassic World</Link>
                        </li>
                        <li>
                            <Link to={config.routes.jurassicPark}>Jurassic Park</Link>
                        </li>
                    </ul>
                </details>
            </details>
        </div>
    );
}

export default Phimmoi;
