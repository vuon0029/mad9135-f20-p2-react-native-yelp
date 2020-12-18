import React, { useState, useEffect } from "react";
import {
  Image,
  Platform,
} from "react-native";

export default function RatingImage({ item }) {

    const img = {
        android: {
            5: require(`../assets/yelp_stars/android/drawable-hdpi/extra_large/stars_extra_large_5.png`),
            4.5: require(`../assets/yelp_stars/android/drawable-hdpi/extra_large/stars_extra_large_4_half.png`),
            4: require(`../assets/yelp_stars/android/drawable-hdpi/extra_large/stars_extra_large_4.png`),
            3.5: require(`../assets/yelp_stars/android/drawable-hdpi/extra_large/stars_extra_large_3_half.png`),
            3: require(`../assets/yelp_stars/android/drawable-hdpi/extra_large/stars_extra_large_3.png`),
            2.5: require(`../assets/yelp_stars/android/drawable-hdpi/extra_large/stars_extra_large_2_half.png`),
            2: require(`../assets/yelp_stars/android/drawable-hdpi/extra_large/stars_extra_large_2.png`),
            1.5: require(`../assets/yelp_stars/android/drawable-hdpi/extra_large/stars_extra_large_1_half.png`),
            1: require(`../assets/yelp_stars/android/drawable-hdpi/extra_large/stars_extra_large_1.png`),
            0: require(`../assets/yelp_stars/android/drawable-hdpi/extra_large/stars_extra_large_0.png`),
        },
        web_n_ios: {
            5: require(`../assets/yelp_stars/web_and_ios/extra_large/extra_large_5.png`),
            4.5: require(`../assets/yelp_stars/web_and_ios/extra_large/extra_large_4_half.png`),
            4: require(`../assets/yelp_stars/web_and_ios/extra_large/extra_large_4.png`),
            3.5: require(`../assets/yelp_stars/web_and_ios/extra_large/extra_large_3_half.png`),
            3: require(`../assets/yelp_stars/web_and_ios/extra_large/extra_large_3.png`),
            2.5: require(`../assets/yelp_stars/web_and_ios/extra_large/extra_large_2_half.png`),
            2: require(`../assets/yelp_stars/web_and_ios/extra_large/extra_large_2.png`),
            1.5: require(`../assets/yelp_stars/web_and_ios/extra_large/extra_large_1_half.png`),
            1: require(`../assets/yelp_stars/web_and_ios/extra_large/extra_large_1.png`),
            0: require(`../assets/yelp_stars/web_and_ios/extra_large/extra_large_0.png`),
        }
    }
    let url = Platform.OS !== "web" ? img.android[item] : img.web_n_ios[item]
    return (
        <Image 
        source={url}
        style={{ width: 170, height: 31 }}
        />
    )
    // source={require('./myimage.png')} 
}