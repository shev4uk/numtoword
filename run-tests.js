const Jasmine = require('jasmine');
const jasmine = new Jasmine();

jasmine.loadConfig({
    spec_dir: '',
    spec_files: [
        'src/tests.js'
    ],
    helpers: [
        'helpers/**/*.js'
    ]
});

jasmine.execute();
