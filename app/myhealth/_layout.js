import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function MyHealthLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#E74C3C',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tabs.Screen
        name="back"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="arrow-back" size={24} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.replace('/');
          },
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'My Health',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="records"
        options={{
          title: 'Records',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="file-tray-full" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mymeds"
        options={{
          title: 'My Meds',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="medkit" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="analytics" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="assistant"
        options={{
          title: 'Assistant',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="dental-records" options={{ href: null }} />
      <Tabs.Screen name="diabetes-insights" options={{ href: null }} />
      <Tabs.Screen name="family-profiles" options={{ href: null }} />
      <Tabs.Screen name="fitness-insights" options={{ href: null }} />
      <Tabs.Screen name="health-encyclopedia" options={{ href: null }} />
      <Tabs.Screen name="health-goals" options={{ href: null }} />
      <Tabs.Screen name="health-score-detail" options={{ href: null }} />
      <Tabs.Screen name="heart-health-insights" options={{ href: null }} />
      <Tabs.Screen name="insurance-documents" options={{ href: null }} />
      <Tabs.Screen name="medicine-details" options={{ href: null }} />
      <Tabs.Screen name="medicine-reminders" options={{ href: null }} />
      <Tabs.Screen name="my-appointments" options={{ href: null }} />
      <Tabs.Screen name="nearby-pharmacies" options={{ href: null }} />
      <Tabs.Screen name="organ-health" options={{ href: null }} />
      <Tabs.Screen name="prescriptions" options={{ href: null }} />
      <Tabs.Screen name="sleep-insights" options={{ href: null }} />
      <Tabs.Screen name="symptom-checker" options={{ href: null }} />
      <Tabs.Screen name="test-reports" options={{ href: null }} />
      <Tabs.Screen name="vaccination-records" options={{ href: null }} />
      <Tabs.Screen name="vitals-tracker" options={{ href: null }} />
      <Tabs.Screen name="wellness-programs" options={{ href: null }} />
      <Tabs.Screen name="xrays-scans" options={{ href: null }} />
      <Tabs.Screen name="screens" options={{ href: null }} />
    </Tabs>
  );
}
