import "rete";

import { ClassicPreset } from "rete";
import { TextSocket, ActionSocket } from "../sockets";

class ApikeyParameters {
  Key: string = '';
  Value: string = '';
  AddTo: 'header' | 'query_params' = 'header';
}

class EndpointParameters {
  AuthType: string = '';
  ApikeyParameters: ApikeyParameters = new ApikeyParameters();
  BaseUrl: string = '';
  Method: string = '';
  Headers: { [key: string]: string } = {};
  QueryParameters: { [key: string]: string } = {};
  ContentType: string = '';
  Username: string = '';
  Password: string = '';
  BearerToken: string = '';
  RawData: Uint8Array = new Uint8Array(1);
  FormFields: { [key: string]: string } = {};
  JsonBody: string = '';
}

export class EndpointRestApi extends ClassicPreset.Node<
  { exec: ClassicPreset.Socket; text: ClassicPreset.Socket },
  { text: ClassicPreset.Socket },
  { value: ClassicPreset.InputControl<"text"> }
> implements ICustomNode {

  objectParameters: EndpointParameters = new EndpointParameters();
  nodeJsonParameters: string = "";
  id_name: string = "";

  constructor(initial: string) {
    super("Endpoint Rest APi");

    this.addOutput("text", new ClassicPreset.Output(new TextSocket(), "Text"));
    this.addInput(
      "exec",
      new ClassicPreset.Input(new ActionSocket(), "Action")
    );
  }
}

export class Message extends ClassicPreset.Node<
  { exec: ClassicPreset.Socket; text: ClassicPreset.Socket },
  { text: ClassicPreset.Socket },
  { value: ClassicPreset.InputControl<"text"> }
> {

  parameters: string;
  node_name_id = "endpoint"

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
