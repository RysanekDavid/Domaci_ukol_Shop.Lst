import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const PieChartComponent = ({ data }) => {
  const theme = useTheme();
  const isXS = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <PieChart
        width={isXS ? 120 : 260}
        height={isXS ? 60 : 260}
        sx={{ display: "flex" }}
      >
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={isXS ? 60 : 100}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </Box>
  );
};

export default PieChartComponent;
