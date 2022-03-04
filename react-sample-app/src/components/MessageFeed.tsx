import * as React from 'react';
import { fetchMessages, Message } from '../client';
// @ts-ignore
import { Segment, Image, Comment, Header } from 'semantic-ui-react';

interface MessageFeedProps {
  channelName: string;
  shouldReload: boolean;
  setShouldReload: (shouldReload: boolean) => void;
}

interface MessageFeedState {
  messages: Message[];
}
//@CrossOrigin(origin="*", allowedHeaders = "*")
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
              <Comment.Content>
                <Comment.Author as="a">{message.user.avatar}</Comment.Author>
                <Comment.Metadata>
                  <div>{message.date}</div>
                </Comment.Metadata>
                <Comment.Text>{message.body}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
      </Comment.Group>
    );
  }
  private fetchMessages = (channelName: string) => {
    this.props.setShouldReload(false);
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
  public componentDidUpdate(prevProps: MessageFeedProps) {
    if (
      prevProps.channelName !== this.props.channelName ||
      (!prevProps.shouldReload && this.props.shouldReload)
    ) {
      this.fetchMessages(this.props.channelName);
    }
  }
}
