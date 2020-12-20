// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: magic;

//@ts-check

/**
 * Create the widget
 * @param {{widgetParameter: string, debug: string}} config widget configuration
 */
async function createWidget(config) {
    const widget = new ListWidget()

    const log = config.debug ? console.log.bind(console) : function () {};
    log(JSON.stringify(config, null, 2))

    let carline = 'etron' // Default
    let param = config.widgetParameter
    if (param != null && param.length > 0) {
        carline = param
    }
    try {

        //  URL
        const mwaRequest = new Request("https://mwa-api.apps.emea.vwapps.io/v2/mwa/carline/" + carline + "/de-DE");
        const mwaResponse = await mwaRequest.loadJSON();
        widget.setPadding(0, 0, 0, 0);
        widget.backgroundColor = new Color("#000000")

        const req = new Request(mwaResponse.renderPicture);
        const image = await req.loadImage();
        widget.addImage(image);

        widget.url='https://mwa-fe.apps.emea.vwapps.io/?carline='+carline

    } catch (error) {
        log(JSON.stringify(error))
        widget.addSpacer(4)

        widget.backgroundColor = new Color("#ff0000")
        widget.setPadding(10, 10, 10, 10)

        widget.addText("no data found for " + carline)

        let currentTime = new Date().toLocaleTimeString('de-DE', {
            hour: "numeric",
            minute: "numeric"
        })
        widget.addText(currentTime)
    }
    return widget
}

module.exports = {
    createWidget
}