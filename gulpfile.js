const fs = require('node:fs/promises');
const gulp = require('gulp');
const { exec } = require('child_process');

async function clean() {
    try {
        await fs.rm('./build', { recursive: true, force: true })
    }
    catch 
    {

    }
}

function build(cb) {
    exec('"./node_modules/node/bin/node.exe" ./node_modules/typescript-to-lua/dist/tstl.js', function(err, stdout, stderr) {
        console.log(stdout)
        if (err == null) cb();
        else cb(stderr);
    });
}

async function data() {
    await Promise.all([
        fs.cp("./locale", "./build/locale", { force: true, recursive: true }),
        fs.cp("./graphics", "./build/graphics", { force: true, recursive: true }),
        fs.cp("./changelog.txt", "./build/changelog.txt", { force: true }),
        fs.cp("./info.json", "./build/info.json", { force: true })
    ]);
}

exports.default = gulp.series(clean, gulp.parallel(build, data))
