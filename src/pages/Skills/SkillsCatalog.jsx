import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import SkillCard from '../../components/skill/SkillCard';
import { Search } from 'lucide-react';
import Input from '../../components/common/Input';

const SkillsCatalog = () => {
    const navigate = useNavigate();

    const skills = [
        {
            id: 1,
            name: 'JavaScript',
            icon: 'JS',
            difficulty: 'Intermediate',
            duration: 45,
            questions: 30,
            description: 'Test your knowledge of ES6+, closures, promises, and async programming.'
        },
        {
            id: 2,
            name: 'Python',
            icon: 'PY',
            difficulty: 'Beginner',
            duration: 30,
            questions: 20,
            description: 'Assess your understanding of Python syntax, data structures, and algorithms.'
        },
        {
            id: 3,
            name: 'React',
            icon: '⚛️',
            difficulty: 'Advanced',
            duration: 60,
            questions: 40,
            description: 'Validate your expertise in hooks, context, state management, and performance.'
        },
        {
            id: 4,
            name: 'CSS Mastery',
            icon: '#',
            difficulty: 'Intermediate',
            duration: 40,
            questions: 25,
            description: 'Prove your skills in Flexbox, Grid, animations, and responsive design.'
        },
        {
            id: 5,
            name: 'Node.js',
            icon: '🟢',
            difficulty: 'Advanced',
            duration: 50,
            questions: 35,
            description: 'Server-side JavaScript, APIs, event loop, and file system operations.'
        },
        {
            id: 6,
            name: 'SQL',
            icon: '🗃️',
            difficulty: 'Intermediate',
            duration: 45,
            questions: 30,
            description: 'Querying databases, joins, normalization, and optimization techniques.'
        }
    ];

    const handleStartAssessment = (skillId) => {
        navigate(`/assessment/${skillId}/instructions`);
    };

    return (
        <PageWrapper>
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div className="max-w-xl">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Explore Skills
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Choose an assessment to validate your knowledge and earn a certificate.
                        </p>
                    </div>

                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search skills..."
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-colors"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skills.map((skill) => (
                        <SkillCard
                            key={skill.id}
                            skill={skill}
                            onStart={handleStartAssessment}
                        />
                    ))}
                </div>
            </div>
        </PageWrapper>
    );
};

export default SkillsCatalog;
