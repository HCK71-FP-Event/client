import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Profile({ navigation }) {
  const navigateToEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 0,
          }}
        >
          <Ionicons name="arrow-back" size={24} color={"#000"} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Profile
        </Text>
      </View>

      {/* Account Settings */}
      <View
        style={{
          marginTop: 20,
          marginHorizontal: 12,
          paddingVertical: 10,
          paddingHorizontal: 15,
          backgroundColor: "#f5f5f5",
          borderRadius: 10,
        }}
      >
        <TouchableOpacity
          onPress={navigateToEditProfile}
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="person-circle" size={24} color="black" />
          <Text
            style={{
              marginLeft: 12,
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/*
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function Profile({ navigation }) {
  const navigateToEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const accountItem = {
    icon: "person-outline",
    text: "Edit Profile",
    action: navigateToEditProfile,
  };

  const renderSettingsItem = ({ icon, text, action }) => (
    <TouchableOpacity
      onPress={action}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingLeft: 12,
      }}
    >
      <MaterialIcons name="icon" size={24} color="black" />
      <Text
        style={{
          marginLeft: 36,
          fontWeight: "semibold",
          fontSize: 16,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 0,
          }}
        >
          <MaterialIcons name="keyboard-arrow-left" size={24} color={"#000"} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Profile
        </Text>
      </View>

//       {/* Account Settings */

//       <View style={{ marginBottom: 12 }}>
//         <View
//           style={{
//             borderRadius: 12,
//             backgroundColor: "#fff",
//           }}
//         >
//           {accountItem.map((item, index) => (
//             <React.Fragment key={index}>{renderSettingsItem}</React.Fragment>
//           ))}
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }
