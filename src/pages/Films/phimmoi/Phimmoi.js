import React, { useEffect, useState } from 'react';
import { Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

function Phimmoi() {
    const [treeData, setTreeData] = useState([]);
    const [expandedKeys, setExpandedKeys] = useState(() => {
        const stored = localStorage.getItem('expandedKeys');
        return stored ? JSON.parse(stored) : [];
    });

    const location = useLocation();

    useEffect(() => {
        fetch('http://localhost:1025/phimmoi/phimmoi')
            .then((res) => res.json())
            .then((data) => {
                const transformed = transformTree(data);
                setTreeData(transformed);
            })
            .catch((err) => console.error('❌ Lỗi fetch phimmoi.json:', err));
    }, []);

    useEffect(() => {
        const stored = localStorage.getItem('expandedKeys');
        if (stored) {
            setExpandedKeys(JSON.parse(stored));
        }
    }, [location.pathname]);

    function transformTree(data) {
        return data.map((node) => {
            if (node.englishName) {
                const isMovie = Array.isArray(node.parts);
                const isTVSeries = Array.isArray(node.seasons);

                if (isMovie && node.parts.length > 0) {
                    return {
                        title: node.englishName,
                        key: node.key,
                        children: node.parts.map((part) => {
                            const year = part.year;
                            const number = part.part;
                            const titleSuffix = part.englishPartTitle ? `: ${part.englishPartTitle}` : '';
                            const displayName = `(${year}) ${node.englishName} ${number}${titleSuffix}`;
                            return {
                                title: part.route ? (
                                    <Link to={part.route} style={{ pointerEvents: 'auto' }}>
                                        {displayName}
                                    </Link>
                                ) : (
                                    displayName
                                ),
                                key: `${node.key}-part${number}`,
                                isLeaf: true,
                            };
                        }),
                    };
                }

                if (isTVSeries && node.seasons.length > 0) {
                    return {
                        title: node.englishName,
                        key: node.key,
                        children: node.seasons.map((season) => {
                            const year = season.year;
                            const number = season.season;
                            const titleSuffix = season.englishSeasonTitle ? `: ${season.englishSeasonTitle}` : '';
                            const displayName = `(${year}) ${node.englishName} Season ${number}${titleSuffix}`;
                            return {
                                title: season.route ? (
                                    <Link to={season.route} style={{ pointerEvents: 'auto' }}>
                                        {displayName}
                                    </Link>
                                ) : (
                                    displayName
                                ),
                                key: `${node.key}-season${number}`,
                                isLeaf: true,
                            };
                        }),
                    };
                }

                return {
                    title: node.route ? (
                        <Link to={node.route} style={{ pointerEvents: 'auto' }}>
                            {node.englishName}
                        </Link>
                    ) : (
                        node.englishName
                    ),
                    key: node.key,
                    isLeaf: true,
                };
            }

            const title = node.age || node.title || '---';
            return {
                title,
                key: node.key,
                children: node.children ? transformTree(node.children) : [],
            };
        });
    }      

    const onExpand = (newExpandedKeys) => {
        setExpandedKeys(newExpandedKeys);
        localStorage.setItem('expandedKeys', JSON.stringify(newExpandedKeys));
    };

    return (
        <Tree
            showLine
            switcherIcon={<DownOutlined />}
            treeData={treeData}
            expandedKeys={expandedKeys}
            onExpand={onExpand}
        />
    );
}

export default Phimmoi;