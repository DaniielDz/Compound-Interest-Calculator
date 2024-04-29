const formatCurrency = (value) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

const TableComponent = ({ data }) => {
  return (
    <div className="overflow-x-auto lg:ml-14">
      <table className="min-w-full divide-y divide-gray-200 lg:w-[600px] text-sm md:text-base">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
              YEAR
            </th>
            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
              STARTING BALANCE
            </th>
            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell lg:table-cell">
              ANNUAL CONTRIBUTIONS
            </th>
            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
              CUMULATIVE CONTRIBUTIONS
            </th>
            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell lg:table-cell">
              INTEREST EARNED
            </th>
            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
              CUMULATIVE INTEREST
            </th>
            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
              TOTAL BALANCE
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.startsBalances.map((_, index) => (
            <tr key={index}>
              <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap">
                {index + 1}
              </td>
              <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap">
                {formatCurrency(data.startsBalances[index])}
              </td>
              <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap hidden md:table-cell lg:table-cell">
                {formatCurrency(data.annualContributions[index])}
              </td>
              <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap hidden lg:table-cell">
                {formatCurrency(data.cumulativeContributions[index])}
              </td>
              <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap hidden md:table-cell lg:table-cell">
                {formatCurrency(data.interests[index])}
              </td>
              <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap hidden lg:table-cell">
                {formatCurrency(data.cumulativeInterest[index])}
              </td>
              <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap">
                {formatCurrency(data.balances[index])}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
