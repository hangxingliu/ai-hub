---
updated_at: 2025-08-09 03:55:45
---
# HOW to ...

## Use proxy server to access AI services

This section is useful for using this program on enterprise network.

### 1. Use proxy server for all AI services

``` bash
export https_proxy=http://${HTTP_PROXY_ADDR}:${HTTP_PROXY_PORT}
export no_proxy=192.168.*,127.0.0.1,localhost
```

### 2. Use proxy server for custom AI services

Edit your `config.yaml`:

``` yaml
# example:
upstreams:
  - name: openai
    endpoint: https://api.openai.com/v1
    override_api_key: ${OPENAI_API_KEY}
    proxy: http://company-proxy.local:8080
```

### 3. Use custom TLS(HTTPS) certificate

``` bash
export NODE_EXTRA_CA_CERTS=/path/to/your/ca-certs.pem

# You can merge your multiple CA cert file into the single file by the following command:
cat *.pem > /path/to/your/ca-certs.pem
```

Or you can put your CA cert file into `./storage/ca-cert.pem` and start the program by 
the command `./scripts/start.sh`
