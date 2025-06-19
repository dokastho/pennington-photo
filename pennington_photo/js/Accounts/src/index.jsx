/**
 * Pennington Photographics
 *
 * TJ Dokas <mailto:tjdokas@gmail.com>
 */

import React from "react";
import { createRoot } from "react-dom/client";
import Accounts from "./Accounts";

const container = document.getElementById("reactEntry");
const root = createRoot(container);
root.render(<Accounts />);
