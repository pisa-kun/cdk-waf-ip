#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';

import { WafCdkIpStack } from '../lib/resource/cdk-waf-ip-stack';
import { ConfigStackProps } from '../lib/config';

const app = new cdk.App();
new WafCdkIpStack(app, 'CdkWafIpStack', ConfigStackProps);
