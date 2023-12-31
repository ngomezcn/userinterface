import * as React from "react";
import { css } from "styled-components";
import { ClassicScheme, Presets } from "rete-react-plugin";

const { Connection } = Presets.classic;

const styles = css`
  stroke: #16A4D7;
`;

export function TextConnectionComponent(props: {
  data: ClassicScheme["Connection"] & { isLoop?: boolean };
}) {
  return <Connection {...props} styles={() => styles} />;
}
