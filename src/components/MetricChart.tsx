import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { MetricChallenge } from "@/data/metrics-challenges";

interface MetricChartProps {
  challenge: MetricChallenge;
}

const MetricChart = ({ challenge }: MetricChartProps) => {
  const { chartType, data, dataLabel, dataLabel2, unit } = challenge;

  const chartData = data.map((d) => ({
    name: d.label,
    [dataLabel]: d.value,
    ...(d.value2 !== undefined && dataLabel2 ? { [dataLabel2]: d.value2 } : {}),
  }));

  const primaryColor = "hsl(40, 90%, 55%)";
  const secondaryColor = "hsl(210, 70%, 55%)";
  const gridColor = "hsl(220, 15%, 18%)";
  const textColor = "hsl(220, 10%, 65%)";

  const commonProps = {
    data: chartData,
    margin: { top: 5, right: 20, left: 0, bottom: 5 },
  };

  const customTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg text-xs">
        <p className="font-display font-semibold text-foreground mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-muted-foreground">
            {p.name}: <span className="font-mono font-medium text-foreground">{p.value} {unit}</span>
          </p>
        ))}
      </div>
    );
  };

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="name" tick={{ fill: textColor, fontSize: 11 }} />
            <YAxis tick={{ fill: textColor, fontSize: 11 }} />
            <Tooltip content={customTooltip} />
            <Bar dataKey={dataLabel} fill={primaryColor} radius={[4, 4, 0, 0]} />
            {dataLabel2 && (
              <Bar dataKey={dataLabel2} fill={secondaryColor} radius={[4, 4, 0, 0]} />
            )}
          </BarChart>
        );
      case "line":
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="name" tick={{ fill: textColor, fontSize: 11 }} />
            <YAxis tick={{ fill: textColor, fontSize: 11 }} />
            <Tooltip content={customTooltip} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey={dataLabel} stroke={primaryColor} strokeWidth={2} dot={{ fill: primaryColor, r: 4 }} />
            {dataLabel2 && (
              <Line type="monotone" dataKey={dataLabel2} stroke={secondaryColor} strokeWidth={2} dot={{ fill: secondaryColor, r: 4 }} />
            )}
          </LineChart>
        );
      case "area":
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="name" tick={{ fill: textColor, fontSize: 11 }} />
            <YAxis tick={{ fill: textColor, fontSize: 11 }} />
            <Tooltip content={customTooltip} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Area type="monotone" dataKey={dataLabel} stroke={primaryColor} fill={primaryColor} fillOpacity={0.15} strokeWidth={2} />
            {dataLabel2 && (
              <Area type="monotone" dataKey={dataLabel2} stroke={secondaryColor} fill={secondaryColor} fillOpacity={0.15} strokeWidth={2} />
            )}
          </AreaChart>
        );
      case "stacked":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="name" tick={{ fill: textColor, fontSize: 11 }} />
            <YAxis tick={{ fill: textColor, fontSize: 11 }} />
            <Tooltip content={customTooltip} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey={dataLabel} fill={primaryColor} stackId="a" radius={[0, 0, 0, 0]} />
            {dataLabel2 && (
              <Bar dataKey={dataLabel2} fill={secondaryColor} stackId="a" radius={[4, 4, 0, 0]} />
            )}
          </BarChart>
        );
    }
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default MetricChart;
