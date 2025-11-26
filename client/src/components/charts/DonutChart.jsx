import { memo } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { formatChartNumber, getChartColors } from "../../utils/chartHelpers";

/**
 * DonutChart Component
 * Donut chart (pie chart with hollow center) with custom styling
 *
 * Features:
 * - Responsive container
 * - Auto-generated colors
 * - Formatted tooltips
 * - Legend
 * - Custom labels
 * - Center text (total value)
 * - Percentage display
 *
 * @param {Object} props
 * @param {Array} props.data - Chart data array [{name, value}]
 * @param {string} props.title - Chart title
 * @param {number|string} props.height - Chart height (default: 300)
 * @param {boolean} props.showLegend - Show legend (default: true)
 * @param {boolean} props.showTooltip - Show tooltip (default: true)
 * @param {boolean} props.showLabels - Show labels on slices (default: false)
 * @param {boolean} props.showCenterText - Show center text (default: true)
 * @param {string} props.centerText - Custom center text
 * @param {Array} props.colors - Custom color array
 * @param {string} props.colorPalette - Color palette name (default: 'primary')
 * @param {number} props.innerRadius - Inner radius percentage (default: 60)
 * @param {number} props.outerRadius - Outer radius percentage (default: 80)
 * @param {string} props.className - Additional CSS classes
 */
const DonutChart = ({
  data = [],
  title,
  height = 300,
  showLegend = true,
  showTooltip = true,
  showLabels = false,
  showCenterText = true,
  centerText,
  colors,
  colorPalette = "primary",
  innerRadius = 60,
  outerRadius = 80,
  className = "",
}) => {
  // Get colors for chart
  const chartColorArray = colors || getChartColors(data.length, colorPalette);

  // Calculate total value
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  // Custom label renderer
  const renderLabel = (entry) => {
    if (!showLabels) return null;
    return `${entry.name}: ${entry.percent.toFixed(0)}%`;
  };

  // Custom tooltip content
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload[0]) return null;

    const data = payload[0];
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900">{data.name}</p>
        <p className="text-sm text-gray-600">
          Value:{" "}
          <span className="font-semibold">{formatChartNumber(data.value)}</span>
        </p>
        <p className="text-sm text-gray-600">
          Percentage:{" "}
          <span className="font-semibold">
            {data.payload.percent.toFixed(1)}%
          </span>
        </p>
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          {title}
        </h3>
      )}

      <div className="relative">
        <ResponsiveContainer width="100%" height={height}>
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderLabel}
              innerRadius={`${innerRadius}%`}
              outerRadius={`${outerRadius}%`}
              fill="#8884d8"
              dataKey="value"
              animationDuration={500}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartColorArray[index % chartColorArray.length]}
                />
              ))}
            </Pie>

            {showTooltip && <Tooltip content={<CustomTooltip />} />}

            {showLegend && (
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            )}
          </RechartsPieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        {showCenterText && (
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
            style={{ marginTop: title ? "10px" : "0" }}
          >
            <div className="text-2xl font-bold text-gray-900">
              {centerText || formatChartNumber(totalValue)}
            </div>
            <div className="text-sm text-gray-500">
              {centerText ? "Total" : "Total Items"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(DonutChart);
