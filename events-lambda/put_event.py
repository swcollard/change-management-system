import json
import boto3
import uuid
import time

# Get the service resource.
dynamodb = boto3.resource('dynamodb')
# Fetch the table once the container spins up
table = dynamodb.Table('change_management_events')

def lambda_handler(event, context):
    description = event.get('description')
    eventLink = event.get('eventLink')
    owner = event.get('owner')
    if not description or not eventLink or not owner:
        print event
        return {
            'statusCode': 400,
            'body': json.dumps("Bad Request. Missing a required parameter."),
            'headers': {
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Headers':'Content-Type,X-Amz-Security-Token'
            }
        }

    table.put_item(
       Item={
            'eventId': str(uuid.uuid4()),
            'timestamp': long(time.time()),
            'description': description,
            'eventLink': eventLink,
            'owner': owner,
        }
    )
    return {
        'statusCode': 200,
        'body': json.dumps("Logged event: " + description),
        'headers': {
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Headers':'Content-Type,X-Amz-Security-Token'
        }
    }
