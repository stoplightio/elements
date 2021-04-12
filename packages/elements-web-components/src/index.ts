import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faChevronRight, faCube } from '@fortawesome/free-solid-svg-icons';

import { ApiElement, StoplightProjectElement } from './components';

library.add(faChevronDown, faChevronRight, faCube);

window.customElements.define('elements-stoplight-project', StoplightProjectElement);
window.customElements.define('elements-api', ApiElement);
dom.watch();
