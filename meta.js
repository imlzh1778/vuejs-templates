module.exports = {
    "helpers": {},
    "prompts": {
        "name": {
            "type": "string",
            "required": true,
            "message": "Project name"
        },
        "i18n": {
            "type": "confirm",
            "message": "Use i18n to your code?"
        },
        "login": {
            "type": "confirm",
            "message": "Use login page?"
        }
    },
    "filters": {
        "src/i18n/**/*": "i18n",
        "src/views/login.vue": "login",
        "src/images/login.jpg": "login"
    },
    "skipInterpolation": [
        "src/**/*.vue",
        "*index.ejs"
    ],
    "completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev"
};