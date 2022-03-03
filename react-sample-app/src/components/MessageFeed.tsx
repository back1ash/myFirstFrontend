import * as React from 'react';
import { fetchMessages, Message } from '../../client';
// @ts-ignore
import { Segment, Image, Comment, Header } from 'semantic-ui-react';

interface MessageFeedProps {
  channelName: string;
}

interface MessageFeedState {
  messages: Message[];
}

export class MessageFeed extends React.Component<
  MessageFeedProps,
  MessageFeedState
> {
  constructor(props: MessageFeedProps) {
    super(props);
    this.state = {
      messages: [],
    };
  }
  public render() {
    return (
      <Comment.Group>
        <Header as="h3" dividing>
          {this.props.channelName}
        </Header>
        {this.state.messages
          .slice()
          .reverse()
          .map((message) => (
            <Comment key={message.id}>
              <Comment.Avatar src={message.user.avatar || '/img/avatar.png'} />
              <Comment.Contest>
                <Comment.Author as="a">{message.user.avatar}</Comment.Author>
                <Comment.Metadata>
                  <div>{message.date}</div>
                </Comment.Metadata>
                <Comment.Text>{message.body}</Comment.Text>
              </Comment.Contest>
            </Comment>
          ))}
      </Comment.Group>
    );
  }
  private fetchMessages = (channelName: string) => {
    fetchMessages(channelName)
      .then((response) => {
        this.setState({ messages: response.data.messages });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  public componentDidMount() {
    this.fetchMessages(this.props.channelName);
  }
}
