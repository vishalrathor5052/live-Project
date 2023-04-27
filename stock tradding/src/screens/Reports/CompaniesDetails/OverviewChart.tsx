import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";
const pdata = [
  {
    name: "paython",
    students: 13,
    fees: "10",
  },
  {
    name: "react",
    students: 15,
    fees: "12",
  },
  {
    name: "java",
    students: 18,
    fees: "5",
  },
  {
    name: "java Script",
    students: 8,
    fees: "18",
  },
  {
    name: "node",
    students: 13,
    fees: "8",
  },
  {
    name: "c",
    students: 7,
    fees: "6",
  },
  {
    name: "C++",
    students: 13,
    fees: "8",
  },
];
export const OverviewChart = () => {
  return (
    <>
      <div className="OverviewChart">
        <ResponsiveContainer width="100%" aspect={3}>
          <AreaChart className="area-chart" data={pdata}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" interval={"preserveStartEnd"} />
            <YAxis />
            <Tooltip contentStyle={{ backgroundColor: "yellow" }} />
            <Legend />
            <Area
              dataKey="students"
              stroke="#7522DE"
              activeDot={{ r: 8 }}
              fill="#C08DFF"
            />
            <Area
              dataKey="fees"
              stroke="#7522DE"
              activeDot={{ r: 8 }}
              fill="#C08DFF"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
export default OverviewChart;
