import { Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { money } from "../../utils/format";

// Added isLast prop to control the border
export default function TopItemRow({ item, isLast = false }) { 
  const { colors } = useTheme();
  
  // Determine if the border should be shown based on the isLast prop
  const borderStyle = isLast 
    ? {} 
    : {
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        // 1. Increased vertical padding for more space between rows
        paddingVertical: 14, 
        ...borderStyle, // Apply conditional border style
      }}
    >
      {/* Item Name and Qty */}
      <View style={{ flex: 1, paddingRight: 10 }}>
        <Text style={{ color: colors.text, fontWeight: "700", fontSize: 14 }} numberOfLines={1}>
          {item.name}
        </Text>
        
        <Text style={{ color: colors.muted, marginTop: 4, fontSize: 13, fontWeight: '500' }}> 
          Qty: {item.qty}
        </Text>
      </View>

      {/* Sales Amount */}
      <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}> 
        <Text 
          style={{ 
            color: colors.text, 
            fontWeight: "900", // Keep strong weight for the monetary value
            fontSize: 15, // Slightly larger size
          }}
        >
          {money(item.amount)}
        </Text>
        
        {/* Optional: Add a subtle percentage label if the data was available
        <Text style={{ color: colors.primary, fontSize: 11, marginTop: 2, fontWeight: '600' }}>
           +5% 
        </Text> 
        */}
      </View>
    </View>
  );
}