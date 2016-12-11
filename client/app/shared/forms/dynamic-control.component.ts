import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';

import { ControlBase }     from './controls/control-base';

@Component({
  selector: 'dynamic-control',
  templateUrl: 'dynamic-control.component.html'
})
export class DynamicFormControlComponent {

  @Input() 
  control: ControlBase<any>;
  
  @Input() 
  form: FormGroup;

  get isValid() { 
    return this.form.controls[this.control.key].valid; 
  }

  onDropdownFocus(dropdown) {
    /**
     * Override default PrimeNG dropdown panel positioning which calculates it refering to the viewport area, causing the dropdown overflows
     * down under a container that allows scrolling overflow-y. We need to display the panel under the dropdown by default but above if there's not enough space. 
     * The code below re-position the panel by taking in account the space available within the <main> element of app. 
     */
    if (dropdown.itemClick) {
      dropdown.panelVisible = false
    }
    else {
      var mainContainer = this._getParentFormElementByTag(dropdown.el.nativeElement, 'MAIN');
      // Position panel according to available space in <main> container
      this._relativePosition(dropdown, mainContainer);
      dropdown.panelVisible = true;
    }
  }

  _getParentFormElementByTag(el, tagName) {
      // while ((el = el.parentElement) && !el.classList.contains(cls)); get parent element by class
      while ((el = el.parentElement) && (el.tagName !== tagName));
        return el;
  }

  /**
   * Dropdown positioning
   */
  _relativePosition(dropdown, mainContainer) {
      var elementDimensions = dropdown.domHandler.getHiddenElementDimensions(dropdown.panel);
      var targetHeight = dropdown.container.offsetHeight;
      var targetWidth = dropdown.container.offsetWidth;
      var targetOffset = dropdown.container.getBoundingClientRect();
      var top, left;
      if ((targetOffset.top + targetHeight + elementDimensions.height) > mainContainer.offsetHeight)
          top = -1 * (elementDimensions.height);
      else
          top = targetHeight;
      if ((targetOffset.left + elementDimensions.width) > mainContainer.offsetWidth)
          left = targetWidth - elementDimensions.width;
      else
          left = 0;
      dropdown.panel.style.top = top + 'px';
      dropdown.panel.style.left = left + 'px';
      dropdown.panel.style.display = 'block';
  }
}