import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Chatbot from "./components/Chatbot";
import RagChatbot from "./components/RagChatbot";
import { NavigationContainer } from "@react-navigation/native";


const tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      
    <tab.Navigator>
      <tab.Screen name="Chatbot" component={Chatbot} />
      <tab.Screen name="RagChatbot" component={RagChatbot} />
    </tab.Navigator>
    </NavigationContainer>
  );
}