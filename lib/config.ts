import { StackProps } from "aws-cdk-lib";

export interface Config{
    scopeType: string;
}

export interface ConfigStackProps extends StackProps{
    config: Config;
}

// cdk-waf-ipでこの変数を呼び出す
export const ConfigStackProps: ConfigStackProps = {
    config: {
        scopeType: "CLOUDFRONT",
    },
    // デプロイするリージョン指定
    env: {
        region: "us-east-1",
    },
};