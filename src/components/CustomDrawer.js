import {  View, Text, ImageBackground, Image, StyleSheet,} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../styles/gstyles";

import ButtonDarken from "./ButtonDarken";

const CustomDrawer = (props) => {

  const { user, signOut } = useContext(AuthContext)

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: COLORS.orange,
          marginTop: -20,
          zIndex: 10,
        }}
      >
        <ImageBackground
          // source={require("../assets/Images/background.jpg")}
          style={{ padding: 20 }}
        >
          <Image
            alt="Not find"
            source={require("../../assets/icons/icon_user.png")}
            style={styles.userAvatar}
          />
          <View style={styles.userInfoSection}>
        {user && (
          <>
            <Text style={styles.title}>{user.nombre_completo}</Text>
            <Text style={styles.caption}>{user.usuario}</Text>
          </>
        )}
      </View>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: COLORS.gray2, paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
     
      <View style={{ padding: 20, }}>

        <ButtonDarken
          title="Cerrar Sesión"
          onPress={() => { signOut() }}
          icon
          iconName="arrow-right-from-bracket"
        />
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  userAvatar: {
    height: 67.5,
    width: 67.5,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_10,
    marginTop: SPACING.space_30,
  },
  switchTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: SPACING.space_8,
    paddingVertical: SPACING.space_4,
  },
  preferences: {
    fontSize: FONTSIZE.size_16,
    color: "#ccc",
    paddingTop: SPACING.space_10,
    fontWeight: "500",
    paddingLeft: SPACING.space_20,
  },
  switchText: {
    fontSize: FONTSIZE.size_16,
    color: "",
    paddingTop: SPACING.space_10,
    fontWeight: "bold",
  },
  title: {
    fontSize: FONTSIZE.size_20,
    marginTop: SPACING.space_2,
    fontWeight: 'bold',
    color: COLORS.white
  },
  caption: {
    fontSize: FONTSIZE.size_14,
    lineHeight: SPACING.space_16,    
    color: COLORS.white
  },
});
