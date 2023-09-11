import { ClassicPreset } from "rete";
import { TextSocket } from "../sockets";

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

export class Message extends ClassicPreset.Node<
  {},
  { text: ClassicPreset.Socket },
  { value: ClassicPreset.InputControl<"text"> }
> {

  parameters: string;
  node_name_id = "endpoint"

  width = 180;
  height = 140;

  constructor(initial: string) {
    super("Message");

    this.parameters = "vacio " + Math.random() + initial

    this.addControl(
      "value",
      new ClassicPreset.InputControl("text", { initial })
    );
    this.addOutput("text", new ClassicPreset.Output(new TextSocket(), "Text"));
  }

  execute() {}

  data() {
    return {
      text: this.controls.value.value || ""
    };
  }
}
