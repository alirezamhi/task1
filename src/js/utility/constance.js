class constance{
    static duringTime(duration) {
        let clock = new Date(duration);
        return clock.toISOString().slice(11, 19);
    }
}