import { FC, useMemo } from 'react';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { createSX } from 'src/utils/createStyles';

const styles = createSX({
  divider: {
    margin: '10px 0px',
  },
});

const StatsScreen: FC = () => {
  const topRowDetails = useMemo(
    (): Array<{ title: string; value: string | number }> => [
      {
        title: 'Number of admissions',
        value: 25,
      },
      {
        title: 'Number of discharges',
        value: 30,
      },
      {
        title: 'Bed vaccancy percentage',
        value: '50%',
      },
      {
        title: 'Average number of days of hospital stay',
        value: 3.63,
      },
    ],
    [],
  );

  const randomPieData = useMemo(
    () =>
      [
        Array(Math.round(Math.random() * 4) + 2)
          .fill(null)
          .map((_, index) => ({
            name: `Group ${index}`,
            value: Math.round(Math.random() * 200 + 400),
          })),
        Array(Math.round(Math.random() * 4) + 2)
          .fill(null)
          .map((_, index) => ({
            name: `Group ${index}`,
            value: Math.round(Math.random() * 200 + 400),
          })),
      ] as const,
    [],
  );

  const randomLineData = useMemo(
    () =>
      Array(Math.round(Math.random() * 5) + 7)
        .fill(null)
        .map((_, index) => ({
          name: `${index}`,
          uv: Math.round(Math.random() * 200 + 400),
          pv: Math.round(Math.random() * 300 + 300),
        })),
    [],
  );

  return (
    <Box>
      <Grid container direction="column">
        <Grid container direction="row" spacing={2}>
          {topRowDetails.map(({ title, value }) => (
            <Grid item key={title} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom align="center">
                    {title}
                  </Typography>
                  <Typography color="textPrimary" align="center">
                    {value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Divider sx={styles.divider} />
      <Grid container direction="row" spacing={2}>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <LineChart
                width={730}
                height={250}
                data={randomLineData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <ResponsiveContainer width="80%" height={300}>
                <PieChart>
                  <Tooltip />
                  <Legend />
                  <Pie
                    data={randomPieData[0]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={50}
                    fill="#8884d8"
                    label
                  />
                  <Pie
                    data={randomPieData[1]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={100}
                    outerRadius={120}
                    fill="#82ca9d"
                    label
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatsScreen;
