import React from 'react';
import { View, Text, StyleSheet, Platform, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

interface PlaceAddrProps {
  addr: string;
  latitude: number;
  longitude: number;
  clientId: string;  // 네이버에서 발급받은 ncpClientId
}

export default function PlaceAddr({ addr }: PlaceAddrProps) {
  // location href

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        // 네이버 지도 URL 인증 실패 나옴 다른 방안 고려 필요
        <script type="text/javascript" src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=ClientID"></script>
      </head>
      <body>
        <div id="map" style="width:100%;height:400px;"></div>
        <script>
          var mapOptions = {
              center: new naver.maps.LatLng(37.3595704, 127.105399),
              zoom: 10,
          };
          
          var map = new naver.maps.Map('map', mapOptions);
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>장소</Text>
      <Text>{addr}</Text>
        <WebView
          originWhitelist={['*']}
          source={{ html: htmlContent }}
          style={{
            ...styles.webview,
            width: Dimensions.get('window').width,
            height: 400, // 원하는 높이로 조정
          }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
