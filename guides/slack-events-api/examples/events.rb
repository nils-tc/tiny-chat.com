# Code example for ruby using ruby on rails framework
# This code was generated by chatGPT from pseudo-code
# If you spot an issue, feel free to create a PR to fix it

require 'openssl'

class SlackEventsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def verify_slack_request
    timestamp = request.headers["X-Slack-Request-Timestamp"]
    slack_signature = request.headers["X-Slack-Signature"]
    return false if timestamp.nil? || slack_signature.nil?
    
    signing_base_string = "v0:#{timestamp}:#{request.body.read}"
    # TODO replace YOUR_SLACK_SIGNING_SECRET with your own secret
    my_signature = OpenSSL::HMAC.hexdigest('sha256', 'YOUR_SLACK_SIGNING_SECRET', signing_base_string)
    
    ActiveSupport::SecurityUtils.secure_compare(my_signature, slack_signature)
  end

  def slack_events
    return head :forbidden unless verify_slack_request

    challenge = JSON.parse(request.body.read)["challenge"]
    return render plain: challenge if challenge.present?

    response = nil
    # TODO: Implement your custom flow here
    # response = handle_slack_event(JSON.parse(request.body.read))
    render plain: response
  end
end
