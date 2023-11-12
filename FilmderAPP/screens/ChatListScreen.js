import {View, Text, FlatList, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import {collection} from "firebase/firestore";

const ChatListScreen = () => {
    const [friends, setFriends] = useState([
        { id: '1', name: 'Friend 1' },
        { id: '2', name: 'Friend 2' },
        // Add more friends as needed
    ]);
    const [selectedFriends, setSelectedFriends] = useState([]);

    const toggleFriendSelection = (friendId) => {
        const isSelected = selectedFriends.includes(friendId);
        if (isSelected) {
            setSelectedFriends(selectedFriends.filter((id) => id !== friendId));
        } else {
            setSelectedFriends([...selectedFriends, friendId]);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={{
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                backgroundColor: selectedFriends.includes(item.id) ? '#3498db' : '#fff',
            }}
            onPress={() => toggleFriendSelection(item.id)}
        >
            <Text style={{ color: selectedFriends.includes(item.id) ? '#fff' : '#000' }}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <FlatList
                data={friends}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <TouchableOpacity
                style={{
                    backgroundColor: '#3498db',
                    padding: 16,
                    alignItems: 'center',
                    borderRadius: 8,
                    marginTop: 16,
                }}
                onPress={() => {
                    alert('Selected Friends:'+selectedFriends);
                    // Perform any action with selected friends
                }}
            >
                <Text style={{ color: '#fff' }}>Pick Selected Friends</Text>
            </TouchableOpacity>
        </View>
  )
}

export default ChatListScreen