import './style.css';
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/TabContainer.js";
import "@ui5/webcomponents/dist/Tab.js";
import "@ui5/webcomponents/dist/TabSeparator.js";

import "@ui5/webcomponents-fiori/dist/Bar.js";
import "@ui5/webcomponents/dist/Panel.js";
import "@ui5/webcomponents/dist/Card";
import "@ui5/webcomponents/dist/CardHeader.js";
import "@ui5/webcomponents-fiori/dist/Timeline.js";

//Icons
import "@ui5/webcomponents-icons/dist/AllIcons.js";

import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `

// `

setupCounter(document.querySelector('#counter'))
