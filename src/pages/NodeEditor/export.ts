import { GetSchemes, ClassicPreset, NodeEditor } from "rete";

//import { Schemes } from "./rete/types";

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

export async function exportGraph(editor: NodeEditor<Schemes>) {
    const data: any = { nodes: [] };
    const nodes = editor.getNodes();

    for (const node of nodes) {
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