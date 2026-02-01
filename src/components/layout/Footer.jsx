import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="border-t bg-white dark:bg-gray-900 dark:border-gray-700 transition-colors">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xs">
                                S
                            </div>
                            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                SkillSnap
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Empowering developers to validate their skills and earn recognized certifications.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                            <li><Link to="/skills" className="hover:text-primary">Skills Catalog</Link></li>
                            <li><Link to="/pricing" className="hover:text-primary">Pricing</Link></li>
                            <li><Link to="/enterprise" className="hover:text-primary">For Enterprise</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                            <li><Link to="/help" className="hover:text-primary">Help Center</Link></li>
                            <li><Link to="/terms" className="hover:text-primary">Terms of Service</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Connect</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-500 hover:text-primary dark:hover:text-primary transition-colors">
                                <Github size={20} />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-primary dark:hover:text-primary transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-primary dark:hover:text-primary transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()} SkillSnap. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
