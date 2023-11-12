import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import {auth} from "../FirebaseConnection";

class Chat extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: (navigation.state.params || {}).name || 'Chat!',
    });

    state = {
        messages: [
            {
                _id: 1,
                text: 'Hello!',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 2,
                text: 'How are you?',
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'User',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ],
    };

    onSend = newMessages => {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, newMessages),
        }));
    };

    render() {
        return (
            <GiftedChat
                user={{_id: auth?.currentUser?.email,name: auth?.currentUser?.displayName,avatar: auth?.currentUser?.photoURL}}
                showAvatarForEveryMessage={true}
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
            />
        );
    }
}

export default Chat;
