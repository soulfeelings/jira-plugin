# Forge Hello World

This project contains a Forge app written in Javascript that displays `Hello World!` in a Jira issue action. 

See [developer.atlassian.com/platform/forge/](https://developer.atlassian.com/platform/forge) for documentation and tutorials explaining Forge.

## Requirements

See [Set up Forge](https://developer.atlassian.com/platform/forge/set-up-forge/) for instructions to get set up.

## Quick start
- Install top-level dependencies:
```
npm install
```

- Install dependencies inside of the `static/hello-world` directory:
```
npm install
```

- Modify your app by editing the files in `static/hello-world/src/`.

- Build your app (inside of the `static/hello-world` directory):
```
npm run build
```

- Deploy your app by running:
```
forge deploy
```

- Install your app in an Atlassian site by running:
```
forge install
```

### Notes
- Use the `forge deploy` command when you want to persist code changes.
- Use the `forge install` command when you want to install the app on a new site.
- Once the app is installed on a site, the site picks up the new app changes you deploy without needing to rerun the install command.

## Support

See [Get help](https://developer.atlassian.com/platform/forge/get-help/) for how to get help and provide feedback.

<button onClick={() => view.close()}>Close</button>

added variables
AWS_URL
AWS_API_KEY

to test the license enable this variable

forge variables set -e <environment> LICENSE_OVERRIDE <active|inactive>

if you set variable to active then isLicenseActive returns true if inactive then isLicenseActive will return false
DO NOT USE THIS VARIABLE IN PROD!!!


https://confluence.atlassian.com/servicemanagementserver/2-create-object-type-and-attribute-mapping-1044784497.html

https://developer.atlassian.com/cloud/assets/imports-rest-api-guide/schema-and-mapping/

You can deactivate the license check with 
forge variables set -e <environment> LICENSE_OVERRIDE <active|inactive>