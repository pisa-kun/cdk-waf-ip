# AWS WAFでIP制限するCDK

## deploy

> cdk deploy

## cdk deploy時のエラー

> cdk deploy
```
 ❌ Deployment failed: Error: CdkWafIpStack: SSM parameter /cdk-bootstrap/hnb659fds/version not found. Has the environment been bootstrapped? Please run 'cdk bootstrap' (see https://docs.aws.amazon.com/cdk/latest/guide/bootstrapping.html)
    at Deployments.validateBootstrapStackVersion (C:\Users\pisa0\AppData\Roaming\npm\node_modules\aws-cdk\lib\index.js:436:12032)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async Deployments.buildSingleAsset (C:\Users\pisa0\AppData\Roaming\npm\node_modules\aws-cdk\lib\index.js:436:10797)  
    at async Object.buildAsset (C:\Users\pisa0\AppData\Roaming\npm\node_modules\aws-cdk\lib\index.js:436:196976)
    at async C:\Users\pisa0\AppData\Roaming\npm\node_modules\aws-cdk\lib\index.js:436:180802

CdkWafIpStack: SSM parameter /cdk-bootstrap/hnb659fds/version not found. Has the environment been bootstrapped? Please run 'cdk bootstrap' (see https://docs.aws.amazon.com/cdk/latest/guide/bootstrapping.html)
```
普段はap-northeast-1にデプロイしていて、今回初めてus-east-1にデプロイするので、bootstrapコマンドを実行する必要がある。

> cdk bootstrap

~~またはconfig.tsのenv.regionをap-northeast-1(普段使いのリージョン)に変更する。
この場合、validation関数のif文も修正する。~~

- ap-northeast-1にdeployすると次のようなエラーになる
```
WhiteListIpSet Resource handler returned message: "Error reason: The scope is not valid., field: SCOPE_VALUE
```

**https://dev.classmethod.jp/articles/cloudformation-webacl-cloudfront-error/**

WAF v2からus-east-1縛りが追加され、cloudFrontの作成はus-east-1で作成する必要がある。とのこと。

## 参考
https://go-to-k.hatenablog.com/entry/waf-cdk-ip-restrictions