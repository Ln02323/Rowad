// Variables for the chart
let chartType = 'bar'; // Default chart type
let financialChart; // Chart instance
const ctx = document.getElementById('financialChart').getContext('2d');

// Create a new chart
function createChart(type, data) {
    if (financialChart) {
        financialChart.destroy(); // Destroy the old chart before creating a new one
    }

    financialChart = new Chart(ctx, {
        type: type,
        data: {
            labels: ['Revenue', 'Cost'], // Category names
            datasets: [{
                label: 'Financial Statistics',
                data: data, // Values
                backgroundColor: type === 'pie' || type === 'doughnut'
                    ? ['#4caf50', '#f44336'] // Category colors
                    : ['rgba(76, 175, 80, 0.5)', 'rgba(244, 67, 54, 0.5)'], // Bar/line colors
                borderColor: ['#4caf50', '#f44336'], // Border colors
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: type === 'bar' || type === 'line'
                ? { y: { beginAtZero: true } }
                : {}, // Display Y-axis only for bar and line charts
        }
    });
}

// Calculate profit or loss
function calculateProfitLoss(revenue, cost) {
    const profitLoss = revenue - cost;
    let message = '';
    let resultColor = '';

    if (profitLoss > 0) {
        message = " لقد حققت ربحاً! / You made a profit!";
        resultColor = "green";
    } else if (profitLoss < 0) {
        message = "لقد تكبدت خسارة! / You incurred a loss!";
        resultColor = "red";
    } else {
        message = "الميزانية متوازنة / Budget is balanced.";
        resultColor = "orange";
    }

    return { message, resultColor, profitLoss };
}

// Calculate profit margin
function calculateProfitMargin(revenue, cost) {
    if (revenue === 0) {
        return "يمكن أن تكون الإيرادات صفرًا / Revenue cannot be zero.";
    }
    const profitMargin = ((revenue - cost) / revenue) * 100;
    return `هامش الربح / Profit Margin: ${profitMargin.toFixed(2)}%`;
}

// Calculate ROI
function calculateROI(netProfit, investment) {
    if (investment === 0) {
        return "لا يمكن أن يكون الاستثمار صفرا. / Investment cannot be zero.";
    }
    const roi = (netProfit / investment) * 100;
    return `العائد على الاستثمار / Return on Investment (ROI): ${roi.toFixed(2)}%`;
}

// Update the chart and results
function updateChart() {
    const revenueInput = document.getElementById('revenue').value;
    const costInput = document.getElementById('cost').value;
    const netProfitInput = document.getElementById('netProfit').value;
    const investmentInput = document.getElementById('investment').value;

    if (!revenueInput || !costInput || !netProfitInput || !investmentInput) {
        alert("الرجاء ملء جميع الحقول / Please fill in all fields.");
        return;
    }

    const revenue = parseFloat(revenueInput);
    const cost = parseFloat(costInput);
    const netProfit = parseFloat(netProfitInput);
    const investment = parseFloat(investmentInput);

    if (isNaN(revenue) || isNaN(cost) || isNaN(netProfit) || isNaN(investment) || revenue < 0 || cost < 0 || netProfit < 0 || investment < 0) {
        alert("الرجاء إدخال أرقام إيجابية صالحة / Please enter valid positive numbers.");
        return;
    }

    if (document.getElementById('profitLossCheckbox').checked) {
        const { message, resultColor } = calculateProfitLoss(revenue, cost);
        const resultElement = document.getElementById('profitLossResult');
        resultElement.textContent = message;
        resultElement.style.color = resultColor;
    } else {
        document.getElementById('profitLossResult').textContent = '';
    }

    if (document.getElementById('profitMarginCheckbox').checked) {
        const profitMarginMessage = calculateProfitMargin(revenue, cost);
        document.getElementById('profitMarginResult').textContent = profitMarginMessage;
    } else {
        document.getElementById('profitMarginResult').textContent = '';
    }

    if (document.getElementById('roiCheckbox').checked) {
        const roiMessage = calculateROI(netProfit, investment);
        document.getElementById('result').textContent = roiMessage;
    } else {
        document.getElementById('result').textContent = '';
    }

    if (document.getElementById('chartCheckbox').checked) {
        chartType = document.getElementById('chartType').value;
        createChart(chartType, [revenue, cost]);
    } else if (financialChart) {
        financialChart.destroy(); // Destroy the chart if not selected
    }
}

// Attach the updateChart function to the button
document.getElementById('updateButton').addEventListener('click', updateChart);
