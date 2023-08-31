import { Component, EventEmitter, Output, AfterViewInit, Input, ElementRef } from '@angular/core';
import Keyboard from 'simple-keyboard';
import {CdkDrag, CdkDragHandle} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-virtual-keyboard',
  templateUrl: './virtual-keyboard.component.html',
  styleUrls: ['./virtual-keyboard.component.css'],
  standalone: true,
  imports: [CdkDrag, CdkDragHandle],
})
export class VirtualKeyboardComponent implements AfterViewInit {
  keyboard!: Keyboard;

@Input()  selectedElement:HTMLInputElement  | undefined;
  value = '';
  @Output() veriGonderildi: EventEmitter<string> = new EventEmitter<string>();
  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onKeyPress: button => this.onKeyPress(button)
    });
  }
  onKeyPress = (button: string) => {
    this.selectedElement?.focus();
    if(this.selectedElement){
      this.selectedElement.value=this.selectedElement.value+button
    }
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === '{shift}' || button === '{lock}') this.handleShift();
  };

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };


}
