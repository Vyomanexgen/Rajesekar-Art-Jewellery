import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import "./MainDashboardComponents.css";

const CategoryMix = () => {
  const pieData = [
    { name: "Necklaces", value: 35 },
    { name: "Earrings", value: 25 },
    { name: "Bangles", value: 20 },
    { name: "Rings", value: 12 },
    { name: "Others", value: 8 },
  ];

  const palette = ["#205CFF", "#11A8FF", "#9F63FF", "#FFAA24", "#A4A6A8"];

  return (
    <div className="mix-wrapper">
      <div className="mix-top">
        <h3>Category Mix</h3>
      </div>

      <ResponsiveContainer width="100%" height={290}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={90}
            dataKey="value"
            label={({ name, value }) => `${name} ${value}%`}
          >
            {pieData.map((entry, i) => (
              <Cell key={i} fill={palette[i]} />
            ))}
          </Pie>
          <Tooltip formatter={(val) => `${val}%`} />
          {/* <Legend /> */}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryMix;
