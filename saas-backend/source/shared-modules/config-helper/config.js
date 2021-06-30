const config = require('config');
var dev = config.get('Config.dev');
var prod = config.get('Config.prod');
const winston = require('winston');
winston.add(new winston.transports.Console({level: "debug"}));

/**
 * Set Configuration of Application, and Environment
 * @param environment
 * @returns The configuration
 */
module.exports.configure = function(environment) {
    var config = {};
    var protocol;
    if (environment == null || environment == undefined || environment == 'undefined') {
        var environment = process.env.NODE_ENV;
        if (process.env.NODE_ENV == undefined) {
            environment = "development";
        }
    }

    if (process.env.PROTOCOL) {
        protocol = process.env.PROTOCOL;
    } else {
        protocol = prod.protocol;
    }

    console.log('Running environment ' + environment);
    switch (environment) {
        case "production":
            if (process.env.AWS_REGION == undefined || process.env.AWS_ACCOUNT_ID == undefined || process.env.SERVICE_URL == undefined) {
                // || process.env.SNS_ROLE_ARN == undefined
                var error = "Production Environment Variables Not Properly Configured.\nPlease set AWS_REGION, SERVICE_URL and AWS_ACCOUNT_ID environment variables."
                throw error;
                break;
            } else {
                var port = prod.port;
                var name = prod.name;
                var table = prod.table;
                config = {
                    environment: environment,
                    //web_client: process.env.WEB_CLIENT,
                    aws_region: process.env.AWS_REGION,
                    cognito_region: process.env.AWS_REGION,
                    aws_account: process.env.AWS_ACCOUNT_ID,
                    // domain: process.env.SERVICE_URL,
                    // service_url: prod.protocol + process.env.SERVICE_URL,
                    name: name,
                    // table: {
                    //     user: process.env.USER_TABLE,
                    //     tenant: process.env.TENANT_TABLE,
                    //     product: process.env.PRODUCT_TABLE,
                    //     order: process.env.ORDER_TABLE
                    // },
                    table: table,
                    userRole: prod.userRole,
                    // role: {
                    //     sns: process.env.SNS_ROLE_ARN
                    // },
                    tier: prod.tier,
                    port: port,
                    loglevel: prod.log.level,
                    url: {
                        auth: process.env.SERVICE_URL + '/auth',
                        media: process.env.SERVICE_URL + '/media',
                        order: process.env.SERVICE_URL + '/order',
                        product: process.env.SERVICE_URL + '/product',
                        reg: process.env.SERVICE_URL + '/reg',
                        tenant: process.env.SERVICE_URL + '/tenant',
                        user: process.env.SERVICE_URL + '/user'
                    }
                }
                return config;
                break;
            }
        case "development":
            var port = dev.port;
            var name = dev.name;
            var table = dev.table;

            config = {
                environment: environment,
                aws_region: dev.region,
                cognito_region: dev.region,
                aws_account: dev.aws_account,
                // domain: dev.domain,
                // service_url: dev.protocol + dev.domain,
                name: name,
                table: table,
                userRole: dev.userRole,
                // role: dev.role,
                tier: dev.tier,
                port: port,
                loglevel: dev.log.level,
                url: {
                    auth: dev.protocol + dev.domain + ':' + port.auth + '/auth',
                    media: dev.protocol + dev.domain + ':' + port.user + '/media',
                    order: dev.protocol + dev.domain + ':' + port.order + '/order',
                    product: dev.protocol + dev.domain + ':' + port.product + '/product',
                    reg: dev.protocol + dev.domain + ':' + port.reg + '/reg',
                    sys: dev.protocol + dev.domain + ':' + port.sys + '/sys',
                    tenant: dev.protocol + dev.domain + ':' + port.tenant + '/tenant',
                    user: dev.protocol + dev.domain + ':' + port.user + '/user'
                }
            }
            return config;
            break;
        default:
            var error = 'No Environment Configured.\nOption 1: Please configure Environment Variable.\nOption 2: Manually override environment in config function.';
            throw error;
    }

}
