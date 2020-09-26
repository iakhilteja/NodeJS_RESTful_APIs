const environments = {};


environments.production = {
    'httpPort' : 5000,
    'envName' : 'production',
    'hashingSecret' : 'theHackingSchool'
}

environments.dev = {
'httpPort' : 3000,
'envName' : 'development',
'hashingSecret' : 'theHackingSchool'
}


const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

const environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.dev;


module.exports = environmentToExport;