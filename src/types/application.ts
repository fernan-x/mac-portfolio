import type { ReactElement } from "react";

export interface Application {
  id: string;
  name: string;
  component: ReactElement;
  img: string;
  open: boolean;
  active: boolean;
  docked: boolean;
  enableFullscreen: boolean;
  enableResizing: boolean;
  height: number;
  width: number;
  last?: boolean;
}

export type OpenedApplication = Application & { z: number };
