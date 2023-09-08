import "rete";

import { ClassicPreset } from "rete";
import { TextSocket, ActionSocket } from "../sockets";

export class Message extends ClassicPreset.Node<
  { exec: ClassicPreset.Socket; text: ClassicPreset.Socket },
  { text: ClassicPreset.Socket },
  { value: ClassicPreset.InputControl<"text"> }
> {


  parameters: string;

  constructor(initial: string) {
    super("Endpoint");

    this.parameters = "vacio " + Math.random() + initial

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

  execute() { }

  data() {

    return {
      text: this.controls.value.value || ""
    };
  }
}
