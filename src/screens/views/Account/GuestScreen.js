import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{ uri: 'https://picsum.photos/200/200' }}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.bio}>Software Developer</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Generar QR</Text>
            </View>
            <View style={[styles.button, styles.secondaryButton]}>
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>Cerrar sesión</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232323',
  },
  header: {
    backgroundColor: '#222',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    backgroundColor: '#232323',
    paddingHorizontal: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  infoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  name: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bio: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#222',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
  },
  secondaryButtonText: {
    color: '#fff',
  },
});

export default Profile;
