import json
import boto3
import decimal
from boto3.dynamodb.conditions import Key

# Helper class to convert a DynamoDB item to JSON.
class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)

# Get the service resource.
dynamodb = boto3.resource('dynamodb')
# Fetch the table once the container spins up
table = dynamodb.Table('change_management_events')

def lambda_handler(event, context):
    startTime = event.get('startTime')
    endTime = event.get('endTime')
    if not startTime or not endTime:
        print event
        return {
            'statusCode': 400,
            'body': json.dumps("Bad Request. Missing a required parameter."),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Headers':'Content-Type,X-Amz-Security-Token'
            }
        }

    response = table.scan(
        FilterExpression=Key('timestamp').between(startTime, endTime)
    )
    return {
        'statusCode': 200,
        'body': json.dumps(response['Items'], cls=DecimalEncoder),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Headers':'Content-Type,X-Amz-Security-Token'
        }
    }
