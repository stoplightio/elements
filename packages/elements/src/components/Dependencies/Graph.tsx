import { isEqual } from 'lodash';
import * as React from 'react';
import { Network, NetworkEvents, Options } from 'vis-network/standalone';

import { IVisGraph } from '../../hooks/useComputeVisGraph';

export interface IGraph {
  id: string | number;
  graph: IVisGraph;
  events: {
    [key in NetworkEvents]?: (params: any) => void;
  };
  getNetwork: (network?: Network) => void;
}

const visOptions: Options = {
  autoResize: true,
  layout: {
    hierarchical: {
      enabled: true,
      levelSeparation: 300,
      nodeSpacing: 150,
      direction: 'LR',
      sortMethod: 'directed',
      shakeTowards: 'leaves',
      edgeMinimization: false,
      blockShifting: false,
    },
  },
  physics: {
    enabled: false,
  },
  edges: {
    arrowStrikethrough: false,
    dashes: true,
    // @ts-ignore
    chosen: {
      edge: (values: { dashes: boolean; color: string; width: number }) => {
        values.dashes = false;
        values.color = 'rgb(166, 175, 180)';
        values.width = 3;
      },
    },
    width: 2,
    color: {
      color: 'rgb(216, 225, 230)',
    },
    font: {
      align: 'top',
      color: 'rgba(115, 134, 148, 0.6)',
      strokeWidth: 0,
    },
    arrows: {
      to: {
        enabled: true,
        scaleFactor: 0.5,
      },
    },
  },
  nodes: {
    shape: 'icon',
    labelHighlightBold: true,
    icon: {
      face: '"Font Awesome 5 Pro"',
      color: '#cfd9e0',
      weight: 900,
    },
  },
};

export const Graph = React.memo<IGraph>(
  ({ id, graph, events, getNetwork }) => {
    const container = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
      if (!container.current) return;

      const visNetwork = new Network(container.current, graph, visOptions);

      visNetwork.once('afterDrawing', () => visNetwork?.setSize('', ''));

      if (getNetwork) {
        getNetwork(visNetwork);
      }

      if (visNetwork) {
        // Add user provied events to network
        for (const eventName of Object.keys(events) as NetworkEvents[]) {
          const cb = events[eventName];
          if (cb) {
            visNetwork.on(eventName, cb);
          }
        }
      }

      return () => {
        visNetwork.destroy();
      };
    });

    return <div id={String(id)} ref={container} style={{ width: '100%', height: '100%' }} />;
  },
  (p, n) => {
    return p.id === n.id && isEqual(p.graph, n.graph);
  },
);
