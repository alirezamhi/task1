// function duringTime(duration) {
//     let clock = new Date(duration);
//     return clock.toISOString().slice(11, 19);
// }
export function createButton(child,className,idName,modal){
    let button = `<button class="${className}" id=${idName} ${modal?`data-bs-toggle=modal data-bs-target=#exampleModal${modal}`:""}>${child}</button>`
    return button
}