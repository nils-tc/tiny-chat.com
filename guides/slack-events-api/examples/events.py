# Code example for python using Django framework
# This code was generated by chatGPT from pseudo-code
# If you spot an issue, feel free to create a PR to fix it

import hmac
from hashlib import sha256

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST


def verify_slack_request(request):
    timestamp = request.headers.get("X-Slack-Request-Timestamp")
    slack_signature = request.headers.get("X-Slack-Signature")
    if timestamp is None or slack_signature is None:
        return False
    signing_base_string = "v0:" + timestamp + ":" + request.body.decode()
    my_signature = (
        "v0="
        + hmac.new(
            # TODO replace YOUR_SLACK_SIGNING_SECRET with your own secret
            bytes("YOUR_SLACK_SIGNING_SECRET", "utf-8"),
            msg=bytes(signing_base_string, "utf-8"),
            digestmod=sha256,
        ).hexdigest()
    )
    return hmac.compare_digest(my_signature, slack_signature)


@csrf_exempt
@require_POST
def slack_events_view(request):
    if verify_slack_request(request) is not True:
        return HttpResponse(status_code=403)
    challenge = request.data.get("challenge")
    if challenge:
        return HttpResponse(challenge)
    response = None
    # TODO : implement your custom flow here
    # response = handle_slack_event(request.data)
    return HttpResponse(response)
