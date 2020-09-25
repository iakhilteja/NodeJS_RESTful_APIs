const environments = {};


environments.production = {
    'httpPort' : 5000,
    'envName' : 'production'
}

environments.dev = {
'httpPort' : 3000,
'envName' : 'development'
}


//Decide which Environment to be exported
const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

//Check that the current Environment is one of the environments above, if not default to staging

const environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.dev;


module.exports = environmentToExport;