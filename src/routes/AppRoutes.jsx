import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/Landing/LandingPage';

import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import Dashboard from '../pages/Dashboard/Dashboard';

import Instructions from '../pages/Assessment/Instructions';
import Test from '../pages/Assessment/Test';
import Results from '../pages/Assessment/Results';

import SkillsCatalog from '../pages/Skills/SkillsCatalog';
import Certificate from '../pages/Certification/Certificate';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
                <Route path="/skills" element={<SkillsCatalog />} />
                <Route path="/assessment/:skillId/instructions" element={<Instructions />} />
                <Route path="/assessment/:skillId/test" element={<Test />} />
                <Route path="/assessment/:skillId/results" element={<Results />} />
                <Route path="/certificate/:id" element={<Certificate />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
