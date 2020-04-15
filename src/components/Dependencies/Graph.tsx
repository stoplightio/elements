import { differenceWith, isEqual } from 'lodash';
import * as React from 'react';
import * as vis from 'vis-network/standalone';
import { DataSetEdges, DataSetNodes, Edge, Network, NetworkEvents, Node, Options } from 'vis-network/standalone';

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
      face: 'FontAwesome',
      color: '#cfd9e0',
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
    const eventsChange = !isEqual(this.props.events, nextProps.events);

    if (nodesChange) {
      const idIsEqual = (n1: Node, n2: Node) => n1.id === n2.id;
      const nodesRemoved = differenceWith(this.props.graph.nodes, nextProps.graph.nodes, idIsEqual);
      const nodesAdded = differenceWith(nextProps.graph.nodes, this.props.graph.nodes, idIsEqual);
      const nodesChanged = differenceWith(
        differenceWith(nextProps.graph.nodes, this.props.graph.nodes, isEqual),
        nodesAdded,
      );
      this.patchNodes({ nodesRemoved, nodesAdded, nodesChanged });
    }

    if (edgesChange) {
      const edgesRemoved = differenceWith(this.props.graph.edges, nextProps.graph.edges, isEqual);
      const edgesAdded = differenceWith(nextProps.graph.edges, this.props.graph.edges, isEqual);
      const edgesChanged = differenceWith(
        differenceWith(nextProps.graph.edges, this.props.graph.edges, isEqual),
        edgesAdded,
      );
      this.patchEdges({ edgesRemoved, edgesAdded, edgesChanged });
    }

    if (eventsChange && this.Network) {
      let events = this.props.events || {};
      const eventKeys = Object.keys(events) as NetworkEvents[];

      for (const eventName of eventKeys) {
        const cb = events[eventName];
        this.Network.off(eventName, cb);
      }

      events = nextProps.events || {};
      for (const eventName of eventKeys) {
        const cb = events[eventName];
        if (cb) {
          this.Network.on(eventName, cb);
        }
      }
    }

    return false;
  }

  public componentDidUpdate() {
    this.updateGraph();
  }

  public patchEdges({
    edgesRemoved,
    edgesAdded,
    edgesChanged,
  }: {
    edgesRemoved: Edge[];
    edgesAdded: Edge[];
    edgesChanged: Edge[];
  }) {
    this.edges.remove(edgesRemoved);
    this.edges.add(edgesAdded);
    this.edges.update(edgesChanged);
  }

  public patchNodes({
    nodesRemoved,
    nodesAdded,
    nodesChanged,
  }: {
    nodesRemoved: Node[];
    nodesAdded: Node[];
    nodesChanged: Node[];
  }) {
    this.nodes.remove(nodesRemoved);
    this.nodes.add(nodesAdded);
    this.nodes.update(nodesChanged);
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

      if (!this.Network.getSelectedNodes().length) {
        this.Network.selectNodes([this.props.id], true);
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
