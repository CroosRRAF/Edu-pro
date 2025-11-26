import { memo } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  chartColors,
  customTooltipFormatter,
  formatChartNumber,
} from "../../utils/chartHelpers";

/**
 * LineChart Component
 * Wrapper around Recharts LineChart with custom styling and configuration
 *
 * Features:
 * - Responsive container
 * - Custom colors
 * - Formatted tooltips
 * - Grid lines
 * - Legend
 * - Multiple lines support
 *
 * @param {Object} props
 * @param {Array} props.data - Chart data array
 * @param {Array} props.lines - Array of line configurations [{dataKey, name, color}]
 * @param {string} props.xAxisKey - Key for X-axis data
 * @param {string} props.title - Chart title
 * @param {number|string} props.height - Chart height (default: 300)
 * @param {boolean} props.showGrid - Show grid lines (default: true)
 * @param {boolean} props.showLegend - Show legend (default: true)
 * @param {boolean} props.showTooltip - Show tooltip (default: true)
 * @param {Function} props.xAxisFormatter - X-axis label formatter
 * @param {Function} props.yAxisFormatter - Y-axis label formatter
 * @param {string} props.className - Additional CSS classes
 */
const LineChart = ({
  data = [],
  lines = [],
  xAxisKey = "name",
  title,
  height = 300,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  xAxisFormatter,
  yAxisFormatter = formatChartNumber,
  className = "",
}) => {
  // Default line configuration
  const defaultLines =
    lines.length > 0
      ? lines
      : [{ dataKey: "value", name: "Value", color: chartColors.primary[0] }];

  return (
    <div className={`w-full ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      )}

      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />}

          <XAxis
            dataKey={xAxisKey}
            tick={{ fill: "#6B7280", fontSize: 12 }}
            tickLine={{ stroke: "#E5E7EB" }}
            axisLine={{ stroke: "#E5E7EB" }}
            tickFormatter={xAxisFormatter}
          />

          <YAxis
            tick={{ fill: "#6B7280", fontSize: 12 }}
            tickLine={{ stroke: "#E5E7EB" }}
            axisLine={{ stroke: "#E5E7EB" }}
            tickFormatter={yAxisFormatter}
          />

          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFF",
                border: "1px solid #E5E7EB",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              formatter={customTooltipFormatter}
            />
          )}

          {showLegend && (
            <Legend
              wrapperStyle={{
                paddingTop: "20px",
              }}
              iconType="line"
            />
          )}

          {defaultLines.map((line, index) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              name={line.name || line.dataKey}
              stroke={
                line.color ||
                chartColors.primary[index % chartColors.primary.length]
              }
              strokeWidth={2}
              dot={{
                fill:
                  line.color ||
                  chartColors.primary[index % chartColors.primary.length],
                r: 4,
              }}
              activeDot={{ r: 6 }}
              animationDuration={500}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default memo(LineChart);
