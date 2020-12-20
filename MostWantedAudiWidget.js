// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: magic;
//@ts-check
/**
 * Create the widget
 * @param {{widgetParameter: string, debug: string}} config widget configuration
 */

function loadImage(url) {
    const req = await new Request(url);
    const img = await req.loadImage();
    return img;
}
async function createWidget(config) {
    const log = config.debug ? console.log.bind(console) : function () {};
    log(JSON.stringify(config, null, 2))
    let message = 'Hello World!'
    let param = config.widgetParameter
    if (param != null && param.length > 0) {
        message = param
    }
    // @ts-ignore
    const widget = new ListWidget()
    widget.backgroundColor = new Color("#1A1A1A")
    widget.centerAlignContent()
    const imageURL = 'https://mediaservice.audi.com/media/fast/H4sIAAAAAAAAAFvzloG1tIhBPNonK7EsUS8zXy84tSgzMSezKjEpJ9V63QXONcHX33oyMTBUFDAwMDAC1TJFO635LP6DjSPkAVSYcTcDc0FeOiNQQQoTZ2ZuYnqqPpDPz8idaKKbWlGim5eam88OlOXnyav8-UGw082l7PpDQyWuD6c3t5VyMvCw1CibXZ-Ts9VzrVLRv_xVql06MWUMPGVLz5zdKHxgwo-qyFp2541cim32iQw8Gp9bMhW6xdcG-bSmSGbxPvZ1m3GGgUd90kfx_9u3MYgbv3_gukX726VdRRcZeHaW73nlHNK48LrrzqNrxbdL3s3gApp7quh3npJYzHrL_BDGo3-uN59ZNWE5A8_L53xr58w98NauVjB-KkNNSO3u64IMPL_m5NbeZGDv_tWy7-Ma_co5b9_LbmTg-SMcMv9vobrwV6-kF0WP9rKpyIjOYuCZ8z4wuyNu4S3BoyraIhKcD4PffJ3CwJOTw_ZUUvzlh-Wb7nirS23hl3-yVIGBZ7pc-bn9yQnNu5mkxS8Z3l518_J2cQaeXrWThrUnKsV9D876vVmJYVFHWaURA8_Ur6tkxVXOJ8UYud2y3qxXvrj_lRQDKzC0mcSABAsjkODZCiQ4FjKAyAxQPOiCiAwQn3EHMwMDcwtQtQwDCPDxlRblFCQWJebqlWemlGQAAJdoBCUCAgAA'
    const image = loadImage(imageURL);
    widget.addImage(image)
    image.centerAlignImage()
    image.imageSize = new Size(150,150)

    widget.addSpacer(4)
    widget.setPadding(10, 10, 10, 10)
    let row = widget.addStack()
    row.layoutHorizontally()
    let column = row.addStack()
    column.layoutVertically()
    column.addText(message)
    column.addText("Version: development ml")
    let currentTime = new Date().toLocaleTimeString('de-DE', {
        hour: "numeric",
        minute: "numeric"
    })
    column.addText(currentTime)
    return widget
}

module.exports = {
    createWidget
}