import React from 'react';
import { createRoot } from 'react-dom/client';
import Gallery from './Gallery';

const container = document.getElementById('reactEntry');
const root = createRoot(container);
root.render(<Gallery />);
