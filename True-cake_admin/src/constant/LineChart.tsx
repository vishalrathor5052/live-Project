import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  ResponsiveContainer,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import moment from "moment";

export const AnlisisChart = () => {
  const { Analytics, dateOption } = useSelector(
    (state: any) => state?.trueCake
  );
  let resultData: any = [];

  {
    Analytics?.data?.map((elm: any) => {
      if (dateOption == 3) {
        resultData.push({
          dateOfOrder: moment(elm?.dateOfOrder).format("DD-MMMM"),
          price: elm?.price,
          borderWidth: 40,
          borderDash: [40],
        });
      } else if (dateOption == 2) {
        resultData.push({
          dateOfOrder: moment(elm?.dateOfOrder).format("MMMM"),
          price: elm?.price,
          borderWidth: 40,
          borderDash: [40],
        });
      } else {
        resultData.push({
          dateOfOrder: moment(elm?.dateOfOrder).format("YYYY"),
          price: elm?.price,
          borderWidth: 40,
          borderDash: [40],
        });
      }
    });
  }
  return (
    <>
      <div>
        <ResponsiveContainer aspect={2}>
          <LineChart data={resultData}>
            {/* <CartesianGrid strokeDasharray="3 3"/> */}
            <XAxis
              axisLine={false}
              tickLine={false}
              dataKey="dateOfOrder"
              interval={"preserveStartEnd"}
            />
            )
            <YAxis axisLine={false} tickLine={false} />
            {/* <Tooltip contentStyle={{backgroundColor :'yellow'}} /> */}
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#e6d822"
              activeDot={{ r: 6 }}
              fill="#787656"
            />
            {/* <Area dataKey="fees" stroke='#7522DE' activeDot={{r :8}}  fill="#C08DFF"/> */}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
export default AnlisisChart;
