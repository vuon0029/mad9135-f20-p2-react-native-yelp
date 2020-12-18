import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Platform,
  Dimensions,
} from "react-native";
import { Switch } from "react-native-switch";
import MapView, { Callout, Marker } from "react-native-maps";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import RatingImage from "./RatingImage";

export default function List({ navigation, route }) {
  const Bearer =
    "45mEth91SGrrTZghjhUK6s--hPksQPzZUpo4tgMwC3IXTY2C3ReP7BWBLupqNBBZxR-qt593a0-fSQ0sMXthd5C5uJ835k6GKZL_GTK4D6eK86oCHx86dNlA8fbOX3Yx";
  const [list, setList] = useState(null);
  const [img] = useState(require("../assets/pinImage.png"));
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      geoSuccess,
      geoFailure,
      geoOptions
    );
  }, []);

  let geoOptions = {
    enableHighAccuracy: true,
    timeOut: 20000,
    maximumAge: 60 * 60,
  };

  function geoSuccess(pos) {
    var loc = pos.coords;
    console.log(loc.latitude, loc.longitude);
    setLat(loc.latitude);
    setLng(loc.longitude);
    fetchList(loc.latitude, loc.longitude).then(
      (data) => setList(data.businesses)
      // console.log(`data is: ${data}`)
    );
  }

  async function fetchList(lat, lng) {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const url = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lng}&limit=50`;
    const final = Platform.OS !== "web" ? url : proxy + url;
    // const url = `https://api.coinlore.net/api/tickers/`;
    try {
      const res = await fetch(final, {
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
  function geoFailure(pos) {
    console.warn(`ERROR: ${pos}`);
  }

  if (!list)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#B40000" />
      </View>
    );

  console.log(list);

  let orderedList = list.sort((a, b) => a.distance - b.distance);

  if (!isEnabled)
    return (
      <SafeAreaView style={{ flex: 1 }} edges={["right", "bottom", "left"]}>
        <View style={{ backgroundColor: "#E8E8E8" }}>
          {/* <View style={styles.container}> */}
          {Platform.OS !== "web" ? (
            <View
              style={{
                flexDirection: "row-reverse",
                alignItems: "center",
                margin: 20,
              }}
            >
              <Switch
                style={{ marginRight: 30 }}
                activeText={"Map"}
                inActiveText={"Card"}
                backgroundActive={"#B40000"}
                circleSize={30}
                barHeight={20}
                circleBorderWidth={1}
                trackColor={{ false: "#767577", true: "#black" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#FF1F1F"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          ) : null}

          {/* </View> */}

          <FlatList
            data={orderedList}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                // style={styles.button}
                onPress={() => {
                  navigation.navigate("Details", {
                    alias: item.alias,
                    distance: (item.distance / 1000).toFixed(2),
                  });
                }}
              >
                <View style={styles.card}>
                  <Image
                    source={{ uri: item.image_url }}
                    style={{
                      width: 150,
                      height: 150,
                      backgroundColor:
                        item.image_url == "" ? "#B3B3B3" : "transparent",
                    }}
                  />
                  <View style={styles.info}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "flex-start",
                      }}
                    >
                      <Text style={styles.headline}>{item.name}</Text>
                      <RatingImage item={item.rating} />
                    </View>
                    {/* <Text>{item.rating}</Text> */}
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row-reverse",
                        justifyContent: "space-between",
                        marginBottom: 10,
                      }}
                    >
                      <Text>{item.review_count} Reviews</Text>
                      <Text style={styles.title}>
                        {(item.distance / 1000).toFixed(2)}km
                      </Text>
                    </View>
                    <Text style={styles.open}>
                      {item.is_closed == "false" ? "CLOSED" : "OPEN"}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
        </View>
      </SafeAreaView>
    );

  if (isEnabled == true)
    return (
      <View>
        <View
          style={{
            flexDirection: "row-reverse",
            alignItems: "center",
            margin: 30,
            marginBottom: 10,
            marginTop: 20,
          }}
        >
          <Switch
            activeText={"Map"}
            inActiveText={"Card"}
            backgroundActive={"#B40000"}
            circleSize={30}
            barHeight={20}
            circleBorderWidth={1}
            trackColor={{ false: "#767577", true: "black" }}
            thumbColor={isEnabled ? "#FF1F1F" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              key={"you"}
              coordinate={{ latitude: lat, longitude: lng }}
              title={"You"}
              description={"This is your location"}
              pinColor={"#B40000"}
            />
            {orderedList.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: marker.coordinates.latitude,
                  longitude: marker.coordinates.longitude,
                }}
                title={marker.name}
                pinColor={"#FF8001"}
              >
                <Callout
                  tooltip
                  onPress={() => {
                    navigation.navigate("Details", {
                      alias: marker.alias,
                      distance: (marker.distance / 1000).toFixed(2),
                    });
                  }}
                >
                  <View>
                    <View style={styles.bubble}>
                      <Text style={styles.title}>{marker.name}</Text>
                      <Text style={styles.name}>
                        {(marker.distance / 1000).toFixed(2)}km away
                      </Text>
                      <Text style={styles.name}>Rating: {marker.rating}</Text>
                      <Text style={styles.name}>
                        {marker.review_count} reviews
                      </Text>
                      <Text style={styles.name}>Click for more details</Text>
                    </View>
                    <View style={styles.arrowBorder} />
                    <View style={styles.arrow} />
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
        </View>
      </View>
    );
}
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#B40000",
    padding: 20,
    borderRadius: 12,
  },
  text: {
    color: "white",
    fontSize: 30,
  },
  textOut: {
    paddingTop: 10,
    fontSize: 16,
  },
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.65,
    shadowRadius: 12.84,

    elevation: 20,
    marginBottom: 65,
  },
  info: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
  },
  headline: {
    fontSize: 21,
    fontWeight: "300",
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  open: {
    color: "green",
    fontWeight: "bold",
    fontSize: 14,
  },
  container: {
    marginTop: 10,
    marginBottom: 10,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  // Callout bubble
  bubble: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: 200,
    height: 200,
  },
  calloutImg: {
    width: "100%",
    height: 80,
    resizeMode: "cover",
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -42,
  },
  name: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "600",
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#B40000",
    borderWidth: 18,
    alignSelf: "center",
    marginTop: 2.5,
  },
});
