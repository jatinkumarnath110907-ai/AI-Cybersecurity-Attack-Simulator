module.exports.simulateNetworkScan = (targetIp) => {
    // Mock Scanner Engine returning randomized network state
    const ports = [22, 80, 443, 3306, 8080];
    const services = {
        22: 'SSH',
        80: 'HTTP',
        443: 'HTTPS',
        3306: 'MySQL',
        8080: 'Custom App'
    };

    const detectedPorts = ports.map(port => ({
        port,
        service: services[port],
        state: Math.random() > 0.5 ? 'Open' : 'Closed'
    }));

    return detectedPorts;
};
