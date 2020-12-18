import React, { useState, useEffect } from "react";
import { Platform, ActivityIndicator, Image, View, Text } from "react-native";
import RatingImage from "./RatingImage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";

export default function Details({ route }) {
  const Bearer =
    "45mEth91SGrrTZghjhUK6s--hPksQPzZUpo4tgMwC3IXTY2C3ReP7BWBLupqNBBZxR-qt593a0-fSQ0sMXthd5C5uJ835k6GKZL_GTK4D6eK86oCHx86dNlA8fbOX3Yx";
  const [details, setDetails] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    fetchDetails(
      `https://api.yelp.com/v3/businesses/${route.params.alias}`
    ).then((data) => setDetails(data));
    fetchDetails(
      `https://api.yelp.com/v3/businesses/${route.params.alias}/reviews`
    ).then((data) => setReviews(data.reviews));

    async function fetchDetails(url) {
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const final = Platform.OS === "android" ? url : proxy + url;

      try {
        const res = await fetch(url, {
          method: "GET",
          headers: new Headers({
            Authorization: `Bearer ${Bearer}`,
          }),
        });
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      } catch (err) {
        console.error(err);
      }
    }
  }, [route.params.alias]);

  if (!details || !reviews)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#B40000" />
      </View>
    );

  let priceRange = ["Cheap", "Fair", "Expensive", "Very Expensive"];

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["right", "bottom", "left"]}>
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}
      >
        <View>
          <Image
            source={{ uri: details.photos[1] }}
            style={{
              width: 400,
              height: 150,
            }}
          />
          <View style={styles.overlay} />
        </View>
        <View style={styles.avt}>
          <Image
            source={{ uri: details.image_url }}
            style={{
              width: 120,
              height: 120,
              backgroundColor: details.image_url == "" ? "#B3B3B3" : "white",
              borderRadius: 60,
            }}
          />
        </View>
        <Text style={styles.name}>{details.name}</Text>
        <RatingImage item={details.rating} />
        <View style={styles.info}>
          <Text style={styles.head}>Information</Text>
          <View style={styles.details}>
            <Text style={styles.text}>
              <Icon style={styles.icon} name="phone" color="#B40000" />

              {details.phone}
            </Text>
            <Text style={styles.text}>
              <Icon
                style={styles.icon}
                name="truck"
                color="#B40000"
                type="font-awesome"
              />
              {route.params.distance}km away
            </Text>
            <Text style={styles.text}>
              <Icon
                style={styles.icon}
                name="cash-outline"
                color="#B40000"
                type="ionicon"
              />
              {details.price ? priceRange[details.price.length] : null}
            </Text>

            <View style={{ alignItems: "flex-start" }}>
              <Icon
                style={styles.icon}
                name="chatbox-ellipses-outline"
                color="#B40000"
                type="ionicon"
              />
              <View>
                {reviews.map((item) => {
                  return (
                    <View style={styles.review}>
                      <Text style={styles.username}>{item.user.name}</Text>
                      <Text style={styles.desc}>{item.text}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  avt: {
    width: 130,
    height: 130,
    backgroundColor: "#CE1E1E",
    padding: 5,
    margin: 20,
    borderRadius: 70,
    marginTop: -90,
  },
  review: {
    margin: 2,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 2,
  },
  desc: {
    fontSize: 14,
    padding: 2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  name: {
    fontSize: 24,
    fontWeight: "300",
    marginTop: -25,
  },
  info: {
    flex: 1,
    width: 320,
    margin: 35,
    marginBottom: 0,
    borderRadius: 12,
    borderColor: "#B40000",
    borderStyle: "solid",
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  details: {
    padding: 10,
  },
  text: {
    fontSize: 18,
    paddingLeft: 12,
  },
  price: {
    color: "#B40000",
    fontSize: 26,
  },
  head: {
    fontSize: 26,
    margin: 10,
    fontWeight: "200",
  },
  icon: {
    marginRight: 12,
  },
});
