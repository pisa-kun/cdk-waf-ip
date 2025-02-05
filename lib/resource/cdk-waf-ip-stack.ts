import { Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import { getIPList } from "../util/get-ip-list";
import { WafRegionValidator } from "../validator/waf-region-validator";
import { CfnIPSet, CfnWebACL } from "aws-cdk-lib/aws-wafv2";
import { ConfigStackProps } from "../config";

const ipListFilePath = "./iplist.txt";

export class WafCdkIpStack extends Stack {
    private scopeType: string;
    private ipList: string[];

    constructor(scope: Construct, id: string, props: ConfigStackProps) {
        super(scope, id, props);
    
        this.init(props);
        this.create();
    }

    // WAFの作成
    private init = (props: ConfigStackProps) => {
        this.scopeType = props.config.scopeType;
        this.ipList = getIPList(ipListFilePath);

        const wafRegionValidator = new WafRegionValidator(this.scopeType, this.region);
        this.node.addValidation(wafRegionValidator);
    }

    // whiteListの設定
    private create = () => {
        const whiteListIPSet = new CfnIPSet(this, "WhiteListIpSet",{
            name: "WhiteListIPSet",
            addresses: this.ipList,
            ipAddressVersion: "IPV4",
            scope: this.scopeType,
        });

        const whiteListIPSetRuleProperty: CfnWebACL.RuleProperty = {
            priority: 0,
            name: "WhiteListIPSet-Rule",
            action: {
                allow: {},
            },
            statement:{
                ipSetReferenceStatement:{
                    arn: whiteListIPSet.attrArn,
                },
            },
            visibilityConfig: {
                cloudWatchMetricsEnabled: true,
                metricName: "WhiteListIPSet-Rule",
                sampledRequestsEnabled: true,
            },
        };

        new CfnWebACL(this, "WebAcl", {
            name: "WebAcl",
            defaultAction: { block: {}},
            scope: this.scopeType,
            visibilityConfig: {
                cloudWatchMetricsEnabled: true,
                metricName: "WebAcl",
                sampledRequestsEnabled: true,
            },
            rules: [whiteListIPSetRuleProperty],
        });
    }


    
}