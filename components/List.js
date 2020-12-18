import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import RatingImage from "./RatingImage";

export default function List({ navigation, route }) {
  const Bearer =
    "45mEth91SGrrTZghjhUK6s--hPksQPzZUpo4tgMwC3IXTY2C3ReP7BWBLupqNBBZxR-qt593a0-fSQ0sMXthd5C5uJ835k6GKZL_GTK4D6eK86oCHx86dNlA8fbOX3Yx";
  const [list, setList] = useState(null);

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
    // console.log(loc.latitude, loc.longitude)
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

  return (
    <View
    style={{ backgroundColor: "#E8E8E8"}}
    >
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
                style={{ width: 150, height: 150, backgroundColor: item.image_url==""? "#B3B3B3" : "transparent" }}
              />
              <View style={styles.info}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "flex-start"
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
                    marginBottom: 10}}>
                  <Text>{item.review_count} Reviews</Text>
                  <Text style={styles.title}>
                  {(item.distance / 1000).toFixed(2)}km
                </Text>
                  </View>
                <Text style={styles.open}>{item.is_closed == "false" ? "CLOSED" : "OPEN"}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      />
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
    shadowOpacity: 0.55,
    shadowRadius: 9.84,

    elevation: 20,
    marginBottom: 30
  },
  info: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
  },
  headline: {
    fontSize: 21,
    fontWeight: "300",
    marginBottom: 5
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  open: {
    color: "green", 
    fontWeight: "bold", 
    fontSize: 14
  }
});