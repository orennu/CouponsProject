import { 
    Directive, 
    HostBinding, 
    HostListener, 
   } from '@angular/core';
  
  @Directive({
    selector: '[appDropdown]',
    exportAs: 'appDropdown'
  })
  export class DropdownDirective {
  
    @HostBinding('class.open') isOpen = false;
  
    @HostListener('click') toggleOpen(eventData: Event) {
      this.isOpen = !this.isOpen;
    }
  
    @HostListener('mouseenter') mouseEnter(eventData: Event) {
      this.isOpen = true;
    }
  
    @HostListener('mouseleave') mouseLeave(eventData: Event) {
      this.isOpen = false;
    }
  
  }
  