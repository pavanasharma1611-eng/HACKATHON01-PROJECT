function mockPrediction(row) {

    const failedLogins = Number(row.failed_logins);
    const packetsPerSecond = Number(row.packets_per_second);

    if (packetsPerSecond > 1000) {
        return {
            attackType: "DDoS Attack",
            probability: 0.94,
            severityScore: 10,
            timewindow: "Next 5 minutes"
        };
    }

    if (failedLogins > 10) {
        return {
            attackType: "Brute Force Attack",
            probability: 0.87,
            severityScore: 8,
            timewindow: "Next 5 minutes"
        };
    }

    return {
        attackType: "Normal",
        probability: 0.91,
        severityScore: 2,
        timewindow: "Next 5 minutes"
    };
}

module.exports = mockPrediction;