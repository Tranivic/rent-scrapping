exports.generate_random_number = (start, end) => {
    if (start >= end) {
        throw new Error("Start number must be less than end number in generate number util.");
    }
    return Math.floor(Math.random() * (end - start + 1)) + start;
};

exports.convert_milliseconds = (ms) => {
    if (ms < 1000) {
        return ms + "ms";
    }
    if (ms < 60000) {
        return (ms / 1000).toFixed(0) + "s";
    }
    if (ms < 3600000) {
        return (ms / 60000).toFixed(0) + "m";
    }
    return (ms / 3600000).toFixed(0) + "h";
};