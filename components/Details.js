import React, { useState, useEffect } from 'react'
import {
  Platform,
  ActivityIndicator,
  Image,
  View,
  Text,
  StyleSheet
} from 'react-native'

export default function Details ({ route }) {
  const Bearer =
    '45mEth91SGrrTZghjhUK6s--hPksQPzZUpo4tgMwC3IXTY2C3ReP7BWBLupqNBBZxR-qt593a0-fSQ0sMXthd5C5uJ835k6GKZL_GTK4D6eK86oCHx86dNlA8fbOX3Yx'
  const [details, setDetails] = useState(null)

  useEffect(() => {
    fetchDetails().then(data => setDetails(data))
    console.log(route.params.alias)
    async function fetchDetails () {
      // const proxy = "https://cors-anywhere.herokuapp.com/";
      const url = `https://api.yelp.com/v3/businesses/${route.params.alias}`
      // const final = Platform.OS === 'android' ? url : proxy+url
      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: new Headers({
            Authorization: `Bearer ${Bearer}`
          })
        })
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
      } catch (err) {
        console.error(err)
      }
    }
  }, [route.params.alias])

  if (!details)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large' color='#B40000' />
      </View>
    )

  console.log(details)

  return (
    <View style={styles.view}>
      <Image source={{ uri: details.image_url }} style={styles.image} />
      <Text>Name: {details.name}</Text>
      <Text>Phone: {details.phone}</Text>
      <Text>Distance: {route.params.distance}km</Text>
      <Text>Price: {details.price}</Text>
      <Text>Rating: {details.rating}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  image: {
    width: 430,
    height: 200
  }
})
