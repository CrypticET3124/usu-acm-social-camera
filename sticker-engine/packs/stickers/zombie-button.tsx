import { useState } from "react";
import { Pressable, Text, StyleSheet, Image } from "react-native";

export function ZombieButton({ size }: { size:number }){
    const [zombie, setZombie] = useState(false);
    return(
        <Pressable
        onPress={() => setZombie(!zombie)}
        style={({ pressed }) => [
        styles.likeWrap,
        { width: size, height: size, opacity: pressed ? 0.8 : 1 },
      ]}
      accessibilityLabel={zombie ? "Zombie" : "Git"}
      accessibilityRole="button"
        >
            <Image style={{ width: size, height: size, resizeMode: "contain" }}
            source={zombie ? require("../../../assets/Zombatar_1.jpg") : require("../../../assets/gwindows_logo.png")}
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
  likeWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
});