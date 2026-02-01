import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

import { AssessmentProvider } from './context/AssessmentContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AssessmentProvider>
          <AppRoutes />
        </AssessmentProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
