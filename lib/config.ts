import { StackProps } from "aws-cdk-lib";

export interface Config{
    scopeType: string;
}

export interface ConfigStackProps extends StackProps{
    config: Config;
}

// cdk-waf-ipでこの変数を呼び出す
export const configStackProps: ConfigStackProps = {
    config: {
        scopeType: "CLOUDFRONT",
    },
    // デプロイするリージョン指定
    env: {
        region: "us-east-1",
        // region: "ap-northeast-1",
    },
};