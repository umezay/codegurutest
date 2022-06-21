import { aws_iam as iam, aws_s3 as s3, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class GithubActionsSampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // OIDCプロバイダの作成
    //const provider = new iam.OpenIdConnectProvider(this, 'oidc-provider', {
    //  url: 'https://token.actions.githubusercontent.com',
    //  clientIds: ['sts.amazonaws.com'],
    //});
    // OIDCプロバイダの取得
    const provider = iam.OpenIdConnectProvider.fromOpenIdConnectProviderArn(
      this,
      'oidc-provider',
      'arn:aws:iam::310343077194:oidc-provider/token.actions.githubusercontent.com'
    );

    // IAMロールの作成
    const role = new iam.Role(this, 'oidc-role', {
      assumedBy: new iam.OpenIdConnectPrincipal(provider, {
        StringLike: {
          'token.actions.githubusercontent.com:sub':
            'repo:PKSHATechnology/codeguru-sample:*',
        },
      }),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          'AmazonCodeGuruReviewerFullAccess'
        ),
      ],
    });

    // Code Guru Reviewer用のS3バケット作成
    const bucket = new s3.Bucket(this, 'codeguru-bucket', {
      bucketName: 'codeguru-reviewer-codeguru-sample-ktoyod',
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });
    bucket.grantReadWrite(role);
  }
}
