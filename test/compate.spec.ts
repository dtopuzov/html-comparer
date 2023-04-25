import { compareHtml } from "../src";

const expectedMarkup = `
<span class="k-dropdownlist k-picker k-picker-md k-picker-solid k-rounded-md">
  <span class="k-input-inner">
    DropdownList
  </span>
  <button class="k-input-button k-button k-button-md k-button-solid k-button-solid-base k-icon-button">
    <span class="k-button-icon k-svg-icon k-svg-i-caret-alt-down">
      <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M256 352 128 160h256L256 352z">
        </path>
      </svg>
    </span>
  </button>
</span>
`;

const jqueryMarkup = `
<span title="" class="k-picker k-dropdownlist k-picker-solid k-picker-md k-rounded-md" unselectable="on" role="combobox">
    <span class="k-input-inner">
        <span class="k-input-value-text">Chai</span>
    </span>
    <span role="button" class="k-input-button k-button k-button-md k-button-solid k-button-solid-base k-icon-button" aria-label="select" type="button">
        <span class="k-icon k-i-caret-alt-down k-button-icon"></span>
    </span>
    <input id="products" data-role="dropdownlist" style="display: none;">
</span>
`;

const angularMarkup = `
<kendo-dropdownlist _ngcontent-qxg-c233="" class="k-picker-md k-rounded-md k-picker-solid k-dropdownlist k-picker" ng-reflect-size="medium" ng-reflect-rounded="medium" ng-reflect-fill-mode="solid" ng-reflect-data="Afghanistan,Albania,Algeria,Am" aria-describedby="k-89785368-ab8b-400a-9e11-c112dd6ec8e4" id="k-fe93443d-7535-4557-b434-347317ecf48b" dir="ltr" tabindex="0" role="combobox" aria-haspopup="listbox" aria-expanded="false"><!--bindings={
    "ng-reflect-popup-label": "Options list"
  }--><span unselectable="on" class="k-input-inner" id="k-89785368-ab8b-400a-9e11-c112dd6ec8e4"><span class="k-input-value-text"><!--bindings={}-->Andorra<!--bindings={
    "ng-reflect-ng-if": "true"
  }--></span></span><button tabindex="-1" unselectable="on" type="button" class="k-input-button k-button k-icon-button k-button-md k-button-solid k-button-solid-base" ng-reflect-ng-class="k-button-md k-button-solid k-b" ng-reflect-events="[object Object]" aria-label="Select"><kendo-icon-wrapper unselectable="on" name="caret-alt-down" ng-reflect-name="caret-alt-down" ng-reflect-svg-icon="[object Object]" class="k-icon-wrapper-host"><kendo-icon ng-reflect-ng-class="" class="k-i-caret-alt-down k-icon" ng-reflect-name="caret-alt-down" aria-hidden="true"></kendo-icon><!--bindings={
    "ng-reflect-ng-if-else": "[object Object]"
  }--><!--container--><!--bindings={
    "ng-reflect-ng-if-else": "[object Object]"
  }--><!--container--></kendo-icon-wrapper><!--bindings={
    "ng-reflect-ng-if": "true"
  }--><!--bindings={}--></button><!--container--><!--bindings={
    "ng-reflect-ng-if": "false"
  }--><!--ng-container--><responsive-renderer ng-reflect-shared-popup-action-sheet-template="[object Object]" ng-reflect-title="" ng-reflect-show-text-input="false" ng-reflect-subtitle=""><kendo-actionsheet ng-reflect-animation="[object Object]" dir="ltr" style="--kendo-actionsheet-height: 60vh; --kendo-actionsheet-max-height: none"><!--bindings={}--></kendo-actionsheet></responsive-renderer><!--container--></kendo-dropdownlist>
`;

test('should compare exact same files', () => {
  const result = compareHtml(expectedMarkup, expectedMarkup);
  expect(result.passed.length).toBe(4);
  expect(result.extra.length).toBe(0);
  expect(result.missing.length).toBe(0);
});

test('should compare dropdown with jquery implementation', () => {
  const result = compareHtml(jqueryMarkup, expectedMarkup);
  expect(result.passed.length).toBe(3);
  expect(result.extra.length).toBe(2);
  expect(result.missing.length).toBe(1);
});

test('should compare dropdown with angular implementation', () => {
  const result = compareHtml(angularMarkup, expectedMarkup);
  expect(result.passed.length).toBe(3);
  expect(result.extra.length).toBe(3);
  expect(result.missing.length).toBe(1);
});

test('should be able to pass empty ignore list', () => {
  const result = compareHtml(angularMarkup, expectedMarkup, { allowExtra: [], allowMissing: [] });
  expect(result.passed.length).toBe(3);
  expect(result.extra.length).toBe(3);
  expect(result.missing.length).toBe(1);
});

test('should be able to ignore missing elements using full path', () => {
  const result = compareHtml(angularMarkup, expectedMarkup, {
    allowMissing: [
      '.k-dropdownlist.k-picker.k-picker-md.k-picker-solid.k-rounded-md .k-button.k-button-md.k-button-solid.k-button-solid-base.k-icon-button.k-input-button .k-button-icon.k-svg-i-caret-alt-down.k-svg-icon'
    ]
  });

  expect(result.missing).toEqual([]);
});


test('should be able to ignore missing elements by partial css selector', () => {
  const result = compareHtml(angularMarkup, expectedMarkup, {
    allowMissing: [
      '.k-button-icon.k-svg-i-caret-alt-down.k-svg-icon'
    ]
  });

  expect(result.missing).toEqual([]);
});