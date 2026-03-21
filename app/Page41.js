import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Page41() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page41</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F8' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1A1A2E', marginBottom: 20 },
  backButton: { padding: 15, backgroundColor: '#007AFF', borderRadius: 10 },
  backText: { color: '#FFFFFF', fontSize: 16 },
});
