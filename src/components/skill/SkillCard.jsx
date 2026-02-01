import React from 'react';
import { Clock, BarChart, ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import { cn } from '../../utils/cn';

const SkillCard = ({ skill, onStart }) => {
    const difficultyColor = {
        'Beginner': 'text-green-500 bg-green-50 dark:bg-green-900/20',
        'Intermediate': 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20',
        'Advanced': 'text-red-500 bg-red-50 dark:bg-red-900/20',
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 p-6 flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                    {/* Placeholder for icon, assuming skill object has an icon component or url, using text for now if not */}
                    <span className="text-2xl font-bold">{skill.icon || skill.name.charAt(0)}</span>
                </div>
                <span className={cn("px-3 py-1 rounded-full text-xs font-medium", difficultyColor[skill.difficulty])}>
                    {skill.difficulty}
                </span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{skill.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-grow">
                {skill.description}
            </p>

            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    {skill.duration} mins
                </div>
                <div className="flex items-center">
                    <BarChart size={16} className="mr-1" />
                    {skill.questions} Questions
                </div>
            </div>

            <Button onClick={() => onStart(skill.id)} className="w-full group">
                Start Assessment
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
        </div>
    );
};

export default SkillCard;
