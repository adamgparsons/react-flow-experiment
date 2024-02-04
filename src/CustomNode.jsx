import React from "react";
import { Handle, Position } from "reactflow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

// Function to get color based on status
const getStatusColor = (status) => {
  const statusColorMap = {
    processing: "blue",
    complete: "green",
    "not yet started": "grey",
  };

  return statusColorMap[status] || "default";
};

const CustomNode = ({ data }) => {
  return (
    <Paper elevation={3} style={{ padding: "10px", minWidth: "150px" }}>
      <Box display="flex" flexDirection="column">
        <Typography variant="body1" component="h3" gutterBottom>
          {data.title}
        </Typography>
        {/* Status Chip */}
        <Box display="flex" width="100%">
          <Chip
            label={data.status}
            size="small"
            style={{
              backgroundColor: getStatusColor(data.status),
              color: "white",
              marginBottom: "8px",
            }}
          />
        </Box>
        {data.content && <Typography>{data.content}</Typography>}
        {/* Handles */}
        <Handle
          type="source"
          position={Position.Right}
          style={{ top: "50%", background: "#555", opacity: 0 }}
        />
        <Handle
          type="target"
          position={Position.Left}
          style={{ top: "50%", background: "#555", opacity: 0 }}
          isConnectable={false}
        />
      </Box>
    </Paper>
  );
};

export default CustomNode;
