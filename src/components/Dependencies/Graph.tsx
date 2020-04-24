import { isEqual } from 'lodash';
import * as React from 'react';
import * as vis from 'vis-network/standalone';
import { DataSetEdges, DataSetNodes, Network, NetworkEvents, Options } from 'vis-network/standalone';

import { IVisGraph } from '../../hooks/useComputeVisGraph';

// @ts-ignore: Need to add typings
const DataSet = vis.DataSet;

export interface IGraph {
  id: string | number;
  graph: IVisGraph;
  events?: {
    [key in NetworkEvents]?: (params: any) => void;
  };
  getNetwork?: (network?: Network) => void;
  getNodes?: (nodes: DataSetNodes) => void;
  getEdges?: (edges: DataSetEdges) => void;
}

const visOptions: Options = {
  autoResize: true,
  layout: {
    hierarchical: {
      enabled: true,
      levelSeparation: 300,
      direction: 'LR',
      sortMethod: 'directed',
    },
  },
  physics: {
    enabled: false,
  },
  edges: {
    smooth: true,
    arrowStrikethrough: false,
    dashes: true,
    // @ts-ignore
    chosen: {
      edge: (values: { dashes: boolean; color: string; opacity: number }) => {
        values.dashes = false;
        values.color = 'rgba(216, 225, 230, 1.0)';
        values.opacity = 1;
      },
    },
    width: 3,
    color: {
      color: 'rgba(216, 225, 230, 0.3)',
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

// TODO (CL): Convert to function component
export class Graph extends React.Component<IGraph> {
  public readonly container = React.createRef<HTMLElement>();
  public readonly nodes: DataSetNodes = new DataSet();
  public readonly edges: DataSetEdges = new DataSet();
  public Network?: Network;

  constructor(props: IGraph) {
    super(props);

    this.updateGraph = this.updateGraph.bind(this);
  }

  public componentDidMount() {
    this.edges.add(this.props.graph.edges);
    this.nodes.add(this.props.graph.nodes);
    this.updateGraph();
  }

  public shouldComponentUpdate(nextProps: IGraph) {
    const nodesChange = !isEqual(this.props.graph.nodes, nextProps.graph.nodes);
    const edgesChange = !isEqual(this.props.graph.edges, nextProps.graph.edges);

    // Should update if nodes, edges, or the ID changes
    return nodesChange || edgesChange || this.props.id !== nextProps.id;
  }

  public componentDidUpdate() {
    this.updateGraph();
  }

  public updateGraph() {
    if (this.container.current) {
      this.Network = new Network(
        this.container.current,
        Object.assign({}, this.props.graph, {
          edges: this.edges,
          nodes: this.nodes,
        }),
        visOptions,
      );

      this.Network.once('afterDrawing', () => this.Network?.setSize('', ''));
    }

    if (this.props.getNetwork) {
      this.props.getNetwork(this.Network);
    }

    if (this.props.getNodes) {
      this.props.getNodes(this.nodes);
    }

    if (this.props.getEdges) {
      this.props.getEdges(this.edges);
    }

    if (this.Network) {
      // Add user provied events to network
      const events = this.props.events || {};
      for (const eventName of Object.keys(events) as NetworkEvents[]) {
        const cb = events[eventName];
        if (cb) {
          this.Network.on(eventName, cb);
        }
      }
    }
  }

  public render() {
    const { id } = this.props;
    return React.createElement(
      'div',
      {
        id,
        ref: this.container,
        style: { width: '100%', height: '100%' },
      },
      id,
    );
  }
}
