import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { FirstSplash } from './app/screens/FirstSplash';

export default function App() {
  return (
    <View style={styles.container}>
      <FirstSplash>
        
      </FirstSplash>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
