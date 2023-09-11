import { createRoot } from "react-dom/client";
import { NodeEditor } from "rete";
import { AreaPlugin, AreaExtensions } from "rete-area-plugin";
import {
  ClassicFlow,
  ConnectionPlugin,
  getSourceTarget,
} from "rete-connection-plugin";
import { ReactPlugin, Presets, ReactArea2D } from "rete-react-plugin";
import {
  AutoArrangePlugin,
  Presets as ArrangePresets,
} from "rete-auto-arrange-plugin";
import { DataflowEngine, ControlFlowEngine } from "rete-engine";
import {
  ContextMenuExtra,
  ContextMenuPlugin,
  Presets as ContextMenuPresets,
} from "rete-context-menu-plugin";
import {
  DebugChat,
  Message,
  OnMessage,
  MatchMessage,
  SendMessage,
} from "./rete/nodes";
import { ActionSocket, TextSocket } from "./rete/sockets";
import { Schemes } from "./rete/types";
import { Connection } from "./rete/connection";
import { ActionSocketComponent } from "./rete/ui/ActionSocket";
import { TextSocketComponent } from "./rete/ui/TextSocket";
import { ActionConnectionComponent } from "./rete/ui/ActionConnection";
import { TextConnectionComponent } from "./rete/ui/TextConnection";
import { ChatNodeComponent } from "./rete/ui/Chat";
import { CustomNodeComponent } from "./rete/ui/CustomNode";
import { getConnectionSockets } from "./rete/utils";
import { addCustomBackground } from "./rete/ui/background";
import * as ContextMenuComponents from "./rete/ui/context-menu";
import {
  importNodes,
  importConnections,
  exportNodes,
  exportConnections,
} from "./export";
import { forEach } from "lodash";
import { object } from "yup";

type AreaExtra = ReactArea2D<any> | ContextMenuExtra;

export let editor;
export let socket;
export let area;
export let nodeEditorNodes: any;
export let nodeEditorConnections: any;

let lastAreaEvent = "";

export async function createEditor(
  container: HTMLElement,
  setNodeToParameters: (type: Message) => void,
  hideParams: () => void,
  getImportData: () => string[]
) {
  editor = new NodeEditor<Schemes>();
  area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot });
  //const arrange = new AutoArrangePlugin<Schemes, AreaExtra>();
  const selector = AreaExtensions.selector();

  const dataflow = new DataflowEngine<Schemes>(({ inputs, outputs }) => {
    return {
      inputs: () =>
        Object.entries(inputs)
          .filter(([_, input]) => input.socket instanceof TextSocket)
          .map(([name]) => name),
      outputs: () =>
        Object.entries(outputs)
          .filter(([_, output]) => output.socket instanceof TextSocket)
          .map(([name]) => name),
    };
  });
  const engine = new ControlFlowEngine<Schemes>(({ inputs, outputs }) => {
    return {
      inputs: () =>
        Object.entries(inputs)
          .filter(([_, input]) => input.socket instanceof ActionSocket)
          .map(([name]) => name),
      outputs: () =>
        Object.entries(outputs)
          .filter(([_, output]) => output.socket instanceof ActionSocket)
          .map(([name]) => name),
    };
  });
  function respond(text: string) {
    setTimeout(() => {
      chat.botSend(text);
    }, 500);
  }
  const contextMenu = new ContextMenuPlugin<Schemes>({
    items: ContextMenuPresets.classic.setup([
      ["On message", () => new OnMessage()],
      ["Message", () => new Message("")],
      ["Match message", () => new MatchMessage("", dataflow)],
      ["Send message", () => new SendMessage(dataflow, respond)],
    ]),
  });
  area.use(contextMenu);

  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl(),
  });

  /*render.addPreset(
    Presets.contextMenu.setup({
      customize: {
        main: () => ContextMenuComponents.Menu,
        item: () => ContextMenuComponents.Item,
        common: () => ContextMenuComponents.Common,
        search: () => ContextMenuComponents.Search,
        subitems: () => ContextMenuComponents.Subitems
      }
    })
  );*/

  render.addPreset(Presets.contextMenu.setup());
  render.addPreset(
    Presets.classic.setup({
      customize: {
        connection(data) {
          const { source, target } = getConnectionSockets(editor, data.payload);

          if (
            source instanceof ActionSocket ||
            target instanceof ActionSocket
          ) {
            return ActionConnectionComponent;
          }
          return TextConnectionComponent;
        },
        socket(data) {
          if (data.payload instanceof ActionSocket) {
            return ActionSocketComponent;
          }
          if (data.payload instanceof TextSocket) {
            return TextSocketComponent;
          }
          return Presets.classic.Socket;
        },
        node(data) {
          if (data.payload instanceof DebugChat) {
            return ChatNodeComponent;
          }
          return CustomNodeComponent;
        },
      },
    })
  );

  //arrange.addPreset(ArrangePresets.classic.setup());

  area.addPipe((context) => {
    // Guardar los nodos y conexiones en cada evento
    nodeEditorNodes = JSON.stringify(exportNodes(editor));
    nodeEditorConnections = JSON.stringify(exportConnections(editor));

    if (lastAreaEvent === "pointerdown" && context.type === "pointerup") {
      hideParams();
    }

    if (context.type === "nodepicked") {
      let id: string = selector.pickId?.replace("node_", "") || "";
      let selectedNode = editor.getNodes().find((node) => node.id === id);

      //setNodeToParameters(selectedNode as Message); // TODO DESCOMENTAR ESTO ES PARA LOS DETALLES DE LA BARRA LATERAL
    }
    lastAreaEvent = context.type;
    return context;
  });

  /*await importNodes(
    editor,
    JSON.parse(getImportData()[0]) as Object[],
    JSON.parse(getImportData()[1]) as Object[]
  );*/

  connection.addPreset(
    () =>
      new ClassicFlow({
        canMakeConnection(from, to) {
          // this function checks if the old connection should be removed
          const [source, target] = getSourceTarget(from, to) || [null, null];

          if (!source || !target || from === to) return false;

          const sockets = getConnectionSockets(
            editor,
            new Connection(
              editor.getNode(source.nodeId),
              source.key as never,
              editor.getNode(target.nodeId),
              target.key as never
            )
          );
          //console.//log(sockets);

          /*if (!sockets.source.isCompatibleWith(sockets.target)) {
            //log("Sockets are not compatible", "error");
            connection.drop();
            return false;
          }*/

          return Boolean(source && target);
        },
        makeConnection(from, to, context) {
          const [source, target] = getSourceTarget(from, to) || [null, null];
          const { editor } = context;

          if (source && target) {
            editor.addConnection(
              new Connection(
                editor.getNode(source.nodeId),
                source.key as never,
                editor.getNode(target.nodeId),
                target.key as never
              )
            );
            return true;
          }
        },
      })
  );

  editor.use(engine);
  editor.use(dataflow);
  editor.use(area);
  area.use(connection);
  area.use(render);
  //area.use(arrange);

  AreaExtensions.simpleNodesOrder(area);
  AreaExtensions.showInputControl(area);

  editor.addPipe((context) => {
    if (context.type === "connectioncreate") {
      const { data } = context;
      const { source, target } = getConnectionSockets(editor, data);

      /*if (!source.isCompatibleWith(target)) {
        //log("Sockets are not compatible", "error");
        return;
      }*/
    }
    return context;
  });

  addCustomBackground(area);

  const onMessage = new OnMessage();
  const onMessage2 = new OnMessage();
  const match = new MatchMessage(".*hello.*", dataflow);
  const message1 = new Message("Hello!");
  const message2 = new Message("ッWTF");
  const send1 = new SendMessage(dataflow, respond);
  const send2 = new SendMessage(dataflow, respond);

  const chat = new DebugChat((message) => {
    area.update("node", chat.id);
    if (message.own) {
      const onMessage = editor
        .getNodes()
        .filter((n): n is OnMessage => n instanceof OnMessage);
      dataflow.reset();

      for (const node of onMessage) {
        node.inputMessage = message.message;
        engine.execute(node.id);
      }
    }
  });

  const con1 = new Connection(onMessage, "exec", match, "exec");
  const con2 = new Connection(onMessage, "text", match, "text");
  const con3 = new Connection(message1, "text", send1, "text");
  const con4 = new Connection(message2, "text", send2, "text");
  const con5 = new Connection(match, "consequent", send1, "exec");
  const con6 = new Connection(match, "alternate", send2, "exec");

  const nodesToImport = (await JSON.parse(getImportData()[0])) as any;
  const connectionsToImport = (await JSON.parse(getImportData()[1])) as any;
  await importNodes(nodesToImport, editor);

  const tempNode = new OnMessage()
  await editor.addNode(tempNode)

  //console.log("importConnections " + JSON.stringify(node))

  /*let ddd = await editor.getNodes()
  //console.log("editor.getNodes() " + JSON.stringify(ddd))

  let node1 = await editor.getNode("763cc68943c4a705")
  console.log("node1 " + JSON.stringify(node1))

  let node2 = await editor.getNode("a6f83fc6de449e97")
  console.log("node2 " + JSON.stringify(node2))

  const whats = new Connection(node1, "exec", node2, "exec");
  await editor.addConnection(whats);*/

  console.log("connectionsToImport " + JSON.stringify(connectionsToImport.connections))
  for(let con of connectionsToImport.connections)
  {
    let node1 = await editor.getNode(con.source)
    console.log("node1 " + JSON.stringify(node1))
  
    let node2 = await editor.getNode(con.target)
    console.log("node2 " + JSON.stringify(node2))

    const whats = new Connection(node1, con.sourceOutput, node2, con.targetInput);
    await editor.addConnection(whats);
  }

  //await importConnections(connectionsToImport, editor);

  //await editor.addNode(onMessage);
  //await editor.addNode(onMessage2);
  /*await editor.addNode(match);
  await editor.addNode(message1);
  await editor.addNode(message2);
  await editor.addNode(send1);
  await editor.addNode(send2);
  await editor.addNode(chat);

  await editor.addConnection(con1);
  await editor.addConnection(con2);
  await editor.addConnection(con3);
  await editor.addConnection(con4);
  await editor.addConnection(con5);
  await editor.addConnection(con6);*/

  //console.log("AAAAAAAAAAAAAAAAAA " + editor.getNodes())

  const av = await exportNodes(editor);
  //console.log("A2 " + av)
  //await arrange.layout();

  await area.translate(chat.id, { x: 1000, y: 500 });

  AreaExtensions.zoomAt(area, editor.getNodes());

  chat.botSend(
    "Hello there! I'm a rete based on visual programming and built using the Rete.js framework"
  );
  chat.botSend("btw, check out the [Rete.js website](https://retejs.org)");
  chat.botSend(
    "Additionally, you have the option to back my creator [on Patreon](https://www.patreon.com/bePatron?u=7890937)"
  );

  return {
    destroy: () => area.destroy(),
  };
}
