import { memo } from "react";
import {
  Bar,
  CartesianGrid,
  Legend,
  BarChart as RechartsBarChart,
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
 * BarChart Component
 * Wrapper around Recharts BarChart with custom styling
 *
 * Features:
 * - Responsive container
 * - Custom colors
 * - Formatted tooltips
 * - Grid lines
 * - Legend
 * - Multiple bars support
 * - Horizontal/Vertical layout
 *
 * @param {Object} props
 * @param {Array} props.data - Chart data array
 * @param {Array} props.bars - Array of bar configurations [{dataKey, name, color}]
 * @param {string} props.xAxisKey - Key for X-axis data
 * @param {string} props.title - Chart title
 * @param {number|string} props.height - Chart height (default: 300)
 * @param {boolean} props.showGrid - Show grid lines (default: true)
 * @param {boolean} props.showLegend - Show legend (default: true)
 * @param {boolean} props.showTooltip - Show tooltip (default: true)
 * @param {boolean} props.horizontal - Horizontal layout (default: false)
 * @param {boolean} props.stacked - Stack bars (default: false)
 * @param {Function} props.xAxisFormatter - X-axis label formatter
 * @param {Function} props.yAxisFormatter - Y-axis label formatter
 * @param {string} props.className - Additional CSS classes
 */
const BarChart = ({
  data = [],
  bars = [],
  xAxisKey = "name",
  title,
  height = 300,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  horizontal = false,
  stacked = false,
  xAxisFormatter,
  yAxisFormatter = formatChartNumber,
  className = "",
}) => {
  // Default bar configuration
  const defaultBars =
    bars.length > 0
      ? bars
      : [{ dataKey: "value", name: "Value", color: chartColors.primary[0] }];

  return (
    <div className={`w-full ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      )}

      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          layout={horizontal ? "vertical" : "horizontal"}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />}

          {horizontal ? (
            <>
              <XAxis
                type="number"
                tick={{ fill: "#6B7280", fontSize: 12 }}
                tickLine={{ stroke: "#E5E7EB" }}
                axisLine={{ stroke: "#E5E7EB" }}
                tickFormatter={yAxisFormatter}
              />
              <YAxis
                type="category"
                dataKey={xAxisKey}
                tick={{ fill: "#6B7280", fontSize: 12 }}
                tickLine={{ stroke: "#E5E7EB" }}
                axisLine={{ stroke: "#E5E7EB" }}
                width={100}
              />
            </>
          ) : (
            <>
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
            </>
          )}

          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFF",
                border: "1px solid #E5E7EB",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
              formatter={customTooltipFormatter}
            />
          )}

          {showLegend && (
            <Legend
              wrapperStyle={{
                paddingTop: "20px",
              }}
            />
          )}

          {defaultBars.map((bar, index) => (
            <Bar
              key={bar.dataKey}
              dataKey={bar.dataKey}
              name={bar.name || bar.dataKey}
              fill={
                bar.color ||
                chartColors.primary[index % chartColors.primary.length]
              }
              radius={[4, 4, 0, 0]}
              stackId={stacked ? "stack" : undefined}
              animationDuration={500}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default memo(BarChart);
