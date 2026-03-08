module.exports.classifyThreat = (attackType, result) => {
    // Mock AI Engine for Threat Classification
    let riskLevel = 'Low';

    const rules = {
        'SQL injection testing': 'Critical',
        'Brute force login attempts': 'Medium',
        'Cross-site scripting simulation': 'High',
        'Phishing simulation': 'High',
        'DDoS traffic simulation': 'Critical'
    };

    riskLevel = rules[attackType] || 'Medium';

    // Overrides based on result
    if (result === 'Success') {
        if (riskLevel === 'Low') riskLevel = 'Medium';
        else if (riskLevel === 'Medium') riskLevel = 'High';
        else if (riskLevel === 'High') riskLevel = 'Critical';
    } else if (result === 'Blocked by Firewall') {
        riskLevel = 'Low';
    }

    return riskLevel;
};
