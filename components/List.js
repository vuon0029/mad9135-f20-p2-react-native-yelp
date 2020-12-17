import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

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
    fetchList(loc.latitude, loc.longitude).then((data) =>
      setList(data.businesses)
      // console.log(`data is: ${data}`)
    );
  }

  async function fetchList(lat, lng) {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const url = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lng}`;
    const final = Platform.OS === 'android' ? url : proxy+url
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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <FlatList
        data={orderedList}
        renderItem={({ item }) => (
          <TouchableOpacity
            // style={styles.button}
            onPress={() => {
              navigation.navigate("Details", {
                alias: item.alias,
                distance: (item.distance / 1000).toFixed(2),
              });
            }}
          >
            <Image
              source={{ uri: item.image_url }}
              style={{ width: 200, height: 200 }}
            />
            <Text>{item.name}</Text>
            <Text
            // style={styles.text}
            >
              {(item.distance / 1000).toFixed(2)}km
            </Text>
          </TouchableOpacity>
        )}
      />
      {/* {list.map((item) => {
        return (
          <li className="list collection center container " key={item.id}>
            <section className="cryptoMain">#{item.rank}</section>
            <NavLink to={item.id} className="cryptoMain">
              {item.name}
            </NavLink>
            <p className="cryptoMain">${item.price_usd} USD</p>
          </li>
        );
      })} */}
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
});
