/**
 * WordPress Dependencies
 */
import { createRoot } from "@wordpress/element";

/**
 * Internal Dependencies
 */
// import RequestForm from "./form";
import RequestBikeForm from "./RequestBikeForm";
import "./style.scss";

const domNode = document.getElementById("rt-request-bike-form");
const root = createRoot(domNode);
// root.render(<RequestForm />);
root.render(<RequestBikeForm />);
