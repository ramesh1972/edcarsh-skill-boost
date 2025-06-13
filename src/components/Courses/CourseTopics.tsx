import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { DeepCourseInfo } from '@/types';
import { Badge } from '../ui/badge';

interface CourseTopicsProps {
    deepCourseInfo: DeepCourseInfo
    level?: number; // Optional level prop for future use
    showHeader?: boolean; // Optional prop to control header visibility
    textStyle?: React.CSSProperties; // Optional prop for custom text styles
}

const levelBullets = {
    0: "•",
    1: "◦",
    2: "▪",
    3: "▫",
    4: "▸",
    // Add more levels as needed
};

const listTextStyles = {
    0: { fontSize: '14px', fontWeight: '400', color: 'blue !important' },
    1: { fontSize: '13px', fontWeight: '300', color: 'yellow !important' },
    2: { fontSize: '12px', fontWeight: '200', color: 'red !important' },
    3: { fontSize: '10px', fontWeight: '100', color: 'green !important' },
    4: { fontSize: '10px', fontWeight: '100', color: 'purple !important' },
    // Add more levels as needed
};
type Topic = { title: string; children?: Topic[] };

function renderTopics(topics: Topic[], maxLevels, levelNo, textStyle): JSX.Element | null {
    if (!topics || !topics.length) return null;
    if (maxLevels !== -1 && levelNo > maxLevels - 1) return null;

    const textStyles2 = textStyle ? textStyle : listTextStyles[levelNo];
    return (
        <div className={levelNo === 0 ? "flex flex-col items-start justify-start" : "flex flex-col items-start justify-start pl-8"}>
            {topics.map((topic, index) => (
                <div key={index} className="gap-2">
                    <span className={`mt-1 text-primary`} style={textStyles2}>{levelBullets[4 - levelNo]}&nbsp;&nbsp;</span>
                    <span style={textStyles2}>{topic.title}</span>
                    {topic.children && topic.children.length > 0 && renderTopics(topic.children, maxLevels, levelNo + 1, textStyles2)}
                </div>
            ))}
        </div>
    );
}

const CourseTopics: React.FC<CourseTopicsProps> = ({ deepCourseInfo, showHeader, level = 3, textStyle = undefined }) => {
    const theme = useTheme();

    return (
        <div className="flex flex-col gap-1">
            <div className="flex flex-1 min-w-0 items-stretch gap-1" style={{ maxHeight: '320px' }}>
                {/* Column 1: Title and Description */}
                <div className="flex-1 min-w-0 flex flex-col p-0" style={{ maxWidth: '330px' }}>
                    {showHeader && <div className="flex items-center gap-2 mb-2" >
                        <h3 className="text-xl font-semibold">
                            Topics
                        </h3>
                    </div>
                    }
                    <div className="flex flex-wrap gap-1 mb-1 ">
                        {deepCourseInfo.tags?.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-start justify-start flex-grow w-full">
                {renderTopics(deepCourseInfo.courseTopics as Topic[], level, 0, textStyle)}
            </div>
        </div>
    );
};

export default CourseTopics;
