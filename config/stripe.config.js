import ProxyAgent from 'https-proxy-agent';

const stripe = Stripe('sk_test_...', {
    apiVersion: '2019-08-08',
    maxNetworkRetries: 1,
    httpAgent: new ProxyAgent(process.env.http_proxy),
    timeout: 1000,
    host: 'api.stripe.com',
    port: 123,
    telemetry: true,
});