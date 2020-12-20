// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: magic;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: download;
const DEBUG = true;
const log = DEBUG ? console.log.bind(console) : function () {};

// configure the library
const libraryInfo = {
    name: 'MostWantedAudiWidget',
    version: 'main',
    // forceDownload: DEBUG,
    user: 'MaLub',
    project: 'mwa-ios-widget',
    token: '231c86de00d0aabcbe2c7095cb7b156f2966d8f4'
};
// download and import library
let libraryFile = await downloadLibrary(libraryInfo);
log("LibraryFile: "+libraryFile);
let library = importModule(libraryFile);

// create the widget
const params = {
    widgetParameter: args.widgetParameter,
    debug: DEBUG
};

const widget = await library.createWidget(params);

// preview the widget
if (!config.runsInWidget) {
    await widget.presentSmall();
}

Script.setWidget(widget);
Script.complete();

/**
 * - creates directory for library if not existing
 * - downloads library file if forced or not yet existing
 * - returns relative path to library module
 * @param {{name: string, version: string, gitlabProject: string, forceDownload: bool}} library 
 */
async function downloadLibrary(library) {
    let fm = FileManager.local();

    // https://raw.githubusercontent.com/MaLub/mwa-ios-widget/main/MostWantedAudiWidget.js?token=AFTXSYKBBNVVLVAYEQG7BUC734MM4
    let scriptPath = module.filename;
    let libraryDir = scriptPath.replace(fm.fileName(scriptPath, true), fm.fileName(scriptPath, false));

    if (fm.fileExists(libraryDir) && !fm.isDirectory(libraryDir)) {
        fm.remove(libraryDir);
    }
    if (!fm.fileExists(libraryDir)) {
        fm.createDirectory(libraryDir);
    }
    let libraryFilename = library.name + '_' + library.version + '.js';

    let path = fm.joinPath(libraryDir, libraryFilename);

    let forceDownload = (library.forceDownload) ? library.forceDownload : false;
    if (fm.fileExists(path) && !forceDownload) {
        log("Not downloading library file");
    } else {
        let r = Math.random().toString(36).substring(7);
        let libraryUrl = "https://@raw.githubusercontent.com/" + library.user + "/" + library.project + "/" + library.version + "/" + library.name + ".js?random=" + r;
        log("Downloading library file '" + libraryUrl + "' to '" + path + "'");
        const req = new Request(libraryUrl);
        let libraryFile = await req.load();
        fm.write(path, libraryFile);
    }

    return fm.fileName(scriptPath, false) + '/' + libraryFilename;
}