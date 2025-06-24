/**
 * Pennington Photographics
 *
 * TJ Dokas <mailto:tjdokas@gmail.com>
 */

import React from "react";
import { createRoot } from "react-dom/client";
import Contact from "./Contact";

const container = document.getElementById("reactEntry");
const root = createRoot(container);
root.render(<Contact />);
