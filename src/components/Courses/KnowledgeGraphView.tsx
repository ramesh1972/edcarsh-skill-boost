import React, { useMemo, useState } from 'react';
import { GraphCanvas, GraphCanvasRef } from 'reagraph';
import type { GraphNode, GraphEdge } from 'reagraph';
// Import types for industries, subjects, courses, topics, instructors, learners, orgs
import { Course, Industry, Subject, Topic, Instructor, Learner, Org } from '../../types';

export type KnowledgeGraphViewProps = {
    industries: Industry[];
    subjects: Subject[];
    courses: Course[];
    topics: Topic[];
    instructors: Instructor[];
    learners: Learner[];
    orgs: Org[];
    // Filters
    selectedIndustries: string[];
    selectedSubjects: string[];
    selectedOrgs: string[];
    selectedLevels: string[];
    selectedScheduleStatus: string | null;
    // View mode toggles
    visibleNodeTypes: {
        industries: boolean;
        subjects: boolean;
        courses: boolean;
        topics: boolean;
        instructors: boolean;
        learners: boolean;
        orgs: boolean;
    };
    onVisibleNodeTypesChange: (next: KnowledgeGraphViewProps['visibleNodeTypes']) => void;
};

const NODE_TYPE_COLORS: Record<string, string> = {
    industries: '#4F46E5',
    subjects: '#06B6D4',
    courses: '#22C55E',
    topics: '#F59E42',
    instructors: '#F43F5E',
    learners: '#A21CAF',
    orgs: '#FACC15',
};

// Helper to build nodes and edges for reagraph
function buildGraph(props: KnowledgeGraphViewProps) {
    let nodes: GraphNode[] = [];
    let edges: GraphEdge[] = [];

    // Helper maps for quick lookup
    const industryMap = Object.fromEntries(props.industries.map(i => [i.id, i]));
    const subjectMap = Object.fromEntries(props.subjects.map(s => [s.id, s]));
    const courseMap = Object.fromEntries(props.courses.map(c => [c.id, c]));
    const orgMap = Object.fromEntries(props.orgs.map(o => [o.id, o]));
    const instructorMap = Object.fromEntries(props.instructors.map(i => [i.id, i]));
    const learnerMap = Object.fromEntries(props.learners.map(l => [l.id, l]));

    // --- FILTERED IDs ---
    const filteredIndustryIds = props.selectedIndustries.length > 0 ? props.selectedIndustries.map(Number) : props.industries.map(i => i.id);
    const filteredSubjectIds = props.selectedSubjects.length > 0 ? props.selectedSubjects.map(Number) : props.subjects.map(s => s.id);
    const filteredOrgIds = props.selectedOrgs.length > 0 ? props.selectedOrgs.map(Number) : props.orgs.map(o => o.id);
    const filteredLevels = props.selectedLevels.length > 0 ? props.selectedLevels : null;
    const filteredScheduleStatus = props.selectedScheduleStatus;

    // --- INDUSTRY NODES ---
    if (props.visibleNodeTypes.industries) {
        filteredIndustryIds.forEach(indId => {
            const ind = industryMap[indId];
            if (ind && !nodes.find(n => n.id === `industry-${indId}`)) nodes.push({ id: `industry-${indId}`, label: ind.name, fill: NODE_TYPE_COLORS.industries, type: 'industries' });
        });
    }
    // --- SUBJECT NODES ---
    if (props.visibleNodeTypes.subjects) {
        filteredSubjectIds.forEach(subId => {
            const sub = subjectMap[subId];
            if (sub && !nodes.find(n => n.id === `subject-${subId}`)) {
                nodes.push({ id: `subject-${subId}`, label: sub.name, fill: NODE_TYPE_COLORS.subjects, type: 'subjects' });
                // Link subject to industry
                if (props.visibleNodeTypes.industries) {
                    const parentIndustry = props.industries.find(ind => ind.subjects.some(s => s.id === subId));
                    if (parentIndustry && filteredIndustryIds.includes(parentIndustry.id)) {
                        // Only add edge if not already present
                        const edgeId = `edge-industry-${parentIndustry.id}-subject-${subId}`;
                        const exists = edges.some(e => e.source === `industry-${parentIndustry.id}` && e.target === `subject-${subId}`);
                        if (!exists) {
                            edges.push({ id: edgeId, source: `industry-${parentIndustry.id}`, target: `subject-${subId}` });
                        }
                    }
                }
            }
        });
    }
    // --- COURSE NODES ---
    if (props.visibleNodeTypes.courses) {
        props.courses.forEach(course => {
            // Filter by subject, industry, org, level, schedule status
            if (
                filteredIndustryIds.includes(course.industryId) &&
                filteredSubjectIds.includes(course.subjectId) &&
                (filteredOrgIds.length === 0 || filteredOrgIds.includes(course.ownerOrgId)) &&
                (!filteredLevels || filteredLevels.includes(course.level))
            ) {
                nodes.push({ id: `course-${course.id}`, label: course.title, fill: NODE_TYPE_COLORS.courses, type: 'courses' });
                // Link course to subject
                if (props.visibleNodeTypes.subjects) {
                    edges.push({ id: `edge-subject-${course.subjectId}-course-${course.id}`, source: `subject-${course.subjectId}`, target: `course-${course.id}` });
                }
                // Link course to org
                if (props.visibleNodeTypes.orgs && orgMap[course.ownerOrgId]) {
                    edges.push({ id: `edge-org-${course.ownerOrgId}-course-${course.id}`, source: `org-${course.ownerOrgId}`, target: `course-${course.id}` });
                }
            }
        });
    }
    // --- TOPIC NODES ---
    if (props.visibleNodeTypes.topics) {
        props.courses.forEach(course => {
            if (nodes.find(n => n.id === `course-${course.id}`)) {
                course.courseTopics.forEach(topic => {
                    const topicId = `course-${course.id}-topic-${topic.title}`;
                    nodes.push({ id: topicId, label: topic.title, fill: NODE_TYPE_COLORS.topics, type: 'topics' });
                    edges.push({ id: `edge-course-${course.id}-topic-${topic.title}`, source: `course-${course.id}`, target: topicId });
                    // Subtopics
                    if (topic.children) {
                        topic.children.forEach(sub => {
                            const subId = `course-${course.id}-topic-${topic.title}-sub-${sub.title}`;
                            nodes.push({ id: subId, label: sub.title, fill: NODE_TYPE_COLORS.topics, type: 'topics' });
                            edges.push({ id: `edge-topic-${topicId}-sub-${sub.title}`, source: topicId, target: subId });
                        });
                    }
                });
            }
        });
    }
    // --- ORG NODES ---
    if (props.visibleNodeTypes.orgs) {
        filteredOrgIds.forEach(orgId => {
            const org = orgMap[orgId];
            if (org) nodes.push({ id: `org-${orgId}`, label: org.name, fill: NODE_TYPE_COLORS.orgs, type: 'orgs' });
        });
    }
    // --- INSTRUCTOR NODES ---
    if (props.visibleNodeTypes.instructors) {
        props.instructors.forEach(instr => {
            // Find all their courses in the filtered set
            const instrCourses = props.courses.filter(c => c.ownerInstructorId === instr.id && nodes.find(n => n.id === `course-${c.id}`));
            if (instrCourses.length > 0) {
                nodes.push({ id: `instructor-${instr.id}`, label: `${instr.firstName} ${instr.lastName}`, fill: NODE_TYPE_COLORS.instructors, type: 'instructors' });
                instrCourses.forEach(c => {
                    edges.push({ id: `edge-instructor-${instr.id}-course-${c.id}`, source: `instructor-${instr.id}`, target: `course-${c.id}` });
                });
            }
        });
    }
    // --- LEARNER NODES ---
    if (props.visibleNodeTypes.learners) {
        // Instead of learner.courses, use learnerCourses data (by learnerId)
        // We'll assume props.learners is a list of Learner (User) objects, but we need to cross-ref with learnerCourses data
        // So, for each learner, find all courses in props.courses that are also in learnerCourses (by learnerId)
        props.learners.forEach(learner => {
            // Find all course IDs for this learner from learnerCourses data
            // We'll assume a prop or context provides learnerCourses: {learnerId, courseId}[]
            // For now, only link to courses that are present in the graph
            const learnerCourseIds = props.courses
                .filter(c => nodes.find(n => n.id === `course-${c.id}`))
                .filter(c => {
                    // Find in learnerCourses data
                    // This requires access to learnerCourses data, which should be passed as a prop or imported
                    // For now, skip if not available
                    return false;
                })
                .map(c => c.id);
            if (learnerCourseIds.length > 0) {
                nodes.push({ id: `learner-${learner.id}`, label: `${learner.firstName} ${learner.lastName}`, fill: NODE_TYPE_COLORS.learners, type: 'learners' });
                learnerCourseIds.forEach(cid => {
                    edges.push({ id: `edge-learner-${learner.id}-course-${cid}`, source: `learner-${learner.id}`, target: `course-${cid}` });
                });
            }
        });
    }
    // Defensive filtering: remove any undefined/null/malformed nodes/edges
    nodes = nodes.filter(n => n && n.id && n.label);
    edges = edges.filter(e => e && e.id && e.source && e.target);
    // Deduplicate nodes/edges by id
    const nodeMap = new Map();
    nodes.forEach(n => { if (!nodeMap.has(n.id)) nodeMap.set(n.id, n); });
    nodes = Array.from(nodeMap.values());
    const edgeMap = new Map();
    edges.forEach(e => { if (!edgeMap.has(e.id)) edgeMap.set(e.id, e); });
    edges = Array.from(edgeMap.values());
    return { nodes, edges };
}

export const KnowledgeGraphView: React.FC<KnowledgeGraphViewProps> = (props) => {
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const graphRef = React.useRef<GraphCanvasRef | null>(null);

    const { nodes, edges } = useMemo(() => buildGraph(props), [props]);
    // Defensive: only pass valid nodes/edges to recommendLayout
    const validNodes = nodes.filter(n => n && n.id && n.label);
    const validEdges = edges.filter(e => e && e.id && e.source && e.target);

    // Debug: Log nodes and edges to verify data is present
    React.useEffect(() => {
        console.log('KnowledgeGraphView nodes:', nodes);
        console.log('KnowledgeGraphView edges:', edges);
    }, [nodes, edges]);

    // Multi-select view mode controls
    const handleToggleNodeType = (type: keyof KnowledgeGraphViewProps['visibleNodeTypes']) => {
        props.onVisibleNodeTypesChange({ ...props.visibleNodeTypes, [type]: !props.visibleNodeTypes[type] });
    };

    return (
        <div className="w-full h-full min-h-[600px] flex flex-col">
            {/* View mode toggles */}
            <div className="flex flex-wrap gap-2 mb-2">
                {Object.keys(props.visibleNodeTypes).map(type => (
                    <button
                        key={type}
                        className={`px-3 py-1 rounded text-sm font-medium border ${props.visibleNodeTypes[type as keyof KnowledgeGraphViewProps['visibleNodeTypes']] ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border-gray-300'}`}
                        onClick={() => handleToggleNodeType(type as keyof KnowledgeGraphViewProps['visibleNodeTypes'])}
                        aria-pressed={props.visibleNodeTypes[type as keyof KnowledgeGraphViewProps['visibleNodeTypes']]}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                ))}
            </div>
            {/* Graph Canvas */}
            <div className="flex-1 bg-black rounded shadow relative">
                {validNodes.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-400 text-lg">
                        No data to display. Check your filters and data sources.
                    </div>
                ) : (
                    <GraphCanvas
                        ref={graphRef}
                        nodes={validNodes}
                        edges={validEdges}
                        layoutType="forceDirected2d"
                        layoutOptions={{
                            nodeStrength: -200,
                            linkDistance: 200,
                            padding: 200
                        }}
                        zoom={2}
                        minZoom={0.2}
                        maxZoom={5}
                        pan={pan}
                        onZoom={setZoom}
                        onPan={setPan}
                        nodeLabel={(node) => node.label}
                        nodeFill={(node) => node.fill || '#888'}
                        edgeStroke="#bbb"
                        edgeWidth={1.5}
                        draggable
                        style={{ width: '100%', height: '100%' }}
                        onNodePointerOver={(node) => {/* show tooltip */}}
                        onNodePointerOut={() => {/* hide tooltip */}}
                    />
                )}
                {/* Zoom controls */}
                <div className="absolute top-2 right-2 flex flex-col gap-1 bg-white rounded shadow p-2">
                    <button onClick={() => setZoom(z => Math.min(z + 0.2, 3))} aria-label="Zoom in" className="p-1">＋</button>
                    <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} aria-label="Zoom out" className="p-1">－</button>
                    <button onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }} aria-label="Reset view" className="p-1">⟳</button>
                </div>
                {/* Legend */}
                <div className="absolute bottom-2 left-2 bg-white rounded shadow p-2 flex flex-wrap gap-2">
                    {Object.entries(NODE_TYPE_COLORS).map(([type, color]) => (
                        <span key={type} className="flex items-center gap-1 text-xs">
                            <span className="inline-block w-3 h-3 rounded-full" style={{ background: color }} />
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};
