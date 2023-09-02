import { createRoot } from "react-dom/client";
import { NodeEditor } from "rete";
import { AreaPlugin, AreaExtensions } from "rete-area-plugin";
import {
  HistoryExtensions,
  HistoryPlugin,
  Presets as HistoryPresets
} from "rete-history-plugin";
import {
  ClassicFlow,
  ConnectionPlugin,
  getSourceTarget
} from "rete-connection-plugin";
import { ReactPlugin, Presets, ReactArea2D } from "rete-react-plugin";
import {
  AutoArrangePlugin,
  Presets as ArrangePresets
} from "rete-auto-arrange-plugin";
import { DataflowEngine, ControlFlowEngine } from "rete-engine";
import {
  ContextMenuExtra,
  ContextMenuPlugin,
  Presets as ContextMenuPresets
} from "rete-context-menu-plugin";
import {
  DebugChat,
  Message,
  OnMessage,
  MatchMessage,
  SendMessage
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
import { NewNode } from "./rete/nodes/new-node"

type AreaExtra = ReactArea2D<any> | ContextMenuExtra;

export let editor; // Variable global para almacenar el editor

export async function createEditor(
  container: HTMLElement,
  log: (text: string, type: "info" | "error") => void
) {
  editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot });
  const arrange = new AutoArrangePlugin<Schemes, AreaExtra>();
  const history = new HistoryPlugin<Schemes>();

  HistoryExtensions.keyboard(history);

  history.addPreset(HistoryPresets.classic.setup());

  const dataflow = new DataflowEngine<Schemes>(({ inputs, outputs }) => {
    return {
      inputs: () =>
        Object.entries(inputs)
          .filter(([_, input]) => input.socket instanceof TextSocket)
          .map(([name]) => name),
      outputs: () =>
        Object.entries(outputs)
          .filter(([_, output]) => output.socket instanceof TextSocket)
          .map(([name]) => name)
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
          .map(([name]) => name)
    };
  });
  function respond(text: string) {
    setTimeout(() => {
      //chat.botSend(text);
    }, 500);
  }
  const contextMenu = new ContextMenuPlugin<Schemes>({
    items: ContextMenuPresets.classic.setup([
      ["On message", () => new OnMessage()],
      ["Message", () => new Message("")],
      ["Match message", () => new MatchMessage("", dataflow)],
      ["Send message", () => new SendMessage(dataflow, respond)]
    ])
  });
  area.use(contextMenu);

  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl()
  });

  render.addPreset(
    Presets.contextMenu.setup({
      customize: {
        main: () => ContextMenuComponents.Menu,
        item: () => ContextMenuComponents.Item,
        common: () => ContextMenuComponents.Common,
        search: () => ContextMenuComponents.Search,
        subitems: () => ContextMenuComponents.Subitems
      }
    })
  );
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
        }
      }
    })
  );

  arrange.addPreset(ArrangePresets.classic.setup());

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
          console.log(sockets);

          if (!sockets.source.isCompatibleWith(sockets.target)) {
            log("Sockets are not compatible", "error");
            connection.drop();
            return false;
          }

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
        }
      })
  );

  editor.use(engine);
  editor.use(dataflow);
  editor.use(area);
  area.use(connection);
  area.use(render);
  area.use(arrange);
  area.use(history);

  AreaExtensions.simpleNodesOrder(area);
  AreaExtensions.showInputControl(area);

  editor.addPipe((context) => {
    if (context.type === "connectioncreate") {
      const { data } = context;
      const { source, target } = getConnectionSockets(editor, data);

      if (!source.isCompatibleWith(target)) {
        log("Sockets are not compatible", "error");
        return;
      }
    }
    return context;
  });

  //addCustomBackground(area);

  const onMessage = new OnMessage();
  const match = new MatchMessage(".*hello.*", dataflow);
  //const match1 = new NewNode(".*hello.*", dataflow);
  const message1 = new Message("Hello!");
  const message2 = new Message("ッWTF");
  const send1 = new SendMessage(dataflow, respond);
  const send2 = new SendMessage(dataflow, respond);

  /*const chat = new DebugChat((message) => {
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
  });*/


  //await editor.addNode(chat);

  const con1 = new Connection(onMessage, "exec", match, "exec");
  const con2 = new Connection(onMessage, "text", match, "text");
  const con3 = new Connection(message1, "text", send1, "text");
  const con4 = new Connection(message2, "text", send2, "text");
  const con5 = new Connection(match, "consequent", send1, "exec");
  const con6 = new Connection(match, "alternate", send2, "exec");
  
  const match1 = new Message("test");
  await editor.addNode(match1);

  await editor.addNode(onMessage);
  await editor.addNode(match);
  await editor.addNode(message1);
  await editor.addNode(message2);
  await editor.addNode(send1);
  await editor.addNode(send2);
 

 await editor.addConnection(con1);
  await editor.addConnection(con2);
  await editor.addConnection(con3);
  await editor.addConnection(con4);
  await editor.addConnection(con5);
  await editor.addConnection(con6);


  await arrange.layout();

  //await area.translate(chat.id, { x: 1000, y: 500 });

  AreaExtensions.zoomAt(area, editor.getNodes());

  /*chat.botSend(
    "test log"
  );
  chat.botSend("btw, check out the [Rete.js website](https://retejs.org)");
  chat.botSend(
    "Additionally, you have the option to back my creator [on Patreon](https://www.patreon.com/bePatron?u=7890937)"
  );*/

  return {
    destroy: () => area.destroy()
  };
}
