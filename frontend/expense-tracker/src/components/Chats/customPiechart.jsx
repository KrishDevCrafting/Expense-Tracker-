import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
export const CustomPiechart = ({
  data,
  label,
  color,
  totalAmount,
  showTextAnchor,
}) => {
  return <div>



    <ResponsiveContainer width="100%"
    height={380}
    <PieChart>
    
    <Pie data={data}
dataKey="amount"
nameKey="name"
cx="50%"
cy="50%"
outerRadius={100}
labelline={false}
>
{data.map((entry,index)=>(
  <Cell key={`cell-${index}`} fill={color[index%colors.length]}/>
))}

</Pie>
    <Tooltip/>
    <Legend/>
    {showTextAnchor &&
    (
      <>
      
      <text x="50%"
      y="50%"
      dy={-25}
      textAnchor="middle"
      fill="#666"
      fontSize="14px"></text>
      </>
    )}
  </div>;
};
