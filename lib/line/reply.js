'use strict';
const rp = require('minimal-request-promise');

function lineReply(replyToken, message, lineChannelAccessToken) {
  var messages = [];
  if (typeof message === 'string') {
    messages = [{
      text: message,
      type: 'text'
    }];
  } else if (Array.isArray(message)) {
    message.forEach(msg => {
      if (typeof msg === 'string') {
        let singleMessage = {
          text: msg,
          type: 'text'
        };
        messages.push(singleMessage);
      } else {
        messages.push(msg);
      }
    });
  } else {
    if(!message.type) throw new Error('Your LINE message is required to have a type');
    messages = [message];
  }

  let data = {
    replyToken: replyToken,
    messages: messages
  };


  const options = {
    headers: {
      'Authorization': `Basic ${lineChannelAccessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  return rp.post('https://api.line.me/v2/bot/message/reply', options);
}

module.exports = lineReply;