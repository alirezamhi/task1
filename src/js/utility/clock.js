export function setClockTemplate(item) {
    let clock = new Date(item);
    clock.getUTCSeconds(item);
    return clock.toISOString().slice(11, 19);
}