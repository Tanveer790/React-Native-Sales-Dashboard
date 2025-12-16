import { Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
// Assuming you have an Icon library imported here, e.g., import { BarChart3 } from "lucide-react-native";
// For this example, we'll assume an optional `Icon` prop can be passed in.

// Added an optional 'icon' prop for professional appeal
export default function StatCard({ title, value, subtitle, Icon }) { 
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        // 1. Softer border radius and slightly increased padding for better breathing room
        backgroundColor: colors.card,
        borderRadius: 20, // Slightly more rounded corners
        padding: 16, // Increased padding from 14 to 16
        borderWidth: 1,
        borderColor: colors.border,
        // Optional: Add a very subtle shadow for elevation, though often avoided in RN for performance unless necessary.
        // For a clean look, we stick to border.
      }}
    >
      {/* Container for Title and Optional Icon */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text 
          style={{ 
            color: colors.muted, 
            fontSize: 13, // Slightly larger font for title
            fontWeight: "700",
            // 2. Use uppercase for a dashboard header feel
            letterSpacing: 0.5, 
            textTransform: 'uppercase' 
          }}
        >
          {title}
        </Text>
        
        {/* 3. Placeholder for Icon - Adds significant professional value */}
        {Icon && (
          // Example: <Icon size={20} color={colors.primary} />
          <View style={{ padding: 4, borderRadius: 8, backgroundColor: colors.primary + '1A' }}> 
             {/* Icon component would go here, using primary color with 10% opacity background */}
             <Text style={{ color: colors.primary, fontSize: 16 }}>📈</Text> 
          </View>
        )}
      </View>

      {/* Main Value */}
      <Text 
        style={{ 
          color: colors.text, 
          fontSize: 30, // Much larger font size for impact (was 20)
          fontWeight: "900", 
          marginTop: 10, // Increased margin
          marginBottom: 4, // Added small margin before subtitle
        }}
        numberOfLines={1} // Ensures large value doesn't wrap awkwardly
      >
        {value}
      </Text>
      
      {/* Subtitle/Context */}
      {!!subtitle && (
        <Text 
          style={{ 
            color: colors.muted, 
            fontSize: 13, // Slightly larger font for subtitle
            fontWeight: '500', // Reduced font weight for less distraction
          }}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
}