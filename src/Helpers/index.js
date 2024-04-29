// Function to calculate balances and interests year by year
export function calculateContributions(P, c, n, r, t) {
    // Calculate interest rate per period
    const ptg = (r / 100) / n;
    // Array to store balances year by year
    const balances = [];
    // Array to store interests earned year by year
    const interests = [];
    // Array to store initial balances of each year
    const stBalances = [P];
    // Array to store cumulative interest until current year
    const cumulativeInt = [0];
    const annualContributions = [];
    const cumulativeContributions = [];
    const years = [];
    const initialAmount = []

    // Iterate through each year
    for (let year = 1; year <= t; year++) {
        years.push(year)
        initialAmount.push(P)
        // Calculate the number of periods
        const pot = n * year;
        // Calculate the balance for the current year
        const balance = P * (1 + ptg) ** pot + c * (((1 + ptg) ** pot - 1) / ptg);
        // Calculate the interest earned for the current year
        const interest = balance - stBalances[year - 1] - (c * n); // Interest = Current balance - Initial balance - Contributions
        // Sum the interest of the current year with the cumulative interest until the previous year
        const cumulative = interest + cumulativeInt[year - 1];
        // Add the balance to the array of accumulated balances
        balances.push(Math.round(balance));
        // Add the balance to the array of initial balances
        if (year < t) stBalances.push(Math.round(balance))
        // Add the interest to the array of earned interests
        interests.push(Math.round(interest));
        // Add the cumulative interest to the array of cumulative interests
        cumulativeInt.push(Math.round(cumulative));
        // Add annual contributions to the array of annual contributions
        annualContributions.push(c * n);
        // Add cumulative contributions to the array of cumulative contributions
        cumulativeContributions.push(c * n * year);
    }

    // Remove the first element from cumulative interest array
    let cumulativeInterest = cumulativeInt.slice(1);

    // Return balances, interests, and cumulative interests
    return {
        initialAmount: initialAmount,
        years: years,
        startsBalances: stBalances,
        annualContributions: annualContributions,
        cumulativeContributions: cumulativeContributions,
        interests: interests,
        cumulativeInterest: cumulativeInterest,
        balances: balances
    };
}