import { Component, EventEmitter, Output, AfterViewInit } from '@angular/core';
import Keyboard from 'simple-keyboard';

@Component({
  selector: 'app-virtual-keyboard',
  templateUrl: './virtual-keyboard.component.html',
  styleUrls: ['./virtual-keyboard.component.css']
})
export class VirtualKeyboardComponent implements AfterViewInit {
  keyboard!: Keyboard;



  value = '';



  @Output() veriGonderildi: EventEmitter<string> = new EventEmitter<string>();
  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button)
    });
  }

  onChange = (input: string) => {
    this.value = input;
    this.veriGonderildi.emit(this.value);

    console.log('Input changed', input);
  };

  onKeyPress = (button: string) => {
    console.log('Button pressed', button);


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
