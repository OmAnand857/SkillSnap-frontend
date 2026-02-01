import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Award, Settings, User } from 'lucide-react';
import { cn } from '../../utils/cn';

const Sidebar = ({ className }) => {
    const links = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'My Skills', path: '/dashboard/skills', icon: BookOpen },
        { name: 'Certifications', path: '/dashboard/certificates', icon: Award },
        { name: 'Profile', path: '/dashboard/profile', icon: User },
        { name: 'Settings', path: '/dashboard/settings', icon: Settings },
    ];

    return (
        <aside className={cn("w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 hidden lg:block h-screen sticky top-0 pt-20", className)}>
            <div className="px-4 py-4 space-y-1">
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) => cn(
                            "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium",
                            isActive
                                ? "bg-primary/10 text-primary"
                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        )}
                    >
                        <link.icon size={20} />
                        <span>{link.name}</span>
                    </NavLink>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;
