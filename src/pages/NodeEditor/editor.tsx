import { createRoot } from "react-dom/client";
import { NodeEditor, GetSchemes, ClassicPreset } from "rete";
import { AreaPlugin, AreaExtensions } from "rete-area-plugin";
import {
  ConnectionPlugin,
  Presets as ConnectionPresets
} from "rete-connection-plugin";
import { ReactPlugin, Presets, ReactArea2D } from "rete-react-plugin";
import { exportGraph } from "./export";
import { Button, Progress } from "antd";

import {
  ContextMenuExtra,
} from "rete-context-menu-plugin";

import {
Message
} from "./rete/nodes";
import { selector } from "rete-area-plugin/_types/extensions";

class ButtonControl extends ClassicPreset.Control {
  constructor(public label: string, public onClick: () => void) {
    super();
  }
}

class ProgressControl extends ClassicPreset.Control {
  constructor(public percent: number) {
    super();
  }
}

function CustomButton(props: { data: ButtonControl }): JSX.Element {
  return (
    <Button
      onPointerDown={(e) => e.stopPropagation()}
      onDoubleClick={(e) => e.stopPropagation()}
      onClick={props.data.onClick}
    >
      {props.data.label}
    </Button>
  );
}

function CustomProgress(props: { data: ProgressControl }) : JSX.Element {
  return <Progress type="circle" percent={props.data.percent} />;
}


class Node extends ClassicPreset.Node<
  { [key in string]: ClassicPreset.Socket },
  { [key in string]: ClassicPreset.Socket },
  {
    [key in string]:
      | ButtonControl
      | ProgressControl
      | ClassicPreset.Control
      | ClassicPreset.InputControl<"number">
      | ClassicPreset.InputControl<"text">;
  }
> {}
class Connection<
  A extends Node,
  B extends Node
> extends ClassicPreset.Connection<A, B> {}

//type Schemes = GetSchemes<Node, Connection<Node, Node>>;
//type AreaExtra = ReactArea2D<any>;

type Schemes = GetSchemes<
  ClassicPreset.Node,
  ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;
type AreaExtra = ReactArea2D<any> | ContextMenuExtra;

export let editor;

let test = true

export async function createEditor(container: HTMLElement) {
  const socket = new ClassicPreset.Socket("socket");

  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot });
  const selector = AreaExtensions.selector()
  const accumulating = AreaExtensions.accumulateOnCtrl()

  AreaExtensions.selectableNodes(area, selector, { accumulating });

  /*AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl()
  });*/




  render.addPreset(Presets.classic.setup());
  connection.addPreset(ConnectionPresets.classic.setup());

  editor.use(area);
  area.use(connection);
  area.use(render);

  AreaExtensions.simpleNodesOrder(area);

  const ab = new Message("Hello!");
  await editor.addNode(ab);

  const a = new ClassicPreset.Node("A");
  a.addControl("d", new ClassicPreset.InputControl("text", { initial: "a" }));
  a.addOutput("a", new ClassicPreset.Output(socket));
  await editor.addNode(a);

  const b = new ClassicPreset.Node("B");
  b.addControl("g", new ClassicPreset.InputControl("text", { initial: "b" }));
  b.addInput("b", new ClassicPreset.Input(socket));
  await editor.addNode(b);

  await editor.addConnection(new ClassicPreset.Connection(a, "a", b, "b"));

  await area.translate(a.id, { x: 0, y: 0 });
  await area.translate(b.id, { x: 270, y: 0 });

  area.addPipe(context => {
    
    if (context.type === 'nodepicked')
    {
      console.log("nodepicked")
      console.log("selector" + selector.pickId) 
      console.log("nodes" + JSON.stringify(editor.getNodes())) 

      let id : string = selector.pickId?.replace("node_", "") || "";
      let a = editor.getNodes().find(node => node.id === id);

      if(test)
      {
        a?.addOutput("rly", new ClassicPreset.Output(socket));
        test = false
      }
      area.update("node", id)

      let xd = a as Message

      console.log(xd?.holaTest)

      //[0].addOutput("rly", new ClassicPreset.Output(socket));
      //area.update()

    }

    return context
  })


  editor.addPipe(context => {
    
    /*if (context.type === 'nodecreate' || 
    context.type === 'nodecreated' ||
    context.type === 'noderemove' ||
    context.type === 'noderemoved' ||
    context.type === 'connectioncreate' ||
    context.type === 'connectioncreated' ||
    context.type === 'connectionremove' ||
    context.type === 'connectionremoved' ||
    context.type === 'clear' ||
    context.type === 'clearcancelled' ||
    context.type === 'cleared' 
    ) 
    {
    
    }*/
    console.clear()
      console.log("Nodes: " + JSON.stringify(editor.getNodes()))
      console.log("Connections: " + JSON.stringify(editor.getConnections()))
      console.log("Context: " + JSON.stringify(context))

      if(test)
      {
        console.log("editor.getNodes()[0].: " + editor.getNodes()[0])

        test = false
      }



      //console.log("EXPORT")
      //console.log(exportGraph(editor))
    
    return context
  })

  setTimeout(() => {
    // wait until nodes rendered because they dont have predefined width and height
    AreaExtensions.zoomAt(area, editor.getNodes());
  }, 10);
  return {
    destroy: () => area.destroy()
  };
}