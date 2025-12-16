import { Pressable, Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

export default function SegmentedTabs({ items, value, onChange, t }) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        // 1. Cleaner background: Use the neutral background, not necessarily the card color, 
        // to make the selected tab stand out more against the background. 
        // Or, keep colors.card but use subtle, lighter border.
        backgroundColor: colors.card,
        borderRadius: 14,
        padding: 4, // Slightly reduced padding for a tighter, sleeker look
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      {items.map((it) => {
        const active = it.key === value;
        return (
          <Pressable
            key={it.key}
            onPress={() => onChange(it.key)}
            // 2. Add subtle scaling/opacity feedback on press for professional feel
            style={({ pressed }) => ({ 
              flex: 1,
              paddingVertical: 10,
              paddingHorizontal: 6, // Added horizontal padding for text safety
              borderRadius: 12,
              
              // Active State: Use primary color for a clean, bold selection
              backgroundColor: active ? colors.primary : "transparent",
              
              alignItems: "center",
              justifyContent: "center", // Ensure vertical centering
              transform: [{ scale: pressed ? 0.98 : 1 }], // Subtle scale animation
              opacity: pressed && !active ? 0.7 : 1, // Dim when pressing an inactive tab
            })}
          >
            <Text
              style={{
                // 3. Text Colors: White text on primary background, and a slightly darker muted text on inactive.
                color: active 
                  ? colors.bg // Use background color (usually white/near-white) for text on the primary color 
                  : colors.text, // Use regular text color for inactive state (better contrast than muted)
                
                // 4. Text Style: Slightly increased font size for better readability on mobile.
                fontWeight: active ? "800" : "600", // Stronger weight for active, solid weight for inactive
                fontSize: 13, 
                letterSpacing: 0.1, // Subtle letter spacing
              }}
              numberOfLines={1}
            >
              {t(it.labelKey)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}