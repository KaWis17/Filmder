import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

import { DummyData } from '../../temporary/cards';

const ModalScreen = ({ route, navigation }) => {

  /**
   * TODO: Pawle zrób proszę dokumentację, jeśli uważasz, że jest potrzebna
   */
  
  const id = route.params.id;

  return (
    <ScrollView style={{ padding: 16 }}>
      <Image
        style={{ height: 200, width: '50%', borderRadius: 8, marginTop: 16, marginBottom: 16 }}
        source={{ uri: DummyData[id].posterUrl }}
      />

      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>{DummyData[id].title}</Text>

      <InfoItem label="Year" value={DummyData[id].year} />
      <InfoItem label="Runtime" value={`${DummyData[id].runtime} minutes`} />
      <InfoItem label="Genres" value={DummyData[id].genres.join(', ')} />
      <InfoItem label="Director" value={DummyData[id].director} />
      <InfoItem label="Actors" value={DummyData[id].actors} />
      <InfoItem label="Plot" value={DummyData[id].plot} />
    </ScrollView>
  );
};

const InfoItem = ({ label, value }) => (
  <View style={{ marginBottom: 8 }}>
    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{label}:</Text>
    <Text style={{ fontSize: 16 }}>{value}</Text>
  </View>
);

export default ModalScreen;