import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import axios from 'axios';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [messages, setMessages] = useState([]);

  // Update the FastAPI server URL with your local IP address and port number
  const API_URL = 'http://192.168.184.134:8000/chatbot/';

  const handleSendMessage = async () => {
    if (!inputText) return;

    // Append the user input to the messages
    const newMessages = [...messages, { sender: 'user', text: inputText }];
    setMessages(newMessages);

    try {
      const response = await axios.post(API_URL, { input_text: inputText });
      const botResponse = response.data.response;

      // Append the bot response to the messages
      setMessages([...newMessages, { sender: 'bot', text: botResponse }]);
      setChatResponse(botResponse);
      setInputText('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat with Bot</Text>

      <ScrollView style={styles.chatContainer}>
        {messages.map((msg, index) => (
          <Text
            key={index}
            style={[styles.message, msg.sender === 'user' ? styles.userMessage : styles.botMessage]}
          >
            {msg.sender === 'user' ? 'You: ' : 'Bot: '}
            {msg.text}
          </Text>
        ))}
      </ScrollView>

      <TextInput
        style={styles.input}
        placeholder="Type your message..."
        value={inputText}
        onChangeText={setInputText}
      />

      <Button title="Send" onPress={handleSendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical:30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chatContainer: {
    width: '100%',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    padding: 8,
    borderRadius: 5,
    marginVertical: 2,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    padding: 10,
    marginBottom: 10,
  },
});
