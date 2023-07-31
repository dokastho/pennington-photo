import React from 'react';
import { createRoot } from 'react-dom/client';
import Sizing from './Sizing';

const container = document.getElementById('reactEntry');
const root = createRoot(container);
root.render(<Sizing />);
