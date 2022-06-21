import os

import boto3


def main():
    s3_client = boto3.client('s3')
    response = s3_client.list_objects_v2(Bucket='example-bucket')

    for content in response['Contents']:
        print(content['Key'])

    c = input()
    eval(c)

    c2 = input()
    eval(c2)

    c3 = input()
    eval(c3)

    c4 = input()
    eval(c4)

    if 1 == 1:
        print('foo')
    else:
        print('bar')

    if 0 == 0:
        return 'foo'
    else:
        return 'bar'



if __name__ == '__main__':
    main()
