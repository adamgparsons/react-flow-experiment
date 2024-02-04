import React, { useEffect, useState, useCallback, useMemo } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import dagre from "dagre";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import CustomNode from "./CustomNode";

const initialEdges = [
  { id: "1-2", source: "1", target: "2", type: "smoothstep" },
  {
    id: "1-3",
    source: "1",
    target: "3",
    type: "smoothstep",
  },
  {
    id: "2-6",
    source: "2",
    target: "6",
    type: "smoothstep",
  },
  {
    id: "3-4",
    source: "3",
    target: "4",
    type: "smoothstep",
  },
  {
    id: "3-5",
    source: "3",
    target: "5",
    type: "smoothstep",
  },
  {
    id: "5-7",
    source: "5",
    target: "7",
    type: "smoothstep",
  },
  {
    id: "6-7",
    source: "6",
    target: "7",
    type: "smoothstep",
  },
];

const initialNodes = [
  {
    id: "1",
    type: "customNode",
    position: { x: 0, y: 0 },
    data: { title: "Deal #2627", status: "complete" },
    sourcePosition: "right",
  },
  {
    id: "2",
    type: "customNode",
    position: { x: 0, y: 0 },
    data: { title: "Fund flow #36235", status: "processing" },
    targetPosition: "left",
    sourcePosition: "right",
  },
  {
    id: "3",
    type: "customNode",
    position: { x: 0, y: 0 },
    data: { title: "Fund flow #3283", status: "processing" },
    targetPosition: "left",
    sourcePosition: "right",
  },
  {
    id: "4",
    type: "customNode",
    position: { x: 0, y: 0 },
    data: { title: "Fund flow #3283", status: "not yet started" },
    targetPosition: "left",
    sourcePosition: "right",
  },
  {
    id: "5",
    type: "customNode",
    position: { x: 0, y: 0 },
    data: { title: "Fund flow #2371", status: "not yet started" },
    targetPosition: "left",
    sourcePosition: "right",
  },
  {
    id: "6",
    type: "customNode",
    position: { x: 0, y: 0 },
    data: { title: "Fund flow #2311", status: "not yet started" },
    targetPosition: "left",
    sourcePosition: "right",
  },

  {
    id: "7",
    type: "customNode",
    position: { x: 0, y: 0 },
    data: { title: "Fund flow #2322", status: "not yet started" },
    targetPosition: "left",
    sourcePosition: "right",
  },
];

// Define node types outside of the component
const nodeTypes = {
  customNode: CustomNode,
};

function Flow() {
  const [nodes, setNodes] = useState(initialNodes); // Initialize nodes state with initialNodes
  const [edges, setEdges] = useState(initialEdges); // Initialize edges state with initialEdges
  const [open, setOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
    setOpen(true);
  };

  // Memoize the nodeTypes to avoid recreating the object on each render
  const memoizedNodeTypes = useMemo(() => nodeTypes, []);

  // Dagre graph layout logic
  useEffect(() => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: "LR" });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: 172, height: 36 });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const updatedNodes = nodes.map((node) => {
      const nodeWithLayout = dagreGraph.node(node.id);
      return {
        ...node,
        position: {
          x: nodeWithLayout.x - nodeWithLayout.width / 2 + Math.random() / 1000,
          y: nodeWithLayout.y - nodeWithLayout.height / 2,
        },
      };
    });

    setNodes(updatedNodes);
  }, []);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback((params) => {
    // Do not set edges or update state
    // This effectively ignores any new connection attempts
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        // onNodesChange={onNodesChange}
        // onEdgesChange={onEdgesChange}
        nodeTypes={memoizedNodeTypes}
        nodesDraggable={false}
        connectionMode="loose"
        onConnect={onConnect}
        onNodeClick={onNodeClick}
      >
        <Background />
        <Controls />
      </ReactFlow>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Node Details</DialogTitle>
        {selectedNode && (
          <DialogContent>
            <DialogContentText>
              Title: {selectedNode.data.title}
            </DialogContentText>
            <DialogContentText>
              Status: {selectedNode.data.status}
            </DialogContentText>
            {/* Add more node details here */}
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Flow;
