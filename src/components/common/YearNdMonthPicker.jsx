"use client";

const YearNdMonthPicker = ({
  currentYear,
  selectedMonth,
  selectedYear,
  handleChangeMonth,
  handleChangeYear,
}) => {
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="flex gap-x-4">
      <div>
        <label htmlFor="" className="mr-1 block">
          Month
        </label>
        <select
          value={selectedMonth}
          onChange={(e) => handleChangeMonth(e.target.value)}
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="" className="mr-1 block">
          Year
        </label>
        <select
          value={selectedYear}
          onChange={(e) => handleChangeYear(e.target.value)}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default YearNdMonthPicker;
