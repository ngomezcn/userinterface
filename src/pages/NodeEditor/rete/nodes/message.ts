import "rete";

import { ClassicPreset } from "rete";
import { TextSocket, ActionSocket } from "../sockets";

class Greeter {
  pruebaLoca: string;
 
  constructor() {
    this.pruebaLoca = "asdasdasdasdasd";
  }
}
export class Message extends ClassicPreset.Node<
  { exec: ClassicPreset.Socket; text: ClassicPreset.Socket },
  { text: ClassicPreset.Socket },
  { value: ClassicPreset.InputControl<"text"> }
> {
  width = 180;
  height = 140;

  holaTest : Greeter;

  constructor(initial: string) {
    super("Endpoint");
    
    this.holaTest = new Greeter();
  
    this.addControl(
      "value",
      new ClassicPreset.InputControl("text", { initial })
    );
    this.addOutput("text", new ClassicPreset.Output(new TextSocket(), "Text"));
    this.addInput(
      "exec",
      new ClassicPreset.Input(new ActionSocket(), "Action")
    );
    
  }

  execute() {}

  data() {
    return {
      text: this.controls.value.value || ""
    };
  }
}
