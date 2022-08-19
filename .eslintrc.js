module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "es6": true,
    },
    "rules": {
        "no-undef": 2,
    },
    "overrides": [
        {
            "files": "*.js",
            "env": {
                "browser": true,
                "es6": true,
                "jquery": true,
            },
            "globals": {
                "Materialize": true,
                "Picker": true,
                "Velocity": true,
                "Hammer": true,
                "WorkerGlobalScope": true,
                "Vel": true,
                "Package": true,
                "define": true,
                "module": true,
                "require": true,
                "exports": true,
                "_": true,
            },
        }
    ],
}
