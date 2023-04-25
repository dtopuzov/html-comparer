import sanitizeHtml from 'sanitize-html';
import jsdom from "jsdom";

type CompereOptions = {
  allowMissing?: string[];
  allowExtra?: string[];
}

type Result = {
  passed: string[];
  missing: string[];
  extra: string[];
}

/**
 * Check if two html documents have same class hierarchy.
 *
 * @example
 * await compareHtml("<div class="set">SET</div>", "<div class="qa">QA</div>");
 *
 * @param actualHtml An html object.
 * @param expectedHtml An html object.
 */
export function compareHtml(actualHtml: string, expectedHtml: string, options?: CompereOptions): Result {
  const passed: string[] = [];
  const missing: string[] = [];
  const extra: string[] = [];
  const result: Result = { passed, missing, extra };

  const config = {
    allowedTags: false,
    allowVulnerableTags: true,
    allowedAttributes: { '*': ['class'] }
  };

  const actualDom = new jsdom.JSDOM(sanitizeHtml(actualHtml, config)).window.document.documentElement;
  const expectedDom = new jsdom.JSDOM(sanitizeHtml(expectedHtml, config)).window.document.documentElement;


  let actualSelectors = [];
  let parent = '';
  parseDom(actualDom, actualSelectors, parent);

  parent = '';
  let expectedSelectors = [];
  parseDom(expectedDom, expectedSelectors);

  result.passed = actualSelectors.filter(element => expectedSelectors.includes(element));
  result.extra = actualSelectors.filter(element => !expectedSelectors.includes(element));
  result.missing = expectedSelectors.filter(element => !actualSelectors.includes(element));

  if (options?.allowExtra != undefined) {
    for (const extraItem of options?.allowExtra) {
      result.extra = result.extra.filter(item => !item.includes(extraItem));
    }
  }

  if (options?.allowMissing != undefined) {
    for (const missingItem of options?.allowMissing) {
      result.missing = result.missing.filter(item => !item.includes(missingItem));
    }
  }

  return result;
}

function parseDom(node: Element, attributes: string[], parent = '') {
  if (node == null) {
    return;
  }

  let newParent = parent;
  if (node.attributes[0] != undefined) {
    attributes.push(`${parent}.${node.attributes[0].value.split(' ').sort().join('.')}`);
    newParent = `${parent}.${node.attributes[0].value.split(' ').sort().join('.')} `;
  }

  parseDom(node.firstElementChild, attributes, newParent);
  parseDom(node.nextElementSibling, attributes, parent);
}