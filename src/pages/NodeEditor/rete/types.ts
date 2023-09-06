import { GetSchemes } from "rete";
import { Connection } from "./connection";
import {
  DebugChat,
  Message,
  OnMessage,
  MatchMessage,
  SendMessage,
} from "./nodes";

import { NewNode } from "./nodes/new-node";

export type NodeProps =
  | DebugChat
  | Message
  | OnMessage
  | MatchMessage
  | NewNode
  | SendMessage;
  
export type ConnProps =
  | Connection<Message, SendMessage>
  | Connection<MatchMessage, SendMessage>
  | Connection<NewNode, SendMessage>
  | Connection<OnMessage, MatchMessage>;

export type Schemes = GetSchemes<NodeProps, ConnProps>;
