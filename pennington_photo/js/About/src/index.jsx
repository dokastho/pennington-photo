import React from 'react';
import { createRoot } from 'react-dom/client';
import About from './About';

const container = document.getElementById('reactEntry');
const root = createRoot(container);
root.render(<About />);
