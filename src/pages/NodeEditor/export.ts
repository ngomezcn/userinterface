import { GetSchemes, ClassicPreset, NodeEditor } from "rete";
import { Message, OnMessage, SendMessage } from "./rete/nodes"
import { Connection } from "./rete/connection"

type Schemes = GetSchemes<
    ClassicPreset.Node,
    ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;

function serializePort(
    port:
        | ClassicPreset.Input<ClassicPreset.Socket>
        | ClassicPreset.Output<ClassicPreset.Socket>
) {
    return {
        id: port.id,
        label: port.label,
        socket: {
            name: port.socket.name
        }
    };
}

function serializeControl(control: ClassicPreset.Control) {
    if (control instanceof ClassicPreset.InputControl) {
        return {
            __type: "ClassicPreset.InputControl" as const,
            id: control.id,
            readonly: control.readonly,
            type: control.type,
            value: control.value
        };
    }
    return null;
}

export async function importConnections(data: any, editor: NodeEditor<Schemes>) {


    
    //console.log("connectionsList " + connectionsList)


    //const con1 = new Connection(onMessage, "exec", match, "exec");

    /*for (let i = 0; i < connectionsList.length; i++) {

        const con = connectionsList[i]
        console.log(con.source)

        console.log("editor.getNodes() " + editor.getNodes())

        const source = editor.getNode("fc1315b4c5a901b0")
        const target = editor.getNode(con.target)

        //const test = source.label

        //console.log(test)

        //const connection = new Connection(onMessage, "text", onMessage1, "exec");

        //await editor.addConnection(con1)
        //const node = new OnMessage();
        //node.label = nodeList[i].label
        //await editor.addNode(node);
    }*/
}

export function importNodes(data: any, editor: NodeEditor<Schemes>) {

    for (const node of data.nodes) {
        let rawNode = JSON.stringify(node)
        console.log("rawNode " + JSON.stringify(node))

        switch (node.label) {
            case "On message": {
                let newNode = JSON.parse(rawNode) as OnMessage
                editor.addNode(newNode)
                break;
            }
            case "Message": {
                let newNode = JSON.parse(rawNode) as Message
                editor.addNode(newNode)
                break;
            }
            case "Send message": {
                let newNode = JSON.parse(rawNode) as SendMessage
                editor.addNode(newNode)
                break;
            }
            default: {
                break;
            }
        }
    }

    /*for (const a of data.nodes) {
        console.log("for node: " +  JSON.stringify(a))

        let rawNode = JSON.stringify(a)

        console.log("rawNode " +  JSON.stringify(a))

        switch (a.label) {
            case "On message": {
                
                let node = JSON.parse(rawNode) as OnMessage

                editor.addNode(node)
                break;
            }
            case "Message": {
                break;
            }
            default: {
                break;
            }
        }
    }*/

    //console.log("data.nodes " + data.nodes[0].outputs[0].label)
    /*for (const { id, label, inputs, outputs, controls } of data.nodes) {
        //const node = new ClassicPreset.Node(label);
        //let node : any ;
        //let node = new ClassicPreset.Node(label);
        //let node : OnMessage | Message  //= new ClassicPreset.Node(label);

        let raw = {
            id: id,
            label: label,
            outputs: outputs,
            inputs: inputs,
            controls: controls
        }

        switch (label) {
            case "On message": {
                let a = raw as OnMessage
                editor.addNode(a)

                console.log(JSON.stringify(a))

                break;
            }
            case "Message": {
                //node = new Message("");
                break;
            }
            default: {
                break;
            }
        }*/
    /*node!.id = id;
    console.log("node.label " + label)
    console.log(JSON.stringify(node!))*/

    /*Object.entries(inputs).forEach(([key, input]: [string, any]) => {
        const socket = new ClassicPreset.Socket(input.socket.name);
        const inp = new ClassicPreset.Input(socket, input.label);

        inp.id = input.id;

        node.addInput(key, input);
    });
    Object.entries(outputs).forEach(([key, output]: [string, any]) => {
        const socket = new ClassicPreset.Socket(output.socket.name);
        const out = new ClassicPreset.Output(socket, output.label);

        out.id = output.id;

        node.addOutput(key, out);
    });
    Object.entries<ReturnType<typeof serializeControl>>(controls).forEach(
        ([key, control]) => {
            if (!control) return;

            if (control.__type === "ClassicPreset.InputControl") {
                const ctrl = new ClassicPreset.InputControl(control.type, {
                    initial: control.value,
                    readonly: control.readonly
                });
                node.addControl(key, ctrl);
            }
        }
    );

    //editor.addNode(node!);
}*/
}

export function exportNodes(editor: NodeEditor<Schemes>) {
    const data: any = { nodes: [] };
    const nodes = editor.getNodes();

    for (const node of nodes) {
        //console.log(node.id)
        const inputsEntries = Object.entries(node.inputs).map(([key, input]) => {
            return [key, input && serializePort(input)];
        });
        const outputsEntries = Object.entries(node.outputs).map(([key, output]) => {
            return [key, output && serializePort(output)];
        });
        const controlsEntries = Object.entries(node.controls).map(
            ([key, control]) => {
                return [key, control && serializeControl(control)];
            }
        );

        data.nodes.push({
            id: node.id,
            label: node.label,
            outputs: Object.fromEntries(outputsEntries),
            inputs: Object.fromEntries(inputsEntries),
            controls: Object.fromEntries(controlsEntries)
        });
    }

    return data;
}

export function exportConnections(editor: NodeEditor<Schemes>) {
    const data: any = { connections: [] };
    const connections = editor.getConnections();

    for (const connection of connections) {

        data.connections.push({
            id: connection.id,
            sourceOutput: connection.sourceOutput,
            targetInput: connection.targetInput,
            source: connection.source,
            target: connection.target,
        });
    }

    return data;
}