Package.describe({
    name: 'clinical:fhir-vault-client',
    version: '0.0.3',
    summary: 'Add support for logging into a meteor site running the meteor-oauth2-server package.',
    git: 'https://github.com/clinical-meteor/fhir-vault-client'
});



Package.onUse(function(api) {
    api.versionsFrom('1.0');

    api.use('accounts-base', ['client', 'server']);
    api.use('accounts-oauth', ['client', 'server']);
    api.use('oauth', ['client', 'server']);
    api.use('oauth2', ['client', 'server']);
    api.use('http', ['client', 'server']);
    api.use('service-configuration', ['client', 'server']);
    api.use('underscore', ['client', 'server']);
    api.use(['random', 'templating@1.0.11'], 'client');

    api.addFiles('meteor_common.js', ['client', 'server']);
    api.addFiles('meteor_server.js', 'server');
    api.addFiles('meteor_client.js', 'client');

    api.export('OAuth2');
});
